/**
 * Script to seed example user data for vithyeass@gmail.com
 * Run with: npx ts-node scripts/seed-example-user.ts
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

const EXAMPLE_USER = {
  email: "vithyeass@gmail.com",
  name: "Vithyeas",
  phone: "+85512345678",
  password: "Test@2024!",
};

async function seedExampleUser() {
  console.log("🚀 Starting example user data seeding...\n");

  try {
    // Step 1: Create or get user in Authentication
    console.log(
      "📧 Step 1: Creating/Getting user in Firebase Authentication..."
    );
    let userRecord;
    let userId;

    try {
      // Try to get existing user
      userRecord = await auth.getUserByEmail(EXAMPLE_USER.email);
      userId = userRecord.uid;
      console.log(`✅ User already exists with UID: ${userId}`);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        // Create new user
        userRecord = await auth.createUser({
          email: EXAMPLE_USER.email,
          password: EXAMPLE_USER.password,
          displayName: EXAMPLE_USER.name,
        });
        userId = userRecord.uid;
        console.log(`✅ User created with UID: ${userId}`);
        console.log(`   Email: ${EXAMPLE_USER.email}`);
        console.log(`   Password: ${EXAMPLE_USER.password}`);
      } else {
        throw error;
      }
    }

    // Step 2: Create/Update user document in Firestore
    console.log("\n📝 Step 2: Creating user document in Firestore...");
    const joinDate = new Date("2024-08-15T08:00:00Z");
    const expiryDate = new Date("2025-08-15T23:59:59Z");

    const userData = {
      uid: userId,
      name: EXAMPLE_USER.name,
      email: EXAMPLE_USER.email,
      phone: EXAMPLE_USER.phone,
      joinDate: Timestamp.fromDate(joinDate),
      expiryDate: Timestamp.fromDate(expiryDate),
      membershipPlan: "12-month",
      qrId: "ELIT-VIT-2024-001",
      stripeCustomerId: "cus_example123",
      isActive: true,
      location: "Phnom Penh - Central",
      role: "member",
    };

    await db.collection("users").doc(userId).set(userData);
    console.log("✅ User document created/updated");

    // Step 3: Add check-in entries
    console.log("\n🏋️ Step 3: Adding check-in entries...");
    const entries = [
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-16T06:30:00Z",
        checkoutTime: "2024-11-16T08:15:00Z",
        duration: 105,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-15T17:00:00Z",
        checkoutTime: "2024-11-15T18:45:00Z",
        duration: 105,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-14T06:15:00Z",
        checkoutTime: "2024-11-14T07:30:00Z",
        duration: 75,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-13T18:00:00Z",
        checkoutTime: "2024-11-13T19:30:00Z",
        duration: 90,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-12T06:45:00Z",
        checkoutTime: "2024-11-12T08:00:00Z",
        duration: 75,
      },
      {
        location: "Phnom Penh - Riverside",
        timestamp: "2024-11-11T17:30:00Z",
        checkoutTime: "2024-11-11T19:00:00Z",
        duration: 90,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-09T07:00:00Z",
        checkoutTime: "2024-11-09T08:30:00Z",
        duration: 90,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-08T18:15:00Z",
        checkoutTime: "2024-11-08T20:00:00Z",
        duration: 105,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-07T06:30:00Z",
        checkoutTime: "2024-11-07T07:45:00Z",
        duration: 75,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-06T17:00:00Z",
        checkoutTime: "2024-11-06T18:15:00Z",
        duration: 75,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-05T06:00:00Z",
        checkoutTime: "2024-11-05T07:30:00Z",
        duration: 90,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-04T18:30:00Z",
        checkoutTime: "2024-11-04T20:00:00Z",
        duration: 90,
      },
      {
        location: "Siem Reap - Main",
        timestamp: "2024-11-02T08:00:00Z",
        checkoutTime: "2024-11-02T09:45:00Z",
        duration: 105,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-11-01T06:15:00Z",
        checkoutTime: "2024-11-01T07:30:00Z",
        duration: 75,
      },
      {
        location: "Phnom Penh - Central",
        timestamp: "2024-10-31T17:45:00Z",
        checkoutTime: "2024-10-31T19:00:00Z",
        duration: 75,
      },
    ];

    for (const entry of entries) {
      await db.collection("entries").add({
        userId: userId,
        userName: EXAMPLE_USER.name,
        location: entry.location,
        timestamp: Timestamp.fromDate(new Date(entry.timestamp)),
        checkoutTime: Timestamp.fromDate(new Date(entry.checkoutTime)),
        duration: entry.duration,
        staffId: "staff_001",
      });
    }
    console.log(`✅ Added ${entries.length} check-in entries`);

    // Step 4: Add payment record
    console.log("\n💳 Step 4: Adding payment record...");
    await db.collection("payments").add({
      userId: userId,
      userName: EXAMPLE_USER.name,
      amount: 306,
      date: Timestamp.fromDate(new Date("2024-08-15T10:30:00Z")),
      status: "completed",
      stripeId: "pi_example_12month",
      plan: "12-month",
      description: "12 Month + 1 FREE Membership",
    });
    console.log("✅ Payment record added");

    // Summary
    console.log("\n" + "=".repeat(60));
    console.log("🎉 SUCCESS! Example user data has been seeded!");
    console.log("=".repeat(60));
    console.log("\n📊 Summary:");
    console.log(`   User ID: ${userId}`);
    console.log(`   Email: ${EXAMPLE_USER.email}`);
    console.log(`   Password: ${EXAMPLE_USER.password}`);
    console.log(`   Name: ${EXAMPLE_USER.name}`);
    console.log(`   Plan: 12-month (Aug 15, 2024 - Aug 15, 2025)`);
    console.log(`   Check-ins: ${entries.length} entries`);
    console.log(`   Total Workout Time: 1,320 minutes (22 hours)`);
    console.log(`   Average Session: 88 minutes`);
    console.log(`\n🚀 Next Steps:`);
    console.log(`   1. Go to: http://localhost:3002/login`);
    console.log(`   2. Sign in with:`);
    console.log(`      Email: ${EXAMPLE_USER.email}`);
    console.log(`      Password: ${EXAMPLE_USER.password}`);
    console.log(`   3. View your dashboard with all statistics!\n`);
  } catch (error) {
    console.error("\n❌ Error seeding data:", error);
    throw error;
  }
}

// Run the script
seedExampleUser()
  .then(() => {
    console.log("✅ Script completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Script failed:", error);
    process.exit(1);
  });
