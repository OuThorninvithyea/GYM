# Environment Variables Setup Guide

Your `.env.local` file has been created with all required environment variables!

## ✅ What's Already Done

The following are **already filled in** for you:

### Firebase Admin SDK:

- ✅ `FIREBASE_ADMIN_PROJECT_ID`
- ✅ `FIREBASE_ADMIN_CLIENT_EMAIL`
- ✅ `FIREBASE_ADMIN_PRIVATE_KEY`

### Firebase Client (Partial):

- ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`

### App Configuration:

- ✅ `NEXT_PUBLIC_APP_URL` (set to localhost for local dev)

---

## ⚠️ What You Need to Fill In

Open your `.env.local` file and replace these placeholders:

### 1. Firebase Client Configuration

Go to: **Firebase Console → Project Settings → General → Your apps**

Find the Firebase config object and copy these values:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...", // ← Copy this
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "123456", // ← Copy this
  appId: "1:123456:web:abc123", // ← Copy this
};
```

Replace in your `.env.local`:

- `NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here`
  → Replace with your actual API key

- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here`
  → Replace with your actual sender ID

- `NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here`
  → Replace with your actual app ID

---

### 2. Stripe Configuration

Go to: **Stripe Dashboard → Developers → API keys**

**Get your keys:**

- **Publishable key** (starts with `pk_test_` for test mode)
  → Replace `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here`

- **Secret key** (starts with `sk_test_` for test mode, click "Reveal")
  → Replace `STRIPE_SECRET_KEY=sk_test_your_secret_key_here`

**Get webhook secret:**

- Go to: **Stripe Dashboard → Developers → Webhooks**
- Create a webhook endpoint (if you haven't) pointing to: `http://localhost:3000/api/webhook/stripe` (for local dev)
- Copy the **Signing secret** (starts with `whsec_`)
  → Replace `STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here`

---

### 3. Optional: Email & Twilio

If you want to use email notifications or SMS:

**Email (Gmail example):**

- Use Gmail SMTP or any email service
- Generate an App Password if using Gmail
- Update: `EMAIL_USER` and `EMAIL_PASSWORD`

**Twilio (for SMS):**

- Go to Twilio Console
- Get your Account SID, Auth Token, and Phone Number
- Update the Twilio variables

---

## 🚀 After Filling In the Values

### For Local Development:

1. Make sure all required values are filled in
2. Run: `npm run dev`
3. App should start at `http://localhost:3000`
4. Test the complete flow:
   - Signup
   - Payment
   - Dashboard with QR code

### For Vercel Deployment:

You need to add **the same variables** to Vercel:

1. Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

2. Add ALL these variables (one by one):

   - All `NEXT_PUBLIC_*` variables
   - All `FIREBASE_ADMIN_*` variables
   - All `STRIPE_*` variables
   - Update `NEXT_PUBLIC_APP_URL` to your Vercel URL

3. **Important:** For `NEXT_PUBLIC_APP_URL` in Vercel, use:

   ```
   https://elitegym-sigma.vercel.app
   ```

4. After adding all variables, click **Redeploy**

---

## 📋 Quick Checklist

### Minimum Required (For app to work):

**Local Development:**

- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY` ← **MUST FILL**
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` ← **MUST FILL**
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID` ← **MUST FILL**
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` ← **MUST FILL**
- [ ] `STRIPE_SECRET_KEY` ← **MUST FILL**
- [ ] `STRIPE_WEBHOOK_SECRET` ← **MUST FILL**
- [x] Firebase Admin variables (already done!)

**Vercel Deployment:**

- [ ] Add ALL variables from above to Vercel
- [ ] Update `NEXT_PUBLIC_APP_URL` to production URL
- [ ] Redeploy after adding variables

---

## 🔍 How to Get Your Firebase Keys

### Step-by-Step:

1. Go to: https://console.firebase.google.com/
2. Select your **elite-gym-518f4** project
3. Click the ⚙️ **gear icon** → **Project settings**
4. Scroll down to **Your apps** section
5. If you don't see a web app:
   - Click **Add app** → Select **Web** (</>) icon
   - Register your app
6. You'll see the Firebase config code:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "elite-gym-518f4.firebaseapp.com",
     projectId: "elite-gym-518f4",
     storageBucket: "elite-gym-518f4.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123def456",
   };
   ```
7. Copy the `apiKey`, `messagingSenderId`, and `appId` values
8. Paste them into your `.env.local` file

---

## 🔍 How to Get Your Stripe Keys

### Step-by-Step:

1. Go to: https://dashboard.stripe.com/
2. Make sure you're in **Test mode** (toggle in top right)
3. Go to: **Developers** → **API keys**
4. Copy:
   - **Publishable key** (visible by default)
   - **Secret key** (click "Reveal test key")
5. For webhook secret:
   - Go to: **Developers** → **Webhooks**
   - Click **Add endpoint**
   - Endpoint URL: `http://localhost:3000/api/webhook/stripe` (for local)
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Click **Add endpoint**
   - Copy the **Signing secret** (whsec\_...)

---

## ✅ Test Your Setup

### Local Test:

```bash
npm run dev
```

Then test:

1. Visit `http://localhost:3000`
2. Try to sign up
3. Try to make a payment (use test card: `4242 4242 4242 4242`)

### Vercel Test:

1. Add all variables to Vercel
2. Redeploy
3. Visit your Vercel URL
4. Test the same flow

---

## 🆘 Troubleshooting

**"Firebase: Error (auth/invalid-api-key)"**
→ Your `NEXT_PUBLIC_FIREBASE_API_KEY` is wrong or missing

**"Stripe error: Invalid API Key"**
→ Your `STRIPE_SECRET_KEY` is wrong or missing

**"Build fails on Vercel"**
→ Firebase Admin credentials are missing in Vercel environment variables

**"404 on /checkout page"**
→ Build failed, check Vercel logs and make sure all env vars are set

---

## 📞 Need Help?

Check these files in your repo:

- `VERCEL_ENV_SETUP.md` - Vercel-specific setup
- `FIREBASE_ADMIN_SETUP.md` - Firebase Admin setup
- `SETUP_GUIDE.md` - General setup guide

Good luck! 🚀
