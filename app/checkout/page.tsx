"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import { CreditCard, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const PLAN_INFO = {
  "1-month": {
    name: "1 Month Membership",
    price: "$30",
    duration: "30 days",
  },
  "6-month": {
    name: "6 Month Membership",
    price: "$162",
    duration: "180 days",
    badge: "10% OFF",
  },
  "12-month": {
    name: "12 Month + 1 FREE",
    price: "$306",
    duration: "390 days (13 months)",
    badge: "BEST VALUE",
  },
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const userId = searchParams.get("userId");
  const userName = searchParams.get("userName") || "New Member";
  const plan = searchParams.get("plan") as "1-month" | "6-month" | "12-month";

  useEffect(() => {
    if (!userId || !plan) {
      toast.error("Missing checkout information");
      router.push("/signup");
    }
  }, [userId, plan, router]);

  const handlePayment = async () => {
    if (!userId || !plan) {
      toast.error("Missing checkout information");
      return;
    }

    try {
      setProcessing(true);

      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userName,
          plan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to start checkout");
      setProcessing(false);
    }
  };

  if (!userId || !plan) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <LoadingSpinner message="Loading checkout..." />
      </div>
    );
  }

  const planInfo = PLAN_INFO[plan];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-20">
        {/* Back Button */}
        <button
          onClick={() => router.push("/signup")}
          className="flex items-center space-x-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Signup</span>
        </button>

        {/* Checkout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gold" />
            </div>
            <h1 className="text-3xl font-bold font-playfair gold-text mb-2">
              Complete Your Payment
            </h1>
            <p className="text-gray-400">
              You're one step away from joining Elit Gym
            </p>
          </div>

          {/* Plan Summary */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {planInfo.name}
                </h3>
                <p className="text-gray-400 text-sm">{planInfo.duration}</p>
              </div>
              {planInfo.badge && (
                <span className="px-3 py-1 bg-gold text-black text-xs font-bold rounded-full">
                  {planInfo.badge}
                </span>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Amount</span>
                <span className="text-3xl font-bold gold-text">
                  {planInfo.price}
                </span>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              What's Included:
            </h3>
            <ul className="space-y-3">
              {[
                "Access to all 20 gym locations",
                "24/7 unlimited gym access",
                "Personal QR code for check-in",
                "Track your workout history",
                "No hidden fees or charges",
              ].map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={processing}
            className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Proceed to Payment</span>
              </>
            )}
          </button>

          {/* Security Notice */}
          <p className="text-center text-sm text-gray-400 mt-6">
            🔒 Secure payment powered by Stripe. Your card information is never
            stored on our servers.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
