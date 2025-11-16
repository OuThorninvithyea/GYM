import { adminDb } from "./firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

// Types
export interface User {
  uid: string;
  phone: string;
  name: string;
  email?: string;
  joinDate: Date;
  expiryDate: Date;
  membershipPlan: "1-month" | "6-month" | "12-month";
  qrId: string;
  stripeCustomerId?: string;
  isActive: boolean;
  location?: string;
  role?: "member" | "staff" | "admin";
}

export interface Payment {
  id?: string;
  userId: string;
  userName: string;
  amount: number;
  date: Date;
  status: "pending" | "completed" | "failed";
  stripeId?: string;
  plan: string;
}

// Admin User operations (bypass Firestore security rules)
export async function updateUserAdmin(
  uid: string,
  data: Partial<User>
): Promise<void> {
  try {
    const userRef = adminDb.collection("users").doc(uid);
    const updateData: any = { ...data };

    if (data.expiryDate) {
      updateData.expiryDate = Timestamp.fromDate(data.expiryDate);
    }

    await userRef.update(updateData);
  } catch (error) {
    console.error("Error updating user (admin):", error);
    throw error;
  }
}

// Admin Payment operations (bypass Firestore security rules)
export async function createPaymentAdmin(
  paymentData: Omit<Payment, "id">
): Promise<string> {
  try {
    const docRef = await adminDb.collection("payments").add({
      ...paymentData,
      date: Timestamp.fromDate(paymentData.date),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating payment (admin):", error);
    throw error;
  }
}

export async function getUserByIdAdmin(uid: string): Promise<User | null> {
  try {
    const userDoc = await adminDb.collection("users").doc(uid).get();
    if (userDoc.exists) {
      const data = userDoc.data();
      return {
        uid: userDoc.id,
        ...data,
        joinDate: data?.joinDate?.toDate(),
        expiryDate: data?.expiryDate?.toDate(),
      } as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user (admin):", error);
    return null;
  }
}

// Entry operations
export interface Entry {
  id?: string;
  userId: string;
  userName: string;
  location: string;
  timestamp: Date;
  checkoutTime?: Date;
  duration?: number;
  staffId?: string;
}

export async function getUserEntriesAdmin(userId: string): Promise<Entry[]> {
  try {
    const entriesSnapshot = await adminDb
      .collection("entries")
      .where("userId", "==", userId)
      .orderBy("timestamp", "desc")
      .get();
    
    return entriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
      checkoutTime: doc.data().checkoutTime?.toDate(),
    })) as Entry[];
  } catch (error) {
    console.error("Error getting user entries (admin):", error);
    return [];
  }
}
