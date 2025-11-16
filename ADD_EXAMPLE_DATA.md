# Adding Example User Data - Step by Step Guide

This guide shows how to add example data for user **vitihyeass@gmail.com** including gym attendance history, membership details, and workout statistics.

## Overview

The example data includes:
- **User Profile**: Member since Aug 15, 2024 with 12-month plan
- **15 Gym Check-ins**: With timestamps, locations, and durations
- **Payment History**: Initial 12-month membership payment
- **Statistics**: Total visits, workout time, favorite location, etc.

## Step 1: Create User in Firebase Authentication

### Option A: Using Google Sign-In (Recommended)
1. Go to: http://localhost:3002/signup
2. Click **"Continue with Google"**
3. Sign in with **vitihyeass@gmail.com**
4. Complete the signup form:
   - Name: `Vithyeas`
   - Phone: `+855 12 345 678`
   - Select: `12 Month + 1 FREE` plan
5. Complete payment (use Stripe test card: `4242 4242 4242 4242`)
6. **Copy the UID** from the browser console or Firebase

### Option B: Manual Creation in Firebase Console
1. Go to: https://console.firebase.google.com
2. Select project: **elit-9ab85**
3. Click **Authentication** → **Users**
4. Click **"Add user"**
5. Enter:
   - Email: `vitihyeass@gmail.com`
   - Password: `Test@2024!`
6. Click "Add user"
7. **Copy the UID** of the created user

## Step 2: Update User Document in Firestore

1. **Go to Firestore Database** in Firebase Console
2. Click on **"users"** collection
3. Find the document with your UID (or create new one)
4. Update/Add the following fields:

```
Field               Type        Value
----------------------------------------------------
uid                 string      [Your copied UID]
name                string      Vithyeas
email               string      vitihyeass@gmail.com
phone               string      +85512345678
joinDate            timestamp   August 15, 2024, 8:00:00 AM
expiryDate          timestamp   August 15, 2025, 11:59:59 PM
membershipPlan      string      12-month
qrId                string      ELIT-VIT-2024-001
stripeCustomerId    string      cus_example123
isActive            boolean     true
location            string      Phnom Penh - Central
role                string      member
```

**To convert dates to timestamps:**
- August 15, 2024, 8:00:00 AM → Click timestamp field → Select date/time
- August 15, 2025, 11:59:59 PM → Click timestamp field → Select date/time

## Step 3: Add Entry Records (Check-in History)

For each entry below, go to Firestore → **"entries"** collection → **"Add document"** → Let Firestore auto-generate ID

### Entry 1 (Today - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 16, 2024, 6:30:00 AM
checkoutTime:   November 16, 2024, 8:15:00 AM
duration:       105
staffId:        staff_001
```

### Entry 2 (Yesterday - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 15, 2024, 5:00:00 PM
checkoutTime:   November 15, 2024, 6:45:00 PM
duration:       105
staffId:        staff_002
```

### Entry 3 (Nov 14 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 14, 2024, 6:15:00 AM
checkoutTime:   November 14, 2024, 7:30:00 AM
duration:       75
staffId:        staff_001
```

### Entry 4 (Nov 13 - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 13, 2024, 6:00:00 PM
checkoutTime:   November 13, 2024, 7:30:00 PM
duration:       90
staffId:        staff_003
```

### Entry 5 (Nov 12 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 12, 2024, 6:45:00 AM
checkoutTime:   November 12, 2024, 8:00:00 AM
duration:       75
staffId:        staff_001
```

### Entry 6 (Nov 11 - Evening - Different Location)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Riverside
timestamp:      November 11, 2024, 5:30:00 PM
checkoutTime:   November 11, 2024, 7:00:00 PM
duration:       90
staffId:        staff_004
```

### Entry 7 (Nov 9 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 9, 2024, 7:00:00 AM
checkoutTime:   November 9, 2024, 8:30:00 AM
duration:       90
staffId:        staff_001
```

### Entry 8 (Nov 8 - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 8, 2024, 6:15:00 PM
checkoutTime:   November 8, 2024, 8:00:00 PM
duration:       105
staffId:        staff_002
```

