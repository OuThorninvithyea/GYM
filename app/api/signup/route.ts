import { NextRequest, NextResponse } from "next/server";
import { createUserAdmin } from "@/lib/db-admin";
import { getPlanDuration } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, plan, qrId } = body;

    if (!name || !phone || !plan || !qrId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const joinDate = new Date();
    const duration = getPlanDuration(plan);
    const expiryDate = new Date(joinDate);
    expiryDate.setDate(expiryDate.getDate() + duration);

    const userId = await createUserAdmin({
      phone,
      name,
      email,
      joinDate,
      expiryDate,
      membershipPlan: plan,
      qrId,
      isActive: false, // Will be activated after payment
      role: "member",
    });

    return NextResponse.json({
      success: true,
      userId,
      userName: name,
      message: "Account created successfully",
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
