"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Phone, Lock } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { formatPhoneNumber, validatePhone } from "@/lib/utils";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
          },
        }
      );
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhone(phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);
      setupRecaptcha();

      const formattedPhone = formatPhoneNumber(phone);
      const appVerifier = (window as any).recaptchaVerifier;

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );
      setConfirmationResult(result);
      setStep("otp");
      toast.success("OTP sent to your phone!");
    } catch (error: any) {
      console.error("OTP send error:", error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await confirmationResult.confirm(otp);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("OTP verification error:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-md mx-auto px-4 py-20">
        <div className="card animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold font-playfair gold-text mb-2">
              Member Login
            </h1>
            <p className="text-gray-400">Access your Elit Gym membership</p>
          </div>

          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+855 12 345 678"
                    className="input pl-12"
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Enter your phone number (e.g., +855 12 345 678 or 012 345 678)
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
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
                <span>Sign in with Google</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="123456"
                  className="input text-center text-2xl tracking-widest"
                  maxLength={6}
                  required
                />
                <p className="text-sm text-gray-400 mt-2">
                  Enter the 6-digit code sent to {phone}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <button
                type="button"
                onClick={() => setStep("phone")}
                className="btn-outline w-full"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div id="recaptcha-container" />

          <div className="mt-8 space-y-4">
            <div className="text-center">
              <p className="text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-gold hover:underline font-semibold"
                >
                  Sign up now
                </Link>
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-sm">
                Are you an admin?{" "}
                <Link
                  href="/admin/login"
                  className="text-gold hover:underline font-semibold"
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
