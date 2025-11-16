"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-400" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold font-playfair gold-text mb-4">
            Payment Successful!
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            Welcome to Elit Gym! Your membership is now active.
          </p>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <p className="text-gray-400 mb-2">What's next?</p>
            <ul className="text-left space-y-3 text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-gold mt-1">•</span>
                <span>Download your QR code from your dashboard</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold mt-1">•</span>
                <span>Show it at any Elit Gym location to check in</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gold mt-1">•</span>
                <span>Start your fitness journey today!</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="btn-primary flex items-center justify-center space-x-2 w-full mb-4"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-sm text-gray-400">
            Redirecting automatically in {countdown} seconds...
          </p>
        </motion.div>
      </div>
    </div>
  );
}
