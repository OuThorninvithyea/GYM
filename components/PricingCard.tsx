"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface PricingPlan {
  id: "1-month" | "6-month" | "12-month";
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  discount?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: "1-month" | "6-month" | "12-month") => void;
  selected?: boolean;
}

export default function PricingCard({
  plan,
  onSelect,
  selected,
}: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`card cursor-pointer transition-all ${
        selected
          ? "border-gold shadow-xl shadow-gold/20"
          : "hover:border-gray-600"
      } ${plan.popular ? "relative overflow-visible" : ""}`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 gold-gradient rounded-full">
          <span className="text-black text-xs font-bold uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      {plan.discount && (
        <div className="absolute top-4 right-4">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {plan.discount}
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold font-playfair text-white mb-2">
          {plan.name}
        </h3>
        <div className="mb-2">
          <span className="text-4xl font-bold gold-text">${plan.price}</span>
          <span className="text-gray-400 ml-2">/ {plan.period}</span>
        </div>
        <p className="text-sm text-gray-400">{plan.description}</p>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          selected ? "btn-primary" : "btn-outline"
        }`}
      >
        {selected ? "Selected" : "Select Plan"}
      </button>
    </motion.div>
  );
}
