import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export const PRICING = {
  "1-month": {
    amount: 3000, // $30.00 in cents
    currency: "usd",
    label: "1 Month",
    description: "Monthly membership",
  },
  "6-month": {
    amount: 16200, // $162.00 (10% discount)
    currency: "usd",
    label: "6 Months",
    description: "6-month membership (10% off)",
  },
  "12-month": {
    amount: 30600, // $306.00 (15% discount + 1 month free)
    currency: "usd",
    label: "12 Months + 1 FREE",
    description: "12-month membership (15% off + 1 month free)",
  },
};

export function getPlanPrice(plan: keyof typeof PRICING): number {
  return PRICING[plan].amount / 100;
}

export function getPlanDuration(plan: keyof typeof PRICING): number {
  switch (plan) {
    case "1-month":
      return 30;
    case "6-month":
      return 180;
    case "12-month":
      return 390; // 13 months (12 + 1 free)
    default:
      return 30;
  }
}
