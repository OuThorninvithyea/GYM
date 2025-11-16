# Elit Gym - Login System Overview

Your Elit Gym app now has **two completely separate login systems** for customers and administrators.

## 🎯 Quick Summary

| User Type   | Login Page     | Authentication Method | Access To                           |
| ----------- | -------------- | --------------------- | ----------------------------------- |
| **Members** | `/login`       | Phone OTP + Google    | Member Dashboard, QR Code, Check-in |
| **Admins**  | `/admin/login` | Email + Password      | Admin Dashboard, Member Management  |

## 🏃 Member Login System

### URL: `/login`

**Authentication Options:**

1. **Phone Number (SMS OTP)**

   - Enter phone number (+855 or 0XX format)
   - Receive 6-digit OTP via SMS
   - Enter OTP to log in

2. **Google Sign-In**
   - Click "Sign in with Google" button
   - Select Google account
   - Instant login (no OTP needed)

**Features:**

- Mobile-first design (black & gold theme)
- Simplified for quick access
- QR code generation after login
- Membership status tracking
- Automatic reminders

**Access After Login:**

- Member Dashboard (`/dashboard`)
- QR Code for check-in
- Membership details
- Payment history
- Renewal options

## 👔 Admin Login System

### URL: `/admin/login`

**Authentication Method:**

- Email + Password only
- More secure for administrative access
- Role-based verification

**Features:**

- Professional admin portal design
- Gold/black theme with shield branding
- Password visibility toggle
- "Authorized Personnel Only" notice
- Security warnings

**Access After Login:**

- Admin Dashboard (`/admin`)
- Member management
- Entry tracking
- Revenue statistics
- Send reminders
- Data export (CSV)

**Security Features:**

1. **Role Verification**

   - Checks user role in database
   - Must have `role: "admin"`
   - Denies access if not admin

2. **Separate Authentication**

   - Cannot use phone/Google to access admin
   - Must use email/password
   - Prevents accidental admin access

3. **Access Protection**
   - Redirects to `/admin/login` if not authenticated
   - Shows "Access Denied" if logged in as member
   - All admin actions are logged

## 🔄 Navigation Between Systems

### From Member Login to Admin Login

- At bottom of `/login` page
- Link: "Are you an admin? Admin Login"
- Redirects to `/admin/login`

### From Admin Login to Member Login

- At bottom of `/admin/login` page
- Link: "Not an admin? Customer Login"
- Redirects to `/login`

### From Navbar

- Members see: Home, Dashboard, Check-In
- Admins see: Home, Dashboard, Check-In, **Admin**
- Clicking "Admin" goes to `/admin` (protected)

## 📱 User Experience Flow

### New Member Journey

1. Visit homepage → Click "Get Started"
2. Fill in details (or use Google)
3. Select membership plan
4. Complete payment via Stripe
5. Receive QR code
6. Use QR at gym for check-in

### Existing Member Login

1. Go to `/login`
2. Choose phone OTP or Google
3. Access dashboard
4. View membership status
5. Renew if needed

### Admin Journey

1. Go to `/admin/login` (bookmark this!)
2. Enter email + password
3. View admin dashboard
4. Manage members
5. Send reminders
6. Export reports

## 🎨 Design Differences

### Member Login (`/login`)

- **Color**: Black background with gold accents
- **Icon**: Lock icon
- **Title**: "Member Login"
- **Subtitle**: "Access your Elit Gym membership"
- **Buttons**:
  - Gold "Send OTP" button
  - White Google sign-in button
- **Feel**: Welcoming, modern, mobile-friendly

### Admin Login (`/admin/login`)

- **Color**: Gradient background (gray-900 → black)
- **Icon**: Shield icon (gold gradient)
- **Title**: "Admin Portal"
- **Subtitle**: "Elit Gym Management System"
- **Pattern**: Subtle gold dots background
- **Buttons**:
  - Gold "Sign In" button (with spinner on loading)
- **Feel**: Professional, secure, authoritative

## 🔐 Setting Up Admin Accounts

**Important:** New signups always create "member" accounts. To create admin accounts:

1. **Create user in Firebase Authentication**

   - Go to Firebase Console → Authentication
   - Add user with email/password

2. **Create Firestore document with admin role**
   - Go to Firestore → users collection
   - Add document with role: "admin"

**See detailed instructions:** `ADMIN_SETUP.md`

## 🛡️ Security Considerations

### Member Login Security

- Phone numbers verified via SMS OTP
- Google accounts already verified by Google
- Session timeout after inactivity
- No sensitive admin access

### Admin Login Security

- Email/password with strong password requirements
- Role-based access control
- Can't access admin with phone/Google
- Access attempts logged
- "Access Denied" for non-admins
- Separate authentication flow

### Best Practices

1. **Never share admin credentials**
2. **Use strong passwords for admin accounts**
3. **Regularly review admin user list**
4. **Monitor admin activity logs**
5. **Use company emails for admin accounts**

## 🚀 Testing Both Systems

### Test Member Login

```bash
# 1. Start dev server
npm run dev

# 2. Go to member login
http://localhost:3002/login

# 3. Test phone login (requires Firebase Phone Auth enabled)
# OR
# 4. Test Google login (requires Google Auth enabled)
```

### Test Admin Login

```bash
# 1. Create admin account in Firebase (see ADMIN_SETUP.md)

# 2. Go to admin login
http://localhost:3002/admin/login

# 3. Enter admin email/password

# 4. Should redirect to /admin dashboard
```

## 📊 Role-Based Features

| Feature             | Member | Staff | Admin |
| ------------------- | ------ | ----- | ----- |
| View own membership | ✅     | ❌    | ✅    |
| QR code check-in    | ✅     | ❌    | ✅    |
| Scan QR codes       | ❌     | ✅    | ✅    |
| View all members    | ❌     | ❌    | ✅    |
| Send reminders      | ❌     | ❌    | ✅    |
| Export data         | ❌     | ❌    | ✅    |
| Manage payments     | ❌     | ❌    | ✅    |

## 🔧 Troubleshooting

### "Can't login as admin"

- Are you going to `/admin/login` (not `/login`)?
- Did you create the admin account in Firebase?
- Is the `role` field set to `"admin"` in Firestore?

### "Access Denied" after admin login

- Check Firestore user document
- Verify `role: "admin"` (lowercase, must be exact)
- Make sure UID matches in Auth and Firestore

### "Invalid email or password"

- Verify email is correct
- Password is case-sensitive
- Check Firebase Authentication → Users

### Member trying to access `/admin`

- This is expected behavior
- Members cannot access admin dashboard
- They'll see "Access Denied" message
- Direct them to `/login` instead

## 📞 Support

### For Members

- Contact: members@elitgym.com
- Help: Visit reception at any Elit Gym location
- Self-help: Password reset on login page

### For Admins

- Contact: IT support
- Documentation: `ADMIN_SETUP.md`
- Emergency: Contact system administrator

## 🎯 Next Steps

1. ✅ **Enable Google Authentication** (see `GOOGLE_AUTH_SETUP.md`)
2. ✅ **Enable Phone Authentication** (see `PHONE_AUTH_SETUP.md`)
3. ✅ **Create Admin Account** (see `ADMIN_SETUP.md`)
4. ✅ **Test both login systems**
5. ✅ **Configure Stripe** for payments
6. ✅ **Deploy to Vercel**

---

**You now have a professional, secure, separated login system for both members and administrators! 🎉**
