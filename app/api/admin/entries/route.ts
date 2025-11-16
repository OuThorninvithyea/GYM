import { NextRequest, NextResponse } from "next/server";
import { getRecentEntriesAdmin } from "@/lib/db-admin";

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const entries = await getRecentEntriesAdmin(100);

    return NextResponse.json({
      success: true,
      entries,
    });
  } catch (error: any) {
    console.error("Get entries error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch entries" },
      { status: 500 }
    );
  }
}
