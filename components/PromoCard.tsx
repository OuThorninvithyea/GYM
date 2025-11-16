"use client";

import { Promo } from "@/lib/db";
import { motion } from "framer-motion";
import Image from "next/image";

interface PromoCardProps {
  promo: Promo;
}

export default function PromoCard({ promo }: PromoCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="card-hover overflow-hidden min-w-[280px] snap-start"
    >
      {promo.imageUrl && (
        <div className="relative h-40 mb-4 -mt-6 -mx-6 overflow-hidden">
          <Image
            src={promo.imageUrl}
            alt={promo.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>
      )}

      <h3 className="text-lg font-bold font-playfair text-white mb-2">
        {promo.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-3">{promo.description}</p>

      <div className="mt-4 inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded-full">
        <span className="text-xs font-semibold text-gold uppercase tracking-wide">
          Limited Offer
        </span>
      </div>
    </motion.div>
  );
}
