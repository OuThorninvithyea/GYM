import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

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

export interface Entry {
  id?: string;
  userId: string;
  userName: string;
  location: string;
  timestamp: Date;
  checkoutTime?: Date;
  duration?: number; // in minutes
  staffId?: string;
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

export interface Promo {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  createdAt: Date;
}

// User operations
export async function getUserById(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        uid: userDoc.id,
        ...data,
        joinDate: data.joinDate?.toDate(),
        expiryDate: data.expiryDate?.toDate(),
      } as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

export async function createUser(userData: Omit<User, "uid">): Promise<string> {
  try {
    const userRef = doc(db, "users", userData.qrId);
    await setDoc(userRef, {
      ...userData,
      joinDate: Timestamp.fromDate(userData.joinDate),
      expiryDate: Timestamp.fromDate(userData.expiryDate),
      createdAt: Timestamp.now(),
    });
    return userData.qrId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(
  uid: string,
  data: Partial<User>
): Promise<void> {
  try {
    const userRef = doc(db, "users", uid);
    const updateData: any = { ...data };

    if (data.expiryDate) {
      updateData.expiryDate = Timestamp.fromDate(data.expiryDate);
    }

    await updateDoc(userRef, updateData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function getUserByPhone(phone: string): Promise<User | null> {
  try {
    const q = query(
      collection(db, "users"),
      where("phone", "==", phone),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const data = userDoc.data();
      return {
        uid: userDoc.id,
        ...data,
        joinDate: data.joinDate?.toDate(),
        expiryDate: data.expiryDate?.toDate(),
      } as User;
    }
    return null;
  } catch (error) {
    console.error("Error getting user by phone:", error);
    return null;
  }
}

// Entry operations
export async function createEntry(
  entryData: Omit<Entry, "id">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "entries"), {
      ...entryData,
      timestamp: Timestamp.fromDate(entryData.timestamp),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
}

export async function getRecentEntries(
  limitCount: number = 50
): Promise<Entry[]> {
  try {
    const q = query(
      collection(db, "entries"),
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
      checkoutTime: doc.data().checkoutTime?.toDate(),
    })) as Entry[];
  } catch (error) {
    console.error("Error getting entries:", error);
    return [];
  }
}

export async function getUserEntries(userId: string): Promise<Entry[]> {
  try {
    const q = query(
      collection(db, "entries"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate(),
      checkoutTime: doc.data().checkoutTime?.toDate(),
    })) as Entry[];
  } catch (error) {
    console.error("Error getting user entries:", error);
    return [];
  }
}

// Payment operations
export async function createPayment(
  paymentData: Omit<Payment, "id">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      ...paymentData,
      date: Timestamp.fromDate(paymentData.date),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export async function getPaymentsByUser(userId: string): Promise<Payment[]> {
  try {
    const q = query(
      collection(db, "payments"),
      where("userId", "==", userId),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
    })) as Payment[];
  } catch (error) {
    console.error("Error getting payments:", error);
    return [];
  }
}

// Promo operations
export async function getActivePromos(): Promise<Promo[]> {
  try {
    const q = query(
      collection(db, "promos"),
      where("active", "==", true),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Promo[];
  } catch (error) {
    console.error("Error getting promos:", error);
    return [];
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
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
    console.error("Error getting all users:", error);
    return [];
  }
}

// Helper functions
export function isUserActive(user: User): boolean {
  return user.isActive && new Date() < new Date(user.expiryDate);
}

export function getDaysUntilExpiry(expiryDate: Date): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getMembershipStatus(
  user: User
): "active" | "expiring" | "expired" {
  const daysLeft = getDaysUntilExpiry(user.expiryDate);
  if (daysLeft < 0) return "expired";
  if (daysLeft <= 7) return "expiring";
  return "active";
}