### Entry 9 (Nov 7 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 7, 2024, 6:30:00 AM
checkoutTime:   November 7, 2024, 7:45:00 AM
duration:       75
staffId:        staff_001
```

### Entry 10 (Nov 6 - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 6, 2024, 5:00:00 PM
checkoutTime:   November 6, 2024, 6:15:00 PM
duration:       75
staffId:        staff_003
```

### Entry 11 (Nov 5 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 5, 2024, 6:00:00 AM
checkoutTime:   November 5, 2024, 7:30:00 AM
duration:       90
staffId:        staff_001
```

### Entry 12 (Nov 4 - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 4, 2024, 6:30:00 PM
checkoutTime:   November 4, 2024, 8:00:00 PM
duration:       90
staffId:        staff_002
```

### Entry 13 (Nov 2 - Different City)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Siem Reap - Main
timestamp:      November 2, 2024, 8:00:00 AM
checkoutTime:   November 2, 2024, 9:45:00 AM
duration:       105
staffId:        staff_005
```

### Entry 14 (Nov 1 - Morning)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      November 1, 2024, 6:15:00 AM
checkoutTime:   November 1, 2024, 7:30:00 AM
duration:       75
staffId:        staff_001
```

### Entry 15 (Oct 31 - Evening)
```
userId:         [Your UID]
userName:       Vithyeas
location:       Phnom Penh - Central
timestamp:      October 31, 2024, 5:45:00 PM
checkoutTime:   October 31, 2024, 7:00:00 PM
duration:       75
staffId:        staff_003
```

## Step 4: Add Payment Record

1. Go to Firestore → **"payments"** collection
2. Click **"Add document"** → Let Firestore auto-generate ID
3. Add fields:

```
Field           Type        Value
----------------------------------------------------
userId          string      [Your UID]
userName        string      Vithyeas
amount          number      306
date            timestamp   August 15, 2024, 10:30:00 AM
status          string      completed
stripeId        string      pi_example_12month
plan            string      12-month
description     string      12 Month + 1 FREE Membership
```

## Step 5: Verify the Data

1. **Login as the user**
   - Go to: http://localhost:3002/login
   - Sign in with: `vitihyeass@gmail.com`

2. **Check Dashboard**
   - Should see membership card showing "12 Month + 1 FREE"
   - Expiry date: August 15, 2025
   - QR Code: ELIT-VIT-2024-001
   - Days remaining: ~272 days

3. **Check Admin Dashboard** (if you're an admin)
   - Go to: http://localhost:3002/admin
   - You should see Vithyeas in the member list
   - Entry history should show 15 visits

## Quick Stats Summary

After adding all data, the user will have:

| Metric | Value |
|--------|-------|
| **Member Since** | August 15, 2024 (93 days ago) |
| **Plan Duration** | 12 months (365 days) |
| **Days Remaining** | 272 days |
| **Total Visits** | 15 check-ins |
| **Total Workout Time** | 1,320 minutes (22 hours) |
| **Average Session** | 88 minutes (~1.5 hours) |
| **Visits Per Week** | 3.5 times |
| **Favorite Location** | Phnom Penh - Central (13/15 visits) |
| **Workout Times** | Morning (60%) & Evening (40%) |

## Alternative: Quick Import Script (Advanced)

If you want to import all data at once using a script:

1. Save your UID to replace `REPLACE_WITH_ACTUAL_UID` in `EXAMPLE_USER_DATA.json`
2. Use Firebase Admin SDK to batch import
3. Or use Firestore import/export tools

## Troubleshooting

### Can't see entries in dashboard
- Make sure `userId` in entries matches the user's UID exactly
- Check that timestamps are in the past
- Verify entries collection exists in Firestore

### Membership shows as expired
- Check `expiryDate` is in the future
- Verify `isActive` is set to `true`
- Check `membershipPlan` matches one of: "1-month", "6-month", "12-month"

### QR code doesn't work
- Verify `qrId` field exists and is unique
- Check `isActive` is `true`
- Ensure membership hasn't expired

### No payment history
- Check `payments` collection exists
- Verify payment document has correct `userId`
- Confirm `status` is "completed"

## Next Steps

After adding the data:

1. ✅ Login as vitihyeass@gmail.com
2. ✅ View dashboard with all stats
3. ✅ Check workout history
4. ✅ Test QR code for check-in
5. ✅ View on admin dashboard
6. ✅ Generate reports

---

**Your example user data is now ready to test the full system!** 🎉

