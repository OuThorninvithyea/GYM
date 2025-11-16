import { NextRequest, NextResponse } from "next/server";
import { getAllUsersAdmin } from "@/lib/db-admin";

export async function GET(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here
    // const user = await getAuthUser(request);
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const users = await getAllUsersAdmin();

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (error: any) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}
