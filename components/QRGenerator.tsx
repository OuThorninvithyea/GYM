"use client";

import { QRCodeSVG } from "qrcode.react";
import { Download, Share2 } from "lucide-react";
import { downloadQRCode } from "@/lib/utils";
import toast from "react-hot-toast";

interface QRGeneratorProps {
  value: string;
  userName: string;
  size?: number;
}

export default function QRGenerator({
  value,
  userName,
  size = 256,
}: QRGeneratorProps) {
  const handleDownload = () => {
    try {
      downloadQRCode("member-qr-code", `${userName}-qr-code.png`);
      toast.success("QR code downloaded!");
    } catch (error) {
      toast.error("Failed to download QR code");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Elit Gym QR Code",
          text: "Scan this QR code to check me in at Elit Gym",
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      toast.error("Sharing not supported on this device");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="qr-container shadow-2xl animate-fade-in">
        <QRCodeSVG
          id="member-qr-code"
          value={value}
          size={size}
          level="H"
          includeMargin={true}
          imageSettings={{
            src: "/elit-logo.png",
            height: 40,
            width: 40,
            excavate: true,
          }}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400 mb-1">Member ID</p>
        <p className="text-lg font-mono font-semibold text-gold">{value}</p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleDownload}
          className="btn-outline flex items-center space-x-2 text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
        <button
          onClick={handleShare}
          className="btn-outline flex items-center space-x-2 text-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 max-w-xs">
        <p>Show this QR code at any Elit Gym location to check in</p>
      </div>
    </div>
  );
}
