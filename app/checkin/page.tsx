"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import QRScanner from "@/components/QRScanner";
import { CheckCircle, XCircle, Clock, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { formatDateTime } from "@/lib/utils";

interface ScanResult {
  success: boolean;
  userName?: string;
  membershipStatus?: string;
  daysLeft?: number;
  message: string;
  timestamp: Date;
}

export default function CheckInPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<ScanResult[]>([]);
  const [location, setLocation] = useState("Main Branch");

  const handleScan = async (qrCode: string) => {
    try {
      const response = await fetch("/api/validate-entry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrId: qrCode,
          location,
        }),
      });

      const data = await response.json();

      const result: ScanResult = {
        success: data.success,
        userName: data.userName,
        membershipStatus: data.membershipStatus,
        daysLeft: data.daysLeft,
        message: data.message,
        timestamp: new Date(),
      };

      setScanResult(result);
      setRecentScans((prev) => [result, ...prev.slice(0, 4)]);

      if (data.success) {
        toast.success(`Welcome, ${data.userName}!`, {
          icon: "✅",
          duration: 3000,
        });
      } else {
        toast.error(data.message, {
          icon: "❌",
          duration: 4000,
        });
      }

      // Clear result after 3 seconds
      setTimeout(() => {
        setScanResult(null);
      }, 3000);
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Failed to validate entry");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-playfair gold-text mb-2">
            Member Check-In
          </h1>
          <p className="text-gray-400">
            Scan member QR codes for entry validation
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Scanner Section */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input"
                >
                  <option>Main Branch</option>
                  <option>Downtown</option>
                  <option>Riverside</option>
                  <option>Airport</option>
                  <option>Toul Kork</option>
                  <option>BKK1</option>
                  <option>Russian Market</option>
                  <option>Olympic</option>
                  <option>Chbar Ampov</option>
                  <option>Sen Sok</option>
                </select>
              </div>

              <QRScanner onScan={handleScan} />
            </div>

            {/* Scan Result Animation */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`card ${
                    scanResult.success
                      ? "border-green-500 bg-green-500/10"
                      : "border-red-500 bg-red-500/10"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div>
                      {scanResult.success ? (
                        <CheckCircle className="w-12 h-12 text-green-400" />
                      ) : (
                        <XCircle className="w-12 h-12 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-xl font-bold mb-2 ${
                          scanResult.success ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {scanResult.success ? "Entry Granted" : "Entry Denied"}
                      </h3>
                      {scanResult.userName && (
                        <p className="text-white text-lg font-semibold mb-1">
                          {scanResult.userName}
                        </p>
                      )}
                      <p className="text-gray-300">{scanResult.message}</p>
                      {scanResult.daysLeft !== undefined &&
                        scanResult.success && (
                          <p className="text-gray-400 text-sm mt-2">
                            Membership expires in {scanResult.daysLeft} days
                          </p>
                        )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Recent Scans */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-5 h-5 text-gold" />
                <h2 className="text-xl font-bold font-playfair text-white">
                  Recent Scans
                </h2>
              </div>

              {recentScans.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  No scans yet. Start by scanning a member's QR code.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentScans.map((scan, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-lg border ${
                        scan.success
                          ? "bg-green-500/5 border-green-500/30"
                          : "bg-red-500/5 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {scan.success ? (
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                          <span className="font-semibold text-white text-sm">
                            {scan.userName || "Unknown"}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {formatDateTime(scan.timestamp)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 card bg-gray-900/50">
          <h3 className="text-lg font-bold text-white mb-4">Instructions</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start space-x-2">
              <span className="text-gold mt-1">•</span>
              <span>
                Ask the member to show their QR code from their dashboard
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold mt-1">•</span>
              <span>Position the QR code within the camera frame</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold mt-1">•</span>
              <span>
                Wait for automatic scanning (usually takes less than 1 second)
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold mt-1">•</span>
              <span>
                Green = Entry granted, Red = Entry denied (expired/invalid)
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-gold mt-1">•</span>
              <span>
                If denied, direct the member to renew their membership
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
