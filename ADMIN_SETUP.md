# Admin Account Setup Guide

This guide explains how to create and manage admin accounts for the Elit Gym management system.

## Overview

The Elit Gym app has two separate login systems:

1. **Member Login** (`/login`) - For gym members (Phone + Google authentication)
2. **Admin Login** (`/admin/login`) - For gym administrators (Email + Password authentication)

## Creating Your First Admin Account

Since new signups through the app automatically create "member" accounts, you need to manually create admin accounts through Firebase Console.

### Step 1: Create the Admin User in Firebase Authentication

1. **Go to Firebase Console**

   - Visit: https://console.firebase.google.com
   - Select your project: **elit-9ab85**

2. **Navigate to Authentication**

   - Click on **"Authentication"** in the left sidebar
   - Click on the **"Users"** tab

3. **Add New User**
   - Click **"Add user"** button
   - Enter:
     - **Email**: `admin@elitgym.com` (or your preferred admin email)
     - **Password**: Create a strong password
   - Click **"Add user"**
   - **Copy the UID** of the newly created user (you'll need it in the next step)

### Step 2: Create Admin Record in Firestore

1. **Go to Firestore Database**

   - In Firebase Console, click **"Firestore Database"** in the left sidebar

2. **Create Admin User Document**

   - Click on the **"users"** collection
   - Click **"Add document"**
   - Set **Document ID** to the **UID you copied** from Step 1
   - Add the following fields:

   ```
   Field               Type        Value
   ------------------------------------------------
   uid                 string      [Same as document ID]
   name                string      Admin Name
   email               string      admin@elitgym.com
   phone               string      +85512345678
   role                string      admin
   isActive            boolean     true
   joinDate            timestamp   [Current date/time]
   expiryDate          timestamp   [Far future date, e.g., 2099-12-31]
   membershipPlan      string      admin
   qrId                string      ADMIN-001
   location            string      Head Office
   ```

3. **Click "Save"**

### Step 3: Test Admin Login

1. **Go to Admin Login Page**

   - Navigate to: http://localhost:3002/admin/login

2. **Enter Admin Credentials**

   - Email: `admin@elitgym.com`
   - Password: [Password you created in Step 1]

3. **Click "Sign In"**
   - You should be redirected to `/admin` dashboard
   - You'll see all members, statistics, and admin controls

## Creating Additional Admin Accounts

Repeat Steps 1-3 above for each new admin user.

**Recommended Admin Emails:**

- `admin@elitgym.com` - Main administrator
- `manager@elitgym.com` - Gym manager
- `staff@elitgym.com` - Senior staff with admin access

## Security Best Practices

### For Admin Accounts

1. **Use Strong Passwords**

   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Avoid common words or patterns

2. **Limit Admin Access**

   - Only create admin accounts for trusted personnel
   - Regularly review who has admin access
   - Remove admin access when employees leave

3. **Use Official Email Addresses**

   - Use company email addresses (e.g., `@elitgym.com`)
   - Avoid personal email addresses for admin accounts

4. **Enable Two-Factor Authentication** (Recommended)
   - In Firebase Console → Authentication → Sign-in method
   - Enable Multi-factor authentication
   - Require admins to set up 2FA

### For Admin Login Page

1. **The admin login page is separate from member login**

   - Members cannot access `/admin` without admin role
   - Attempting to access shows "Access Denied" message

2. **Role-Based Access Control**

   - Admin dashboard checks user role before loading
   - API endpoints should also verify admin role (recommended enhancement)

3. **Session Management**
   - Admin sessions use Firebase Authentication
   - Automatically expire after inactivity
   - Sign out properly when finished

## Role Types

The system supports three user roles:

| Role   | Access Level                        | Login Method          |
| ------ | ----------------------------------- | --------------------- |
| member | Member dashboard, QR code, check-in | Phone/Google          |
| staff  | Check-in scanner, basic reporting   | Phone/Google (future) |
| admin  | Full admin dashboard, all controls  | Email/Password        |

## Converting a Member to Admin

If you need to promote an existing member to admin:

1. **Find the User in Firestore**

   - Go to Firestore Database → `users` collection
   - Search for the user by name or phone

2. **Update the Role Field**

   - Click on the user document
   - Find the `role` field
   - Change value from `"member"` to `"admin"`
   - Click "Update"

3. **Create Email/Password Login** (if they only have phone auth)

   - Go to Authentication → Users
   - Find the user by phone number
   - Click on the user
   - Click "Add" next to "Email/Password"
   - Enter email and password
   - Save

4. **Notify the User**
   - Tell them their admin credentials
   - Direct them to `/admin/login` instead of `/login`

## Troubleshooting

### Error: "Invalid email or password"

- Double-check the email and password
- Verify the user exists in Authentication → Users
- Password is case-sensitive

### Error: "Access denied. Admin credentials required."

- The user account exists but doesn't have admin role
- Go to Firestore → users → [user's UID]
- Check if `role` field is set to `"admin"`
- If missing or different, update it to `"admin"`

### Error: "User not found"

- The user exists in Authentication but not in Firestore
- Follow Step 2 above to create the Firestore document
- Make sure the Document ID matches the UID from Authentication

### Can't access admin dashboard after login

- Clear browser cache and cookies
- Try incognito/private browsing mode
- Check browser console (F12) for errors
- Verify role in Firestore is exactly `"admin"` (lowercase)

### Admin login redirects to member login

- Make sure you're going to `/admin/login` not `/login`
- These are two separate login pages
- Bookmark the correct URL: http://localhost:3002/admin/login

## Default Admin Credentials

For development/testing purposes, you should create:

```
Email: admin@elitgym.com
Password: Admin@2024!Elite
```

**IMPORTANT:** Change this password in production!

## Quick Reference

| What             | URL                               |
| ---------------- | --------------------------------- |
| Member Login     | http://localhost:3002/login       |
| Member Signup    | http://localhost:3002/signup      |
| Admin Login      | http://localhost:3002/admin/login |
| Admin Dashboard  | http://localhost:3002/admin       |
| Member Dashboard | http://localhost:3002/dashboard   |

## Next Steps

After setting up your admin account:

1. ✅ Test login at `/admin/login`
2. ✅ Access admin dashboard at `/admin`
3. ✅ Review member list and statistics
4. ✅ Test sending reminders
5. ✅ Export member data (CSV)
6. ✅ Create additional admin accounts as needed

---

**Need Help?**

If you encounter any issues:

1. Check Firebase Console for authentication errors
2. Verify Firestore document structure matches above
3. Check browser console for JavaScript errors
4. Ensure all required fields are filled in Firestore
