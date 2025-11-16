"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Phone } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PricingCard from "@/components/PricingCard";
import { formatPhoneNumber, validatePhone, generateQRId } from "@/lib/utils";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

const pricingPlans = [
  {
    id: "1-month" as const,
    name: "1 Month",
    price: 30,
    period: "month",
    description: "Perfect for trying us out",
    features: [
      "Access to all 20 locations",
      "QR code check-in",
      "Mobile app access",
      "24/7 gym access",
    ],
  },
  {
    id: "6-month" as const,
    name: "6 Months",
    price: 162,
    period: "6 months",
    description: "Best for commitment",
    features: [
      "All 1-month features",
      "10% discount",
      "Priority support",
      "Free fitness assessment",
    ],
    popular: true,
    discount: "10% OFF",
  },
  {
    id: "12-month" as const,
    name: "12 Months + 1 FREE",
    price: 306,
    period: "year",
    description: "Maximum savings",
    features: [
      "All 6-month features",
      "15% discount + 1 free month",
      "VIP member status",
      "Free personal training session",
    ],
    discount: "1 FREE",
  },
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    plan: "6-month" as "1-month" | "6-month" | "12-month",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlanSelect = (planId: "1-month" | "6-month" | "12-month") => {
    setFormData({ ...formData, plan: planId });
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setStep(2);
  };

  const handleSignup = async () => {
    try {
      setLoading(true);

      // Create user account
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formatPhoneNumber(formData.phone),
          email: formData.email,
          plan: formData.plan,
          qrId: generateQRId(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      toast.success("Account created! Redirecting to payment...");

      // Redirect to checkout
      router.push(
        `/checkout?userId=${data.userId}&userName=${encodeURIComponent(
          data.userName
        )}&plan=${formData.plan}`
      );
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Auto-fill form with Google data
      const user = result.user;
      setFormData({
        ...formData,
        name: user.displayName || "",
        email: user.email || "",
      });

      toast.success("Connected with Google! Please complete your details.");
    } catch (error: any) {
      console.error("Google sign-up error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold font-playfair gold-text mb-4">
            Join Elit Gym
          </h1>
          <p className="text-xl text-gray-400">
            Start your elite fitness journey today
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                step >= 1 ? "text-gold" : "text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step >= 1 ? "border-gold bg-gold/20" : "border-gray-600"
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline font-semibold">Details</span>
            </div>
            <div
              className={`w-16 h-0.5 ${step >= 2 ? "bg-gold" : "bg-gray-600"}`}
            />
            <div
              className={`flex items-center space-x-2 ${
                step >= 2 ? "text-gold" : "text-gray-600"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  step >= 2 ? "border-gold bg-gold/20" : "border-gray-600"
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline font-semibold">Plan</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleStep1Submit}
              className="card animate-fade-in space-y-6"
            >
              {/* Google Sign-Up Button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 px-6 py-3 border border-gray-700 rounded-lg bg-white hover:bg-gray-100 text-gray-900 font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-400">
                    Or sign up with phone
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="input pl-12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+855 12 345 678"
                    className="input pl-12"
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Format: +855 XX XXX XXX or 0XX XXX XXX
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="input"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Continue to Plan Selection
              </button>

              <p className="text-center text-gray-400 text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gold hover:underline font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-playfair text-white mb-2">
                Choose Your Plan
              </h2>
              <p className="text-gray-400">
                Select the membership that works for you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {pricingPlans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  onSelect={handlePlanSelect}
                  selected={formData.plan === plan.id}
                />
              ))}
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <button
                onClick={handleSignup}
                disabled={loading}
                className="btn-primary w-full text-lg"
              >
                {loading ? "Creating Account..." : "Continue to Payment"}
              </button>
              <button onClick={() => setStep(1)} className="btn-outline w-full">
                Back to Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
