# Elit Gym - Quick Setup Guide

Follow these steps to get your Elit Gym system up and running quickly.

## ⚡ Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or select existing)
3. Enable these services:

   - ✅ Authentication > Phone
   - ✅ Firestore Database
   - ✅ Functions
   - ✅ Storage (optional)

4. Get your config:
   - Project Settings > General > Your apps > Web app
   - Copy the config object

### Step 3: Environment Variables

Create `.env.local` file (copy from example below):

```env
# Copy from Firebase config
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Get from Firebase > Project Settings > Service Accounts > Generate new private key
FIREBASE_ADMIN_PROJECT_ID=your-project
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"

# Get from Stripe Dashboard
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Deploy Firestore Rules

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize (if not already)
firebase init

# Deploy rules
firebase deploy --only firestore:rules,firestore:indexes
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📱 Testing the App

### 1. Create Test Member

1. Go to `/signup`
2. Enter test phone number (use real number in dev)
3. Complete payment (use Stripe test cards)
4. Test card: `4242 4242 4242 4242`, any future date, any CVC

### 2. Test QR Check-In

1. As member: Go to `/dashboard` and see QR code
2. As staff: Go to `/checkin` and scan the QR code
3. Should see "Entry Granted" ✅

### 3. Test Admin Panel

1. Go to `/admin`
2. View all members
3. Export data
4. Send reminders

---

## 🔐 Stripe Test Cards

| Card Number         | Brand      | CVC          | Date            |
| ------------------- | ---------- | ------------ | --------------- |
| 4242 4242 4242 4242 | Visa       | Any 3 digits | Any future date |
| 5555 5555 5555 4444 | Mastercard | Any 3 digits | Any future date |
| 378282246310005     | Amex       | Any 4 digits | Any future date |

---

## 🚀 Production Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

Or via CLI:

```bash
npm i -g vercel
vercel login
vercel
```

### Firebase Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### Domain Setup

1. Add custom domain in Vercel
2. Update `NEXT_PUBLIC_APP_URL` in env
3. Update Stripe webhook URL

---

## 🎨 Customization Quick Wins

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --gold: #d4af37; /* Your brand color */
  --black: #000000; /* Background */
}
```

### Update Logo

Replace files in `public/`:

- `elit-logo.png` (for QR code)
- `icon-192.png` (PWA icon)
- `icon-512.png` (PWA icon)

### Change Pricing

Edit `lib/stripe.ts`:

```typescript
export const PRICING = {
  "1-month": {
    amount: 3000, // $30 in cents
    // ...
  },
  // Add or modify plans
};
```

---

## 🐛 Common Issues

### "Firebase Auth Error"

- ✅ Enable Phone Auth in Firebase Console
- ✅ Check reCAPTCHA settings
- ✅ Use real phone number (not 555-...)

### "Camera Not Working"

- ✅ Use HTTPS in production
- ✅ Grant camera permissions
- ✅ Test on mobile device

### "Stripe Webhook Failing"

- ✅ Use Stripe CLI for local testing:
  ```bash
  stripe listen --forward-to localhost:3000/api/webhook/stripe
  ```
- ✅ Copy webhook signing secret to `.env.local`

### "Database Permission Denied"

- ✅ Deploy Firestore rules: `firebase deploy --only firestore:rules`
- ✅ Check user is authenticated

---

## 📞 Need Help?

Check the main README.md for detailed documentation.

**Happy building! 🎉**
