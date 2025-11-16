import { NextRequest, NextResponse } from "next/server";
import { getUserEntries } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const entries = await getUserEntries(userId);

    return NextResponse.json({ entries, success: true });
  } catch (error: unknown) {
    console.error("Error fetching user entries:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch entries";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

