# Create Admin Account - Quick Guide

This guide will help you create an admin account to access the admin dashboard at `/admin/login`.

---

## 🚀 Quick Start (Choose One Method)

### ⚡ Method 1: Automated Script (Fastest - If Firebase Admin is set up)

```bash
npm run create:admin
```

**That's it!** The script will:

- ✅ Create admin@elitgym.com account
- ✅ Set role to "admin"
- ✅ Configure all necessary fields
- ✅ Display login credentials

**Then login at**: http://localhost:3002/admin/login

---

### 🔨 Method 2: Manual Setup (Always Works)

Follow these simple steps in Firebase Console:

#### Step 1: Create User in Firebase Authentication

1. **Go to Firebase Console**:

   ```
   https://console.firebase.google.com/project/elite-gym-518f4/authentication/users
   ```

2. **Click "Add user" button**

3. **Enter details**:

   - **Email**: `admin@elitgym.com`
   - **Password**: `Admin@2024!Elite` (or your preferred password)

4. **Click "Add user"**

5. **Copy the UID** (you'll need it in Step 2)
   - It looks like: `abc123xyz456...`

#### Step 2: Create Admin Document in Firestore

1. **Go to Firestore Database**:

   ```
   https://console.firebase.google.com/project/elite-gym-518f4/firestore
   ```

2. **Click on "users" collection**

   - If it doesn't exist, click "Start collection" → Name it "users"

3. **Click "Add document"**

4. **Set Document ID**:

   - Use the **UID you copied** from Step 1
   - Or click "Auto-ID" if you're creating from scratch

5. **Add these fields**:

   | Field            | Type      | Value                 |
   | ---------------- | --------- | --------------------- |
   | `uid`            | string    | (same as document ID) |
   | `name`           | string    | `Admin User`          |
   | `email`          | string    | `admin@elitgym.com`   |
   | `phone`          | string    | `+855 12 000 000`     |
   | `role`           | string    | `admin` ⭐ IMPORTANT! |
   | `isActive`       | boolean   | `true`                |
   | `membershipPlan` | string    | `admin`               |
   | `qrId`           | string    | `ADMIN-001`           |
   | `location`       | string    | `Head Office`         |
   | `joinDate`       | timestamp | (Today's date)        |
   | `expiryDate`     | timestamp | (10 years from now)   |

6. **Click "Save"**

#### Step 3: Test Admin Login

1. **Go to admin login**:

   ```
   http://localhost:3002/admin/login
   ```

2. **Enter credentials**:

   - Email: `admin@elitgym.com`
   - Password: `Admin@2024!Elite`

3. **Click "Sign In"**

4. **You should be redirected to**: `/admin` dashboard! 🎉

---

## 📋 Default Admin Credentials

```
Email:    admin@elitgym.com
Password: Admin@2024!Elite
```

⚠️ **IMPORTANT**: Change this password in production!

---

## 🎯 Quick Visual Guide (Manual Method)

### Firebase Console Navigation:

```
1. Firebase Console
   └─ Authentication
      └─ Users
         └─ "Add user"
            ├─ Email: admin@elitgym.com
            ├─ Password: Admin@2024!Elite
            └─ [Add user] → Copy UID

2. Firebase Console
   └─ Firestore Database
      └─ users (collection)
         └─ "Add document"
            ├─ Document ID: [paste UID]
            ├─ role: "admin" ⭐
            ├─ name: "Admin User"
            ├─ email: "admin@elitgym.com"
            └─ [Save]

3. Your App
   └─ http://localhost:3002/admin/login
      ├─ Email: admin@elitgym.com
      ├─ Password: Admin@2024!Elite
      └─ [Sign In] → Admin Dashboard! 🎉
```

---

## 🔧 Troubleshooting

### Error: "Firebase Admin credentials not found"

**Solution**: The automated script needs Firebase Admin setup. Use Method 2 (Manual) instead.

### Error: "Invalid email or password"

**Solutions**:

- Double-check the email: `admin@elitgym.com`
- Password is case-sensitive: `Admin@2024!Elite`
- Verify user exists in Firebase Authentication

### Error: "Access denied. Admin credentials required"

**Solutions**:

- Check Firestore → users → [admin UID]
- Verify `role` field is set to `"admin"` (lowercase)
- Make sure the document ID matches the user's UID from Authentication

### Can't see admin dashboard after login

**Solutions**:

- Clear browser cache and cookies
- Try incognito/private mode
- Check browser console (F12) for errors
- Verify `role` field in Firestore is exactly `"admin"`

### Script fails with credential error

**Solution**: You need Firebase Admin credentials:

1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Add credentials to `.env.local` (see below)

---

## 🔐 Setting Up Firebase Admin (For Automated Script)

If you want to use the automated script (`npm run create:admin`), you need Firebase Admin credentials:

### Step 1: Get Service Account Key

1. **Go to Firebase Console**:

   ```
   https://console.firebase.google.com/project/elite-gym-518f4/settings/serviceaccounts/adminsdk
   ```

2. **Click "Generate new private key"**

3. **Download the JSON file** (keep it secure!)

### Step 2: Add to `.env.local`

Open your `.env.local` file and add these lines:

```env
# Firebase Admin SDK (for server-side operations)
FIREBASE_PROJECT_ID=elite-gym-518f4
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@elite-gym-518f4.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
```

**Extract from downloaded JSON**:

- `FIREBASE_PROJECT_ID` → `project_id`
- `FIREBASE_CLIENT_EMAIL` → `client_email`
- `FIREBASE_PRIVATE_KEY` → `private_key`

### Step 3: Run the Script

```bash
npm run create:admin
```

---

## ✅ Verification Checklist

After creating the admin account:

- [ ] User exists in Firebase Authentication
- [ ] User document exists in Firestore `users` collection
- [ ] `role` field is set to `"admin"`
- [ ] Can login at `/admin/login`
- [ ] Redirected to `/admin` dashboard
- [ ] Can see member list and statistics
- [ ] Can export data and send reminders

---

## 🎨 What You'll See After Login

### Admin Dashboard Features:

```
📊 Statistics Cards:
├─ Total Members
├─ Active Members
├─ Expiring Soon
└─ Total Revenue

📋 Member Management:
├─ View all members
├─ Filter by status (active/expiring/expired)
├─ Export to CSV
└─ Send renewal reminders

📈 Recent Check-ins:
└─ View latest gym entries

🔔 Actions:
├─ Send Reminders (email/SMS)
└─ Export All Data
```

---

## 📱 Multiple Admin Accounts

Want to create more admin accounts? Repeat the same steps with different emails:

**Suggested admin emails**:

- `admin@elitgym.com` - Main administrator
- `manager@elitgym.com` - Gym manager
- `staff@elitgym.com` - Senior staff with admin access

Just make sure to set `role: "admin"` in Firestore for each one!

---

## 🔒 Security Best Practices

1. ✅ **Use strong passwords** (minimum 12 characters)
2. ✅ **Change default password** (`Admin@2024!Elite`)
3. ✅ **Use company email addresses** (@elitgym.com)
4. ✅ **Limit admin access** (only trusted personnel)
5. ✅ **Regularly review** admin user list
6. ✅ **Remove access** when employees leave
7. ✅ **Enable 2FA** (Two-Factor Authentication) in production

---

## 🆘 Quick Help

### Can't access Firebase Console?

See: `FIREBASE_ACCESS_GUIDE.md`

### Need detailed admin setup?

See: `ADMIN_SETUP.md`

### Want to understand login systems?

See: `LOGIN_SYSTEM_OVERVIEW.md`

---

## 🎯 Quick Reference

| What                 | Where                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| **Admin Login**      | http://localhost:3002/admin/login                                          |
| **Admin Dashboard**  | http://localhost:3002/admin                                                |
| **Firebase Auth**    | https://console.firebase.google.com/project/elite-gym-518f4/authentication |
| **Firestore**        | https://console.firebase.google.com/project/elite-gym-518f4/firestore      |
| **Default Email**    | admin@elitgym.com                                                          |
| **Default Password** | Admin@2024!Elite                                                           |

---

## 🚀 Next Steps After Creating Admin

1. ✅ **Test admin login** at `/admin/login`
2. ✅ **Explore admin dashboard**
3. ✅ **Change default password**
4. ✅ **Create additional admin accounts** if needed
5. ✅ **Add member test data** (see `SEED_USER_INSTRUCTIONS.md`)
6. ✅ **Configure email/SMS** for reminders
7. ✅ **Test member workflows**

---

**You're all set! Let's create that admin account! 🎉**

Choose your method:

- **Quick**: `npm run create:admin`
- **Manual**: Follow Step 1 & 2 above
