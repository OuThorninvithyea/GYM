# Add Example User Data - vithyeass@gmail.com

## ⚠️ Current Status

The automated seeding script needs Firebase Admin credentials. You have 2 options:

---

## ✅ Option 1: Quick Manual Setup (5-10 minutes)

This is the **easiest and quickest way** to add the data!

### Step 1: Create User Account

**Via Signup Page (Recommended):**

1. Go to: http://localhost:3002/signup
2. Click **"Continue with Google"**
3. Sign in with **vithyeass@gmail.com**
4. Complete the form:
   - Name: `Vithyeas`
   - Phone: `+855 12 345 678`
   - Select: **12 Month + 1 FREE** plan
5. Use test card: `4242 4242 4242 4242` (any future date, any CVC)
6. Complete signup

**OR Via Firebase Console:**

1. Go to: https://console.firebase.google.com
2. Select: **elit-9ab85**
3. **Authentication** → **Users** → **Add user**
4. Email: `vithyeass@gmail.com`
5. Password: `Test@2024!`
6. Copy the **UID**

### Step 2: Update User Document in Firestore

1. **Firestore Database** → **users** collection
2. Find the document (use UID if you created manually)
3. Update these fields:

```
joinDate:       August 15, 2024, 8:00:00 AM UTC
expiryDate:     August 15, 2025, 11:59:59 PM UTC
membershipPlan: 12-month
qrId:           ELIT-VIT-2024-001
location:       Phnom Penh - Central
isActive:       true
```

### Step 3: Add 15 Check-in Entries

For each entry, go to **Firestore** → **entries** collection → **Add document** → Auto-generate ID

**Copy & paste these quickly (update userId with your UID):**

```javascript
// Entry 1
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 16, 2024 at 6:30:00 AM UTC,
  checkoutTime: November 16, 2024 at 8:15:00 AM UTC,
  duration: 105,
  staffId: "staff_001"
}

// Entry 2
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 15, 2024 at 5:00:00 PM UTC,
  checkoutTime: November 15, 2024 at 6:45:00 PM UTC,
  duration: 105,
  staffId: "staff_002"
}

// Entry 3
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 14, 2024 at 6:15:00 AM UTC,
  checkoutTime: November 14, 2024 at 7:30:00 AM UTC,
  duration: 75,
  staffId: "staff_001"
}

// Entry 4
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 13, 2024 at 6:00:00 PM UTC,
  checkoutTime: November 13, 2024 at 7:30:00 PM UTC,
  duration: 90,
  staffId: "staff_003"
}

// Entry 5
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 12, 2024 at 6:45:00 AM UTC,
  checkoutTime: November 12, 2024 at 8:00:00 AM UTC,
  duration: 75,
  staffId: "staff_001"
}

// Entry 6 (Different location)
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Riverside",
  timestamp: November 11, 2024 at 5:30:00 PM UTC,
  checkoutTime: November 11, 2024 at 7:00:00 PM UTC,
  duration: 90,
  staffId: "staff_004"
}

// Entry 7
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 9, 2024 at 7:00:00 AM UTC,
  checkoutTime: November 9, 2024 at 8:30:00 AM UTC,
  duration: 90,
  staffId: "staff_001"
}

// Entry 8
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 8, 2024 at 6:15:00 PM UTC,
  checkoutTime: November 8, 2024 at 8:00:00 PM UTC,
  duration: 105,
  staffId: "staff_002"
}

// Entry 9
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 7, 2024 at 6:30:00 AM UTC,
  checkoutTime: November 7, 2024 at 7:45:00 AM UTC,
  duration: 75,
  staffId: "staff_001"
}

// Entry 10
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 6, 2024 at 5:00:00 PM UTC,
  checkoutTime: November 6, 2024 at 6:15:00 PM UTC,
  duration: 75,
  staffId: "staff_003"
}

// Entry 11
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 5, 2024 at 6:00:00 AM UTC,
  checkoutTime: November 5, 2024 at 7:30:00 AM UTC,
  duration: 90,
  staffId: "staff_001"
}

// Entry 12
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 4, 2024 at 6:30:00 PM UTC,
  checkoutTime: November 4, 2024 at 8:00:00 PM UTC,
  duration: 90,
  staffId: "staff_002"
}

// Entry 13 (Different city!)
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Siem Reap - Main",
  timestamp: November 2, 2024 at 8:00:00 AM UTC,
  checkoutTime: November 2, 2024 at 9:45:00 AM UTC,
  duration: 105,
  staffId: "staff_005"
}

// Entry 14
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: November 1, 2024 at 6:15:00 AM UTC,
  checkoutTime: November 1, 2024 at 7:30:00 AM UTC,
  duration: 75,
  staffId: "staff_001"
}

// Entry 15
{
  userId: "YOUR_UID_HERE",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: October 31, 2024 at 5:45:00 PM UTC,
  checkoutTime: October 31, 2024 at 7:00:00 PM UTC,
  duration: 75,
  staffId: "staff_003"
}
```

