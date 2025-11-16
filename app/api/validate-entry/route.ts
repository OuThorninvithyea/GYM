import { NextRequest, NextResponse } from "next/server";
import {
  getUserById,
  createEntry,
  getMembershipStatus,
  getDaysUntilExpiry,
} from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qrId, location } = body;

    if (!qrId || !location) {
      return NextResponse.json(
        { error: "QR ID and location required" },
        { status: 400 }
      );
    }

    // Get user by QR ID
    const user = await getUserById(qrId);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid QR code. Member not found.",
      });
    }

    // Check membership status
    const status = getMembershipStatus(user);
    const daysLeft = getDaysUntilExpiry(user.expiryDate);

    if (status === "expired") {
      return NextResponse.json({
        success: false,
        userName: user.name,
        membershipStatus: status,
        daysLeft,
        message: "Membership expired. Please renew to access the gym.",
      });
    }

    // Log the entry
    await createEntry({
      userId: user.uid,
      userName: user.name,
      location,
      timestamp: new Date(),
    });

    return NextResponse.json({
      success: true,
      userName: user.name,
      membershipStatus: status,
      daysLeft,
      message: `Welcome, ${user.name}! Entry logged successfully.`,
    });
  } catch (error: any) {
    console.error("Validate entry error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to validate entry" },
      { status: 500 }
    );
  }
}
