import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { updateUser, createPayment } from "@/lib/db";
import { getPlanDuration } from "@/lib/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature")!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.client_reference_id || session.metadata?.userId;
      const plan = session.metadata?.plan;
      const userName = session.metadata?.userName;

      if (userId && plan) {
        // Update user's membership
        const duration = getPlanDuration(plan as any);
        const newExpiryDate = new Date();
        newExpiryDate.setDate(newExpiryDate.getDate() + duration);

        await updateUser(userId, {
          expiryDate: newExpiryDate,
          isActive: true,
          membershipPlan: plan as any,
          stripeCustomerId: session.customer as string,
        });

        // Record payment
        await createPayment({
          userId,
          userName: userName || "Unknown",
          amount: (session.amount_total || 0) / 100,
          date: new Date(),
          status: "completed",
          stripeId: session.id,
          plan,
        });

        console.log(`Payment successful for user ${userId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
