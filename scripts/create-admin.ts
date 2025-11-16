/**
 * Script to create an admin user account
 * Run with: npm run create:admin
 */

import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Initialize Firebase Admin
if (getApps().length === 0) {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const serviceAccount = {
    projectId: projectId,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };

  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

const auth = getAuth();
const db = getFirestore();

// Admin account details
const ADMIN_USER = {
  email: "admin@elitgym.com",
  password: "Admin@2024!Elite",
  name: "Admin User",
  phone: "+85512000000",
};

async function createAdminUser() {
  console.log("🔐 Creating Admin Account for Elit Gym...\n");
  console.log("=".repeat(60));

  try {
    // Step 1: Create or get user in Authentication
    console.log("\n📧 Step 1: Setting up admin in Firebase Authentication...");
    let userRecord;
    let userId;

    try {
      // Check if admin already exists
      userRecord = await auth.getUserByEmail(ADMIN_USER.email);
      userId = userRecord.uid;
      console.log(`✅ Admin user already exists with UID: ${userId}`);
      console.log(`   Updating to ensure admin role...`);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        // Create new admin user
        userRecord = await auth.createUser({
          email: ADMIN_USER.email,
          password: ADMIN_USER.password,
          displayName: ADMIN_USER.name,
          emailVerified: true,
        });
        userId = userRecord.uid;
        console.log(`✅ Admin user created successfully!`);
        console.log(`   UID: ${userId}`);
        console.log(`   Email: ${ADMIN_USER.email}`);
      } else {
        throw error;
      }
    }

    // Step 2: Create/Update admin document in Firestore
    console.log("\n📝 Step 2: Creating admin profile in Firestore...");

    const joinDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 10); // 10 years from now

    const adminData = {
      uid: userId,
      name: ADMIN_USER.name,
      email: ADMIN_USER.email,
      phone: ADMIN_USER.phone,
      joinDate: Timestamp.fromDate(joinDate),
      expiryDate: Timestamp.fromDate(expiryDate),
      membershipPlan: "admin",
      qrId: "ADMIN-001",
      isActive: true,
      location: "Head Office",
      role: "admin", // ← This is the important part!
    };

    await db.collection("users").doc(userId).set(adminData, { merge: true });
    console.log("✅ Admin profile created/updated in Firestore");
    console.log(`   Role: admin`);
    console.log(`   Location: Head Office`);

    // Success summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 SUCCESS! Admin account is ready!");
    console.log("=".repeat(60));
    console.log("\n📋 Admin Account Details:");
    console.log(`   Email:    ${ADMIN_USER.email}`);
    console.log(`   Password: ${ADMIN_USER.password}`);
    console.log(`   Name:     ${ADMIN_USER.name}`);
    console.log(`   Role:     admin`);
    console.log(`   UID:      ${userId}`);

    console.log("\n🚀 How to Login:");
    console.log(`   1. Go to: http://localhost:3002/admin/login`);
    console.log(`   2. Email: ${ADMIN_USER.email}`);
    console.log(`   3. Password: ${ADMIN_USER.password}`);

    console.log("\n⚠️  IMPORTANT SECURITY NOTES:");
    console.log(`   • Change this password in production!`);
    console.log(`   • Keep admin credentials secure`);
    console.log(`   • Don't share admin access`);

    console.log("\n✅ You can now access the admin dashboard!\n");
  } catch (error) {
    console.error("\n❌ Error creating admin user:", error);

    if ((error as any).code === "app/invalid-credential") {
      console.log(
        "\n💡 TIP: You need to set up Firebase Admin credentials first."
      );
      console.log("   See FIREBASE_ADMIN_SETUP.md for instructions.\n");
    }

    throw error;
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log("✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
