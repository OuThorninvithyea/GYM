import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {
    const promosSnapshot = await adminDb
      .collection("promos")
      .where("active", "==", true)
      .orderBy("createdAt", "desc")
      .get();

    const promos = promosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()?.toISOString(),
    }));

    return NextResponse.json({ promos, success: true });
  } catch (error: unknown) {
    console.error("Error fetching promos:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch promos";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

