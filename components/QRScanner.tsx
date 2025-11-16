"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff } from "lucide-react";
import toast from "react-hot-toast";

interface QRScannerProps {
  onScan: (decodedText: string) => void;
  isScanning?: boolean;
}

export default function QRScanner({
  onScan,
  isScanning = true,
}: QRScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScannedRef = useRef(false);

  const startScanning = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          if (!isScannedRef.current) {
            isScannedRef.current = true;
            onScan(decodedText);
            // Reset after 2 seconds to allow scanning again
            setTimeout(() => {
              isScannedRef.current = false;
            }, 2000);
          }
        },
        (errorMessage) => {
          // Ignore scanning errors (happens when no QR in view)
        }
      );

      setScanning(true);
      setCameraError(null);
    } catch (error: any) {
      console.error("QR Scanner error:", error);
      setCameraError(error.message || "Failed to start camera");
      toast.error("Failed to start camera. Please check permissions.");
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
        scannerRef.current = null;
        setScanning(false);
      } catch (error) {
        console.error("Error stopping scanner:", error);
      }
    }
  };

  const toggleScanning = () => {
    if (scanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  useEffect(() => {
    if (isScanning && !scanning) {
      startScanning();
    }

    return () => {
      stopScanning();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScanning]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-md">
        <div
          id="qr-reader"
          className="rounded-xl overflow-hidden border-4 border-gold shadow-2xl"
          style={{ minHeight: "300px" }}
        />

        {cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-xl">
            <div className="text-center px-6">
              <CameraOff className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 font-semibold mb-2">
                Camera Access Required
              </p>
              <p className="text-sm text-gray-400">{cameraError}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={toggleScanning}
        className={`btn flex items-center space-x-2 ${
          scanning ? "btn-outline" : "btn-primary"
        }`}
      >
        {scanning ? (
          <CameraOff className="w-5 h-5" />
        ) : (
          <Camera className="w-5 h-5" />
        )}
        <span>{scanning ? "Stop Scanning" : "Start Scanning"}</span>
      </button>

      <div className="text-center text-sm text-gray-400 max-w-md">
        <p>Position the QR code within the frame to scan</p>
        <p className="mt-2">Make sure you have granted camera permissions</p>
      </div>
    </div>
  );
}
