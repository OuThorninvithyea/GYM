"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useRequireAuth } from "@/lib/auth-context";
import { User, Promo, Entry } from "@/lib/db";
import Navbar from "@/components/Navbar";
import MembershipCard from "@/components/MembershipCard";
import QRGenerator from "@/components/QRGenerator";
import PromoCard from "@/components/PromoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import PricingCard from "@/components/PricingCard";
import StripeCheckout from "@/components/StripeCheckout";
import WorkoutStats from "@/components/WorkoutStats";
import { CreditCard, Gift, QrCode as QrCodeIcon, X } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const pricingPlans = [
  {
    id: "1-month" as const,
    name: "1 Month",
    price: 30,
    period: "month",
    description: "Monthly renewal",
    features: [
      "Access to all 20 locations",
      "QR code check-in",
      "24/7 gym access",
    ],
  },
  {
    id: "6-month" as const,
    name: "6 Months",
    price: 162,
    period: "6 months",
    description: "Save 10%",
    features: ["All features", "10% discount", "Priority support"],
    popular: true,
    discount: "10% OFF",
  },
  {
    id: "12-month" as const,
    name: "12 Months + 1 FREE",
    price: 306,
    period: "year",
    description: "Best value",
    features: ["All features", "15% off + 1 free", "VIP status"],
    discount: "1 FREE",
  },
];

export default function DashboardPage() {
  const { user: authUser, loading: authLoading } = useRequireAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    "1-month" | "6-month" | "12-month"
  >("6-month");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      fetchUserData();
      fetchPromos();
    }
  }, [authUser]);

  useEffect(() => {
    if (userData?.uid) {
      fetchUserEntries(userData.uid);
    }
  }, [userData]);

  const buildUserQueryParams = () => {
    const params = new URLSearchParams();
    if (userData?.qrId) {
      params.set("uid", userData.qrId);
    } else if (authUser?.uid) {
      params.set("uid", authUser.uid);
    }
    if (authUser?.phoneNumber) params.set("phone", authUser.phoneNumber);
    if (authUser?.email) params.set("email", authUser.email);
    return params.toString();
  };

  const fetchUserData = async () => {
    try {
      const query = buildUserQueryParams();
      if (!query) {
        toast.error("Unable to identify your membership account.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/user?${query}`);
      const data = await response.json();

      if (!response.ok || !data.user) {
        toast.error(data.error || "Membership not found.");
        setUserData(null);
        return;
      }

      setUserData(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const fetchPromos = async () => {
    try {
      const response = await fetch("/api/promos");
      const data = await response.json();

      if (data.promos) {
        setPromos(
          data.promos.map((promo: any) => ({
            ...promo,
            createdAt: new Date(promo.createdAt),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching promos:", error);
    }
  };

  const fetchUserEntries = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/entries?userId=${userId}`);
      const data = await response.json();

      if (data.entries) {
        setEntries(
          data.entries.map((entry: any) => ({
            ...entry,
            timestamp: new Date(entry.timestamp),
            checkoutTime: entry.checkoutTime
              ? new Date(entry.checkoutTime)
              : undefined,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching user entries:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <LoadingSpinner message="Loading your dashboard..." />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-gray-400 mb-4">User data not found</p>
          <button onClick={() => router.push("/")} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair gold-text mb-2">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-gray-400">
            Manage your membership and check-in with ease
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Membership Card */}
            <MembershipCard user={userData} />

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setShowRenewalModal(true)}
                className="card-hover flex items-center space-x-4 p-6 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-lg gold-gradient flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white mb-1">Renew Now</h3>
                  <p className="text-sm text-gray-400">
                    Extend your membership
                  </p>
                </div>
              </button>

              <div className="card-hover flex items-center space-x-4 p-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                  <QrCodeIcon className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-white mb-1">Your QR Code</h3>
                  <p className="text-sm text-gray-400">
                    Scan below to check in
                  </p>
                </div>
              </div>
            </div>

            {/* Workout Statistics & History */}
            {userData && (
              <WorkoutStats
                entries={entries}
                joinDate={userData.joinDate}
                expiryDate={userData.expiryDate}
                membershipPlan={userData.membershipPlan}
              />
            )}

            {/* Promos */}
            {promos.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Gift className="w-6 h-6 text-gold" />
                  <h2 className="text-2xl font-bold font-playfair text-white">
                    Special Offers
                  </h2>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
                  {promos.map((promo) => (
                    <PromoCard key={promo.id} promo={promo} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - QR Code */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h2 className="text-xl font-bold font-playfair text-white mb-6 text-center">
                Your Check-In QR Code
              </h2>
              <QRGenerator
                value={userData.qrId}
                userName={userData.name}
                size={220}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Renewal Modal */}
      <AnimatePresence>
        {showRenewalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowRenewalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold font-playfair gold-text">
                  Renew Your Membership
                </h2>
                <button
                  onClick={() => setShowRenewalModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {pricingPlans.map((plan) => (
                    <PricingCard
                      key={plan.id}
                      plan={plan}
                      onSelect={setSelectedPlan}
                      selected={selectedPlan === plan.id}
                    />
                  ))}
                </div>

                <StripeCheckout
                  userId={userData.uid}
                  userName={userData.name}
                  plan={selectedPlan}
                  onSuccess={() => {
                    setShowRenewalModal(false);
                    fetchUserData();
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
