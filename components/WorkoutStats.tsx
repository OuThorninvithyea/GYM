"use client";

import { Entry } from "@/lib/db";
import { Calendar, Clock, MapPin, TrendingUp, Activity } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { differenceInDays, format, parseISO } from "date-fns";

interface WorkoutStatsProps {
  entries: Entry[];
  joinDate: Date;
  expiryDate: Date;
  membershipPlan: string;
}

export default function WorkoutStats({
  entries,
  joinDate,
  expiryDate,
  membershipPlan,
}: WorkoutStatsProps) {
  // Calculate statistics
  const totalVisits = entries.length;
  const totalWorkoutTime = entries.reduce(
    (sum, entry) => sum + (entry.duration || 0),
    0
  );
  const averageSessionDuration =
    totalVisits > 0 ? Math.round(totalWorkoutTime / totalVisits) : 0;

  // Days as member
  const daysAsMember = differenceInDays(new Date(), joinDate);
  const planDuration = differenceInDays(expiryDate, joinDate);
  const daysRemaining = differenceInDays(expiryDate, new Date());
  const percentageUsed = ((daysAsMember / planDuration) * 100).toFixed(1);

  // Average visits per week
  const weeksAsMember = daysAsMember / 7;
  const averageVisitsPerWeek = (totalVisits / weeksAsMember).toFixed(1);

  // Most visited location
  const locationCounts: Record<string, number> = {};
  entries.forEach((entry) => {
    locationCounts[entry.location] = (locationCounts[entry.location] || 0) + 1;
  });
  const favoriteLocation = Object.entries(locationCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "N/A";

  // Recent entries (last 10)
  const recentEntries = [...entries]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-6">
      {/* Membership Duration Overview */}
      <div className="card">
        <h2 className="text-2xl font-bold font-playfair gold-text mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          Membership Timeline
        </h2>

        <div className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Member since {format(joinDate, "MMM d, yyyy")}</span>
              <span>Expires {format(expiryDate, "MMM d, yyyy")}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill bg-gradient-to-r from-gold to-gold-dark"
                style={{ width: `${percentageUsed}%` }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-400">
              {percentageUsed}% of membership used
            </div>
          </div>

          {/* Duration Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gold">{daysAsMember}</div>
              <div className="text-xs text-gray-400 mt-1">Days as Member</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gold">{daysRemaining}</div>
              <div className="text-xs text-gray-400 mt-1">Days Remaining</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gold capitalize">
                {membershipPlan.replace("-", " ")}
              </div>
              <div className="text-xs text-gray-400 mt-1">Current Plan</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-gold">{planDuration}</div>
              <div className="text-xs text-gray-400 mt-1">Total Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Statistics */}
      <div className="card">
        <h2 className="text-2xl font-bold font-playfair gold-text mb-4 flex items-center">
          <Activity className="w-6 h-6 mr-2" />
          Workout Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Total Visits */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-gold" />
              <span className="text-3xl font-bold text-white">
                {totalVisits}
              </span>
            </div>
            <div className="text-sm text-gray-400">Total Check-ins</div>
            <div className="mt-2 text-xs text-gold">
              {averageVisitsPerWeek} visits/week average
            </div>
          </div>

          {/* Total Workout Time */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-gold" />
              <span className="text-3xl font-bold text-white">
                {formatDuration(totalWorkoutTime)}
              </span>
            </div>
            <div className="text-sm text-gray-400">Total Workout Time</div>
            <div className="mt-2 text-xs text-gold">
              {(totalWorkoutTime / 60).toFixed(1)} hours total
            </div>
          </div>

          {/* Average Session */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-gold" />
              <span className="text-3xl font-bold text-white">
                {formatDuration(averageSessionDuration)}
              </span>
            </div>
            <div className="text-sm text-gray-400">Average Session</div>
            <div className="mt-2 text-xs text-gold">
              Per workout duration
            </div>
          </div>
        </div>

        {/* Favorite Location */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gold mr-2" />
            <span className="text-gray-400">Most Visited Location:</span>
            <span className="ml-2 text-white font-semibold">
              {favoriteLocation}
            </span>
            <span className="ml-auto text-gold text-sm">
              {locationCounts[favoriteLocation] || 0} visits
            </span>
          </div>
        </div>
      </div>

      {/* Recent Check-ins History */}
      <div className="card">
        <h2 className="text-2xl font-bold font-playfair gold-text mb-4 flex items-center">
          <Clock className="w-6 h-6 mr-2" />
          Recent Check-ins
        </h2>

        {recentEntries.length > 0 ? (
          <div className="space-y-3">
            {recentEntries.map((entry, index) => (
              <div
                key={entry.id || index}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700 hover:border-gold transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {entry.location}
                    </div>
                    <div className="text-sm text-gray-400">
                      {format(entry.timestamp, "MMM d, yyyy • h:mm a")}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {entry.duration && (
                    <>
                      <div className="text-gold font-semibold">
                        {formatDuration(entry.duration)}
                      </div>
                      {entry.checkoutTime && (
                        <div className="text-xs text-gray-400">
                          {format(entry.checkoutTime, "h:mm a")}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No check-in history yet</p>
            <p className="text-sm mt-2">
              Start your fitness journey today!
            </p>
          </div>
        )}

        {entries.length > 10 && (
          <div className="mt-4 text-center">
            <button className="btn-outline text-sm">
              View All {entries.length} Check-ins
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

