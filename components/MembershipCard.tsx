"use client";

import { User } from "@/lib/db";
import {
  formatDate,
  getProgressColor,
  getProgressPercentage,
} from "@/lib/utils";
import { Calendar, Clock, CreditCard } from "lucide-react";
import { getDaysUntilExpiry, getMembershipStatus } from "@/lib/db";

interface MembershipCardProps {
  user: User;
}

export default function MembershipCard({ user }: MembershipCardProps) {
  const daysLeft = getDaysUntilExpiry(user.expiryDate);
  const status = getMembershipStatus(user);
  const progressPercentage = getProgressPercentage(
    user.joinDate,
    user.expiryDate
  );
  const progressColor = getProgressColor(daysLeft);

  const statusConfig = {
    active: {
      label: "Active",
      className: "badge-active",
      message: "Your membership is active",
    },
    expiring: {
      label: "Expiring Soon",
      className: "badge-expiring",
      message: `Renew now to avoid interruption`,
    },
    expired: {
      label: "Expired",
      className: "badge-expired",
      message: "Please renew your membership",
    },
  };

  const config = statusConfig[status];

  return (
    <div className="card-hover animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-2xl font-bold font-playfair gold-text mb-2">
            {user.name}
          </h3>
          <span className={config.className}>{config.label}</span>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">{daysLeft}</p>
          <p className="text-sm text-gray-400">days left</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-300">
          <Calendar className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm text-gray-400">Expires</p>
            <p className="font-semibold">{formatDate(user.expiryDate)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-300">
          <Clock className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="font-semibold">{formatDate(user.joinDate)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-gray-300">
          <CreditCard className="w-5 h-5 text-gold" />
          <div>
            <p className="text-sm text-gray-400">Plan</p>
            <p className="font-semibold capitalize">
              {user.membershipPlan.replace("-", " ")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Membership Progress</span>
          <span className="text-gray-300">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-fill ${progressColor}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {status !== "active" && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 text-sm font-semibold">
            ⚠️ {config.message}
          </p>
        </div>
      )}
    </div>
  );
}