### Step 4: Test It!

1. Go to: http://localhost:3002/login
2. Login with vithyeass@gmail.com
3. See your dashboard with all statistics! 🎉

---

## 🤖 Option 2: Automated Script (Requires Firebase Admin Setup)

### Prerequisites

You need to add Firebase Admin credentials to `.env.local`:

1. **Get Service Account Key:**

   - Firebase Console → **Project Settings** (⚙️)
   - **Service accounts** tab
   - Click **"Generate new private key"**
   - Download the JSON file

2. **Add to `.env.local`:**

```env
# Existing Firebase client config (already have these)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ... other NEXT_PUBLIC vars

# Add Firebase Admin credentials (NEW - from service account JSON)
FIREBASE_PROJECT_ID=elit-9ab85
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@elit-9ab85.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

### Run the Script

```bash
npm run seed:user
```

**Output:**

```
🚀 Starting example user data seeding...

📧 Step 1: Creating user in Firebase Authentication...
✅ User created with UID: abc123xyz

📝 Step 2: Creating user document in Firestore...
✅ User document created

🏋️ Step 3: Adding 15 check-in entries...
✅ Added 15 check-in entries

💳 Step 4: Adding payment record...
✅ Payment record added

🎉 SUCCESS! Example user data has been seeded!
```

---

## 📊 What You'll See After Setup

### Dashboard Statistics:

```
┌───────────────────────────────────┐
│  Membership Timeline              │
│  Aug 15, 2024 ━━━━━ Aug 15, 2025 │
│  [████████░░░░░░] 25.5%           │
│  93 days | 272 remaining          │
└───────────────────────────────────┘

┌──────────┬──────────┬──────────┐
│ 📈 15    │ ⏱️ 22h   │ 💪 88m   │
│ Visits   │ Total    │ Average  │
└──────────┴──────────┴──────────┘

📍 Phnom Penh - Central (13 visits)

Recent Check-ins:
• Nov 16 • 6:30 AM → 105m
• Nov 15 • 5:00 PM → 105m
• Nov 14 • 6:15 AM → 75m
... and 12 more
```

---

## ⏱️ Time Estimates

- **Option 1 (Manual)**: 5-10 minutes
- **Option 2 (Automated)**: 2 minutes (after Firebase Admin setup)

## 💡 Recommendation

**For quick testing: Use Option 1 (Manual)**

- Faster to start
- No additional configuration needed
- Works immediately

**For production/development: Use Option 2 (Automated)**

- Reusable for multiple test users
- Consistent data
- Easy to reset and re-seed

---

## 🆘 Need Help?

**Can't add entries?**

- Make sure Firestore database is created
- Check if collections exist (`users`, `entries`)
- Verify UID matches exactly

**Can't login?**

- Password: `Test@2024!`
- Enable Google Auth in Firebase Console
- Check browser console for errors

**No statistics showing?**

- Verify entries have correct `userId`
- Check `duration` field is a number
- Ensure timestamps are dates, not strings

---

## ✅ Quick Checklist

- [ ] User created (vithyeass@gmail.com)
- [ ] User document updated with dates
- [ ] 15 entries added with durations
- [ ] Can login successfully
- [ ] Dashboard shows statistics
- [ ] Recent check-ins appear
- [ ] Membership timeline displays

---

**Choose your preferred method and let's get started! 🚀**

I recommend **Option 1 (Manual)** for now - it's faster and simpler!
