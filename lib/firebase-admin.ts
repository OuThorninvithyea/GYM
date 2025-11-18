import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK (server-side only)
if (!admin.apps.length) {
  try {
    const rawPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    if (!rawPrivateKey || !projectId || !clientEmail) {
      console.error("Missing Firebase Admin credentials:", {
        hasPrivateKey: !!rawPrivateKey,
        hasProjectId: !!projectId,
        hasClientEmail: !!clientEmail,
      });
      throw new Error("Firebase Admin credentials not configured");
    }

    let privateKey = rawPrivateKey.trim();

    // Remove wrapping quotes if present
    if (
      (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
      (privateKey.startsWith("'") && privateKey.endsWith("'"))
    ) {
      privateKey = privateKey.slice(1, -1);
    }

    // Convert escaped newlines
    privateKey = privateKey.replace(/\\r\\n/g, "\n").replace(/\\n/g, "\n");

    const maybeBase64 = privateKey.replace(/\s+/g, "");

    // If the key still doesn't contain a PEM header, try decoding base64
    if (
      !privateKey.includes("BEGIN") &&
      /^[A-Za-z0-9+/=]+$/.test(maybeBase64)
    ) {
      try {
        privateKey = Buffer.from(maybeBase64, "base64").toString("utf8");
      } catch (err) {
        console.warn("Failed to decode base64 private key, using raw value");
      }
    }

    privateKey = privateKey.trim();

    if (!privateKey.includes("BEGIN PRIVATE KEY")) {
      throw new Error("Firebase Admin private key is not in PEM format");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });

    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase admin initialization error", error);
    throw error;
  }
}

export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
export default admin;
