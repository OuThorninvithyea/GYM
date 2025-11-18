"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dumbbell,
  QrCode,
  CreditCard,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { user } = useAuth();

  const getUserDisplayName = () => user?.displayName || user?.email || "Member";

  const buildPlanUrl = (planId: "1-month" | "6-month" | "12-month") => {
    if (!user) {
      return `/signup?plan=${planId}`;
    }
    return `/checkout?userId=${user.uid}&userName=${encodeURIComponent(
      getUserDisplayName()
    )}&plan=${planId}`;
  };

  const features = [
    {
      icon: QrCode,
      title: "QR Code Check-In",
      description:
        "Fast, contactless entry at all 20 locations. No more shouting codes!",
    },
    {
      icon: CreditCard,
      title: "Easy Renewals",
      description:
        "Renew your membership in seconds. Pay securely with ABA Pay or card.",
    },
    {
      icon: MapPin,
      title: "20 Locations",
      description:
        "Access any Elit Gym across Cambodia with your single membership.",
    },
    {
      icon: Clock,
      title: "Auto Reminders",
      description:
        "Never miss a renewal. Get SMS and email alerts before expiry.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security.",
    },
    {
      icon: Dumbbell,
      title: "Premium Equipment",
      description:
        "State-of-the-art facilities and equipment at every location.",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gold-gradient opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold font-playfair mb-6">
              <span className="gold-text">Elite Fitness</span>
              <br />
              <span className="text-white">for Cambodia</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join 10,000+ members at Cambodia's premier gym chain. Smart QR
              check-in, easy renewals, 20 locations nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={buildPlanUrl("1-month")}
                className="btn-primary text-lg px-8 py-4"
              >
                Join Now - $30/month
              </Link>
              <Link href="/login" className="btn-outline text-lg px-8 py-4">
                Member Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair gold-text mb-4">
              Why Choose Elit?
            </h2>
            <p className="text-xl text-gray-400">
              Premium features designed for modern fitness enthusiasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-hover"
              >
                <div className="w-14 h-14 rounded-lg gold-gradient flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-black" />
                </div>
                <h3 className="text-xl font-bold font-playfair text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair gold-text mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-400">
              Choose the plan that fits your lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                id: "1-month" as const,
                name: "1 Month",
                price: "$30",
                period: "month",
                discount: null,
              },
              {
                id: "6-month" as const,
                name: "6 Months",
                price: "$162",
                period: "6 months",
                discount: "10% OFF",
                popular: true,
              },
              {
                id: "12-month" as const,
                name: "12 Months",
                price: "$306",
                period: "year",
                discount: "1 FREE",
              },
            ].map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ scale: 1.05 }}
                className={`card ${
                  plan.popular ? "border-gold shadow-gold/20" : ""
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 gold-gradient rounded-full">
                    <span className="text-black text-xs font-bold uppercase">
                      Popular
                    </span>
                  </div>
                )}
                {plan.discount && !plan.popular && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.discount}
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold font-playfair text-white mb-4">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold gold-text">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">/ {plan.period}</span>
                  </div>
                  <Link
                    href={buildPlanUrl(plan.id)}
                    className={`block w-full py-3 rounded-lg font-semibold ${
                      plan.popular ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-playfair gold-text mb-6">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied members across Cambodia
            </p>
            <Link
              href={buildPlanUrl("1-month")}
              className="btn-primary text-lg px-10 py-4 inline-block"
            >
              Join Elit Gym Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center">
                <span className="text-black font-bold text-xl font-playfair">
                  E
                </span>
              </div>
              <span className="font-playfair text-2xl font-bold gold-text">
                Elit Gym
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              © 2025 Elit Gym. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
