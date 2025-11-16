import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRICING } from "@/lib/stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userName, plan } = body;

    if (!userId || !userName || !plan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!PRICING[plan as keyof typeof PRICING]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const pricing = PRICING[plan as keyof typeof PRICING];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: pricing.currency,
            product_data: {
              name: `Elit Gym - ${pricing.label}`,
              description: pricing.description,
            },
            unit_amount: pricing.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      client_reference_id: userId,
      metadata: {
        userId,
        userName,
        plan,
      },
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("Stripe session error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
