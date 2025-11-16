import { NextRequest, NextResponse } from "next/server";
import { getAllUsers, getMembershipStatus, getDaysUntilExpiry } from "@/lib/db";
// import { sendSMS } from '@/lib/twilio';
// import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication check here

    const users = await getAllUsers();

    // Filter users who need reminders (7 days or 1 day before expiry)
    const usersNeedingReminders = users.filter((user) => {
      const daysLeft = getDaysUntilExpiry(user.expiryDate);
      return daysLeft === 7 || daysLeft === 1;
    });

    let sentCount = 0;

    for (const user of usersNeedingReminders) {
      const daysLeft = getDaysUntilExpiry(user.expiryDate);
      const message = `Hi ${
        user.name
      }, your Elit Gym membership expires in ${daysLeft} day${
        daysLeft > 1 ? "s" : ""
      }. Renew now: ${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;

      try {
        // Send SMS
        // await sendSMS(user.phone, message);

        // Send Email if available
        // if (user.email) {
        //   await sendEmail(user.email, 'Membership Expiring Soon', message);
        // }

        sentCount++;
        console.log(`Reminder sent to ${user.name}`);
      } catch (error) {
        console.error(`Failed to send reminder to ${user.name}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      count: sentCount,
      message: `Reminders sent to ${sentCount} members`,
    });
  } catch (error: any) {
    console.error("Send reminders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send reminders" },
      { status: 500 }
    );
  }
}
