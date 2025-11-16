"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Verify admin role from Firestore
      const response = await fetch(`/api/user?uid=${userCredential.user.uid}`);
      const userData = await response.json();

      if (!userData.user?.role || userData.user.role !== "admin") {
        await auth.signOut();
        toast.error("Access denied. Admin credentials required.");
        return;
      }

      toast.success("Admin login successful!");
      router.push("/admin");
    } catch (error: unknown) {
      console.error("Admin login error:", error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        if (
          errorMessage.includes("user-not-found") ||
          errorMessage.includes("wrong-password")
        ) {
          toast.error("Invalid email or password");
        } else if (errorMessage.includes("too-many-requests")) {
          toast.error("Too many failed attempts. Please try again later.");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back to Home Link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-gold mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>

        <div className="card border-gold/30 shadow-2xl shadow-gold/10 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gold/20">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-bold font-playfair gold-text mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-400">Elit Gym Management System</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@elitgym.com"
                  className="input pl-12"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input pl-12 pr-12"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gold transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="spinner mr-3" />
                  Authenticating...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="text-center text-sm text-gray-400">
              <p className="flex items-center justify-center">
                <Shield className="w-4 h-4 mr-2 text-gold" />
                Authorized Personnel Only
              </p>
            </div>
          </div>
        </div>

        {/* Customer Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Not an admin?{" "}
            <Link
              href="/login"
              className="text-gold hover:underline font-semibold"
            >
              Customer Login
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            This portal is for authorized Elit Gym administrators only. All
            access attempts are logged and monitored for security purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
