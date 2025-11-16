import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as nodemailer from "nodemailer";

admin.initializeApp();

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Twilio client (optional)
// const twilioClient = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

/**
 * Daily cron job to send renewal reminders
 * Runs every day at 9:00 AM Cambodia time (UTC+7)
 */
export const sendDailyReminders = functions.pubsub
  .schedule("0 9 * * *")
  .timeZone("Asia/Phnom_Penh")
  .onRun(async (context) => {
    try {
      const db = admin.firestore();
      const now = new Date();

      // Calculate dates for 7 days and 1 day from now
      const sevenDaysFromNow = new Date(now);
      sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

      const oneDayFromNow = new Date(now);
      oneDayFromNow.setDate(oneDayFromNow.getDate() + 1);

      // Query users expiring in 7 days or 1 day
      const usersSnapshot = await db.collection("users").get();

      let remindersSent = 0;

      for (const doc of usersSnapshot.docs) {
        const user = doc.data();
        const expiryDate = user.expiryDate.toDate();

        // Check if expiry is in 7 days or 1 day
        const daysUntilExpiry = Math.ceil(
          (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysUntilExpiry === 7 || daysUntilExpiry === 1) {
          try {
            // Send email
            if (user.email) {
              await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: `Elit Gym - Membership Expiring in ${daysUntilExpiry} Day${
                  daysUntilExpiry > 1 ? "s" : ""
                }`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #d4af37;">Membership Renewal Reminder</h1>
                    <p>Hi ${user.name},</p>
                    <p>Your Elit Gym membership will expire in <strong>${daysUntilExpiry} day${
                  daysUntilExpiry > 1 ? "s" : ""
                }</strong>.</p>
                    <p>Don't let your fitness journey pause! Renew now to keep accessing all 20 Elit Gym locations.</p>
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
                       style="display: inline-block; background: #d4af37; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
                      Renew Now
                    </a>
                    <p>Thank you for being part of the Elit Gym family!</p>
                  </div>
                `,
              });
            }

            // Send SMS (uncomment if Twilio is configured)
            // if (user.phone) {
            //   await twilioClient.messages.create({
            //     body: `Hi ${user.name}, your Elit Gym membership expires in ${daysUntilExpiry} day${daysUntilExpiry > 1 ? 's' : ''}. Renew now: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            //     from: process.env.TWILIO_PHONE_NUMBER,
            //     to: user.phone,
            //   });
            // }

            remindersSent++;
          } catch (error) {
            console.error(`Failed to send reminder to ${user.name}:`, error);
          }
        }
      }

      console.log(`Daily reminders sent: ${remindersSent}`);
      return null;
    } catch (error) {
      console.error("Error in sendDailyReminders:", error);
      throw error;
    }
  });

/**
 * Webhook handler for Stripe events (alternative to API route)
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    // Process Stripe webhook
    // This is an alternative to the Next.js API route
    res.status(200).send({ received: true });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    res.status(500).send("Webhook processing failed");
  }
});
