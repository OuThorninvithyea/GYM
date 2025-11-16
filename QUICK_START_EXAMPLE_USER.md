# Quick Start: Add Example User Data

This guide will automatically create and populate data for **vithyeass@gmail.com** with complete workout history and statistics!

## 🚀 Automated Setup (Recommended)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Run the Seeding Script

```bash
npm run seed:user
```

**That's it!** The script will automatically:

- ✅ Create user account (vithyeass@gmail.com)
- ✅ Add user profile with 12-month membership
- ✅ Add 15 check-in entries with durations
- ✅ Add payment record
- ✅ Set up complete workout history

### Step 3: Login and View

```bash
# Make sure your dev server is running
npm run dev

# Then go to:
http://localhost:3002/login

# Login with:
Email: vithyeass@gmail.com
Password: Test@2024!
```

## 📊 What Gets Created

### User Profile:

```
Name: Vithyeas
Email: vithyeass@gmail.com
Phone: +855 12 345 678
Plan: 12-month (Aug 15, 2024 - Aug 15, 2025)
QR ID: ELIT-VIT-2024-001
Status: Active
```

### Check-in History (15 entries):

```
1.  Nov 16, 2024 • 6:30 AM  → 105 min @ Phnom Penh - Central
2.  Nov 15, 2024 • 5:00 PM  → 105 min @ Phnom Penh - Central
3.  Nov 14, 2024 • 6:15 AM  → 75 min  @ Phnom Penh - Central
4.  Nov 13, 2024 • 6:00 PM  → 90 min  @ Phnom Penh - Central
5.  Nov 12, 2024 • 6:45 AM  → 75 min  @ Phnom Penh - Central
6.  Nov 11, 2024 • 5:30 PM  → 90 min  @ Phnom Penh - Riverside
7.  Nov 9,  2024 • 7:00 AM  → 90 min  @ Phnom Penh - Central
8.  Nov 8,  2024 • 6:15 PM  → 105 min @ Phnom Penh - Central
9.  Nov 7,  2024 • 6:30 AM  → 75 min  @ Phnom Penh - Central
10. Nov 6,  2024 • 5:00 PM  → 75 min  @ Phnom Penh - Central
11. Nov 5,  2024 • 6:00 AM  → 90 min  @ Phnom Penh - Central
12. Nov 4,  2024 • 6:30 PM  → 90 min  @ Phnom Penh - Central
13. Nov 2,  2024 • 8:00 AM  → 105 min @ Siem Reap - Main
14. Nov 1,  2024 • 6:15 AM  → 75 min  @ Phnom Penh - Central
15. Oct 31, 2024 • 5:45 PM  → 75 min  @ Phnom Penh - Central
```

### Statistics You'll See:

```
📊 Membership: 93 days active, 272 days remaining
📈 Total Check-ins: 15 visits
⏱️  Total Workout Time: 1,320 minutes (22 hours)
💪 Average Session: 88 minutes per workout
📍 Favorite Location: Phnom Penh - Central (13 visits)
📅 Visits Per Week: 3.5 times average
```

## 🛠️ Troubleshooting

### Error: "Firebase credentials not found"

**Solution:** Make sure your `.env.local` file has:

```env
FIREBASE_PROJECT_ID=elit-9ab85
FIREBASE_CLIENT_EMAIL=your-service-account@elit-9ab85.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Error: "User already exists"

**Good news!** The script detects existing users and just updates the data.
It will show: `✅ User already exists with UID: ...`

### Error: "ts-node not found"

**Solution:** Run `npm install` first to install ts-node

### Script runs but no data appears

**Check:**

1. Firebase Console → Authentication → Users (should see vithyeass@gmail.com)
2. Firebase Console → Firestore → `users` collection (should have document)
3. Firebase Console → Firestore → `entries` collection (should have 15 documents)

### Can't login with vithyeass@gmail.com

**Try:**

- Password: `Test@2024!`
- Check browser console for errors
- Verify Google/Phone auth is enabled in Firebase

## 📋 Script Output Example

When you run `npm run seed:user`, you'll see:

```
🚀 Starting example user data seeding...

📧 Step 1: Creating/Getting user in Firebase Authentication...
✅ User created with UID: abc123xyz456
   Email: vithyeass@gmail.com
   Password: Test@2024!

📝 Step 2: Creating user document in Firestore...
✅ User document created/updated

🏋️ Step 3: Adding check-in entries...
✅ Added 15 check-in entries

💳 Step 4: Adding payment record...
✅ Payment record added

============================================================
🎉 SUCCESS! Example user data has been seeded!
============================================================

📊 Summary:
   User ID: abc123xyz456
   Email: vithyeass@gmail.com
   Password: Test@2024!
   Name: Vithyeas
   Plan: 12-month (Aug 15, 2024 - Aug 15, 2025)
   Check-ins: 15 entries
   Total Workout Time: 1,320 minutes (22 hours)
   Average Session: 88 minutes

🚀 Next Steps:
   1. Go to: http://localhost:3002/login
   2. Sign in with:
      Email: vithyeass@gmail.com
      Password: Test@2024!
   3. View your dashboard with all statistics!
```

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Seed example user data
npm run seed:user

# Start dev server
npm run dev

# View the dashboard
# http://localhost:3002/login
```

## 🔄 Re-running the Script

You can run the script multiple times safely:

- If user exists → Updates data
- If entries exist → Adds new ones (duplicates allowed for testing)
- If you want to start fresh → Delete user from Firebase Console first

## 🎨 What You'll See in Dashboard

After seeding and logging in:

1. **Membership Card**

   - Shows active 12-month plan
   - Progress bar at 25.5%
   - 272 days remaining

2. **Workout Statistics**

   - 15 total check-ins
   - 22 hours total workout time
   - 88 minutes average session

3. **Membership Timeline**

   - Visual progress bar
   - Days as member vs remaining
   - Plan type and duration

4. **Recent Check-ins**

   - Last 10 visits with details
   - Location, date, time, duration
   - Beautiful card layout

5. **QR Code**
   - ELIT-VIT-2024-001
   - Ready to scan at gym

## 📝 Manual Setup (Alternative)

If you prefer manual setup, see: **`ADD_EXAMPLE_DATA.md`**

---

**Ready to see your data in action! 🎉**

Run: `npm run seed:user` and then login!
