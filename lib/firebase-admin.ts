import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK (server-side only)
if (!admin.apps.length) {
  try {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    if (!privateKey || !projectId || !clientEmail) {
      console.error("Missing Firebase Admin credentials:", {
        hasPrivateKey: !!privateKey,
        hasProjectId: !!projectId,
        hasClientEmail: !!clientEmail,
      });
      throw new Error("Firebase Admin credentials not configured");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey.replace(/\\n/g, "\n"),
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
