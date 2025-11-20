import { NextRequest, NextResponse } from "next/server";
import {
  getUserByIdAdmin,
  getUserByPhoneAdmin,
  getUserByEmailAdmin,
} from "@/lib/db-admin";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");
    const phone = searchParams.get("phone");
    const email = searchParams.get("email");

    if (!uid && !phone && !email) {
      return NextResponse.json(
        { error: "User identifier required" },
        { status: 400 }
      );
    }

    let user = null;

    if (uid && /^ELIT-/i.test(uid)) {
      user = await getUserByIdAdmin(uid);
    }

    if (!user && phone) {
      user = await getUserByPhoneAdmin(phone);
    }

    if (!user && email) {
      user = await getUserByEmailAdmin(email);
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}
