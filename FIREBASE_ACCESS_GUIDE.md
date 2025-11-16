# Firebase Console Access Guide

## 🎯 Your Firebase Project Details

**Project ID**: `elite-gym-518f4`  
**Project Name**: Elite Gym (or similar)  
**Auth Domain**: `elite-gym-518f4.firebaseapp.com`

---

## 🔥 How to Access Your Firebase Console

### Step 1: Open Firebase Console

```
https://console.firebase.google.com
```

### Step 2: Find Your Project

Look for one of these:

- **"elite-gym-518f4"** (Project ID)
- **"Elite Gym"** (Project Name)
- Any project with "gym" or "elite" in the name

### Step 3: Click on Your Project

Once you find it, click to open the project dashboard

---

## ❓ Don't See Your Project?

### Check 1: Verify Your Google Account

You might be logged into a different Google account.

**To check:**

1. Look at the top-right corner of Firebase Console
2. Click your profile picture
3. See which email is logged in
4. If it's wrong, click **"Add another account"** or switch accounts

**Common scenarios:**

- ✅ Using personal Gmail for Firebase
- ✅ Using work/company email
- ✅ Using different account than current one

### Check 2: Create the Project (If It Doesn't Exist)

If you truly don't have a Firebase project yet, let's create it:

#### Option A: Use Existing Project ID

1. Go to: https://console.firebase.google.com
2. Click **"Add project"**
3. Enter project name: `Elite Gym`
4. Accept terms → Continue
5. Disable Google Analytics (optional) → Create project
6. Wait for setup to complete

#### Option B: I'll Guide You Through Setup

---

## 🏗️ Setting Up Your Firebase Project (If Needed)

### 1. Create Project

```
https://console.firebase.google.com
→ "Add project"
→ Name: "Elite Gym"
→ Continue → Create Project
```

### 2. Enable Authentication

```
Left Sidebar → Authentication
→ "Get started"
→ Sign-in method tab
→ Enable "Google" → Save
→ Enable "Phone" → Save
```

### 3. Create Firestore Database

```
Left Sidebar → Firestore Database
→ "Create database"
→ Start in "Test mode" (for development)
→ Location: asia-southeast1 (Singapore) or closest
→ Enable
```

### 4. Set Up Web App

```
Project Overview (⚙️) → Project settings
→ Your apps section
→ Click "</>" (Web icon)
→ App nickname: "Elite Gym Web"
→ Register app
→ Copy the config (you already have this)
```

---

## 📱 Quick Access URLs

Once you know your project name/ID:

### Direct Links (replace with your project ID):

```
Firestore Database:
https://console.firebase.google.com/project/elite-gym-518f4/firestore

Authentication:
https://console.firebase.google.com/project/elite-gym-518f4/authentication

Project Settings:
https://console.firebase.google.com/project/elite-gym-518f4/settings/general
```

---

## 🎯 What to Do After Accessing

### 1. View Your Data

**Firestore Database** → See collections:

- `users` - Member profiles
- `entries` - Gym check-ins
- `payments` - Payment records
- `promos` - Promotional offers

### 2. Check Authentication

**Authentication** → **Users** tab

- See all registered members
- Add new users manually
- View sign-in methods

### 3. Configure Settings

**Project Settings** (⚙️ icon)

- View your Firebase config
- Manage service accounts
- Set up integrations

---

## 🆘 Still Can't Find It?

### Try This:

1. **Go to**: https://console.firebase.google.com
2. **Look at all your projects** (even if names are different)
3. **Click on each one** to check if it's the gym app
4. **Check the Firebase config** in the project matches your `.env.local`

### Match These Values:

Your `.env.local` has:

```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elite-gym-518f4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elite-gym-518f4.firebaseapp.com
```

So look for a project with:

- Project ID: `elite-gym-518f4`
- Auth domain: `elite-gym-518f4.firebaseapp.com`

---

## 🔐 If You Need to Create Fresh Project

If you want to start completely fresh:

### Step 1: Create New Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter name (e.g., "Elit Gym App")
4. Create project

### Step 2: Get Configuration

1. Project Settings → Your apps → Add app (web)
2. Copy the Firebase config

### Step 3: Update `.env.local`

Replace all `NEXT_PUBLIC_FIREBASE_*` values with new config

### Step 4: Enable Services

- Authentication (Google + Phone)
- Firestore Database

---

## ✅ Verification Checklist

Once you access your project:

- [ ] Can see project dashboard
- [ ] Firestore Database is visible
- [ ] Authentication is set up
- [ ] Can see "elite-gym-518f4" in URL
- [ ] Configuration matches `.env.local`

---

## 📞 Next Steps

After you find/access your Firebase Console:

1. **Check Firestore** → See if you have any data
2. **Check Authentication** → See if any users exist
3. **Add example data** → Follow `SEED_USER_INSTRUCTIONS.md`
4. **Test the app** → Login and view dashboard

---

## 🎓 Quick Firebase Console Tour

Once inside:

```
Firebase Console Layout:
┌─────────────────────────────────────┐
│ [Firebase Logo] [Project Selector]  │ ← Top bar
├─────────────────────────────────────┤
│ • Project Overview                  │
│ • Authentication          ← Users   │
│ • Firestore Database     ← Data    │
│ • Storage                           │
│ • Functions                         │
│ • ⚙️ Project Settings                │
└─────────────────────────────────────┘
```

**Most Used:**

- **Firestore Database** - View/edit data
- **Authentication** - Manage users
- **Project Settings** - Configuration

---

**Let me know what you see when you go to Firebase Console, and I'll help you from there! 🚀**
