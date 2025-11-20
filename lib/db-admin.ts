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

export async function getUserByPhoneAdmin(phone: string): Promise<User | null> {
  try {
    const snapshot = await adminDb
      .collection("users")
      .where("phone", "==", phone)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      uid: doc.id,
      ...data,
      joinDate: data?.joinDate?.toDate(),
      expiryDate: data?.expiryDate?.toDate(),
    } as User;
  } catch (error) {
    console.error("Error getting user by phone (admin):", error);
    return null;
  }
}

export async function getUserByEmailAdmin(email: string): Promise<User | null> {
  try {
    const snapshot = await adminDb
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const data = doc.data();
    return {
      uid: doc.id,
      ...data,
      joinDate: data?.joinDate?.toDate(),
      expiryDate: data?.expiryDate?.toDate(),
    } as User;
  } catch (error) {
    console.error("Error getting user by email (admin):", error);
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

// Create user (Admin SDK)
export async function createUserAdmin(
  userData: Omit<User, "uid">
): Promise<string> {
  try {
    const userRef = adminDb.collection("users").doc(userData.qrId);
    await userRef.set({
      ...userData,
      joinDate: Timestamp.fromDate(userData.joinDate),
      expiryDate: Timestamp.fromDate(userData.expiryDate),
      createdAt: Timestamp.now(),
    });
    return userData.qrId;
  } catch (error) {
    console.error("Error creating user (admin):", error);
    throw error;
  }
}

// Get all users (Admin SDK)
export async function getAllUsersAdmin(): Promise<User[]> {
  try {
    const querySnapshot = await adminDb.collection("users").get();
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        ...data,
        joinDate: data.joinDate?.toDate(),
        expiryDate: data.expiryDate?.toDate(),
      } as User;
    });
  } catch (error) {
    console.error("Error getting all users (admin):", error);
    return [];
  }
}

// Get recent entries (Admin SDK)
export async function getRecentEntriesAdmin(
  limitCount: number = 50
): Promise<Entry[]> {
  try {
    const entriesSnapshot = await adminDb
      .collection("entries")
      .orderBy("timestamp", "desc")
      .limit(limitCount)
      .get();

    return entriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
      checkoutTime: doc.data().checkoutTime?.toDate(),
    })) as Entry[];
  } catch (error) {
    console.error("Error getting recent entries (admin):", error);
    return [];
  }
}

// Create entry (Admin SDK)
export async function createEntryAdmin(
  entryData: Omit<Entry, "id">
): Promise<string> {
  try {
    const docRef = await adminDb.collection("entries").add({
      ...entryData,
      timestamp: Timestamp.fromDate(entryData.timestamp),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating entry (admin):", error);
    throw error;
  }
}

// Helper functions
export function getMembershipStatus(
  user: User
): "active" | "expiring" | "expired" {
  const daysLeft = getDaysUntilExpiry(user.expiryDate);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 7) return "expiring";
  return "active";
}

export function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
