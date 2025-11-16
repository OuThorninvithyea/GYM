# Vercel Environment Variables Setup

This document lists all the environment variables needed to deploy your GYM app on Vercel.

## Quick Steps

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your GYM project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable below with your actual values
5. Redeploy your app after adding all variables

---

## Required Environment Variables

### Firebase Client Configuration (Public)
These are safe to expose in the browser:

- **NEXT_PUBLIC_FIREBASE_API_KEY**
  - Your Firebase Web API Key
  - Found in: Firebase Console → Project Settings → General

- **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**
  - Format: `your-project-id.firebaseapp.com`
  - Found in: Firebase Console → Project Settings → General

- **NEXT_PUBLIC_FIREBASE_PROJECT_ID**
  - Your Firebase project ID
  - Found in: Firebase Console → Project Settings → General

- **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**
  - Format: `your-project-id.appspot.com`
  - Found in: Firebase Console → Project Settings → General

- **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**
  - Your messaging sender ID
  - Found in: Firebase Console → Project Settings → General

- **NEXT_PUBLIC_FIREBASE_APP_ID**
  - Your Firebase app ID
  - Found in: Firebase Console → Project Settings → General

---

### Firebase Admin SDK (Server-side - KEEP SECRET!)
These must be kept secret:

- **FIREBASE_ADMIN_PROJECT_ID**
  - Your Firebase project ID (same as above)

- **FIREBASE_ADMIN_CLIENT_EMAIL**
  - Format: `firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com`
  - Found in: Firebase Console → Project Settings → Service Accounts → Generate new private key (JSON file)

- **FIREBASE_ADMIN_PRIVATE_KEY**
  - The private key from your service account JSON
  - **Important:** In Vercel, paste the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
  - The key should include `\n` characters for line breaks
  - Found in: Firebase Console → Project Settings → Service Accounts → Generate new private key (JSON file)

---

### Stripe Configuration
Get these from your Stripe Dashboard:

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
  - Your Stripe publishable key (starts with `pk_`)
  - Found in: Stripe Dashboard → Developers → API keys

- **STRIPE_SECRET_KEY**
  - Your Stripe secret key (starts with `sk_`)
  - **KEEP SECRET!** This must never be exposed to the client
  - Found in: Stripe Dashboard → Developers → API keys

- **STRIPE_WEBHOOK_SECRET**
  - Your Stripe webhook signing secret (starts with `whsec_`)
  - Found in: Stripe Dashboard → Developers → Webhooks → Select your webhook endpoint
  - **Note:** You'll need to create a webhook endpoint in Stripe pointing to: `https://your-vercel-domain.vercel.app/api/webhook/stripe`

---

### Application URL

- **NEXT_PUBLIC_APP_URL**
  - Your production URL
  - Format: `https://your-project-name.vercel.app` (or your custom domain)
  - This is used for Stripe redirects and email links

---

## Example .env.local for Local Development

Create a `.env.local` file in your project root with these variables for local development:

```bash
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Troubleshooting

### Build Fails with "auth/invalid-api-key"
- This means Firebase environment variables are missing or incorrect in Vercel
- Double-check all NEXT_PUBLIC_FIREBASE_* variables are set correctly

### Stripe Webhooks Not Working
- Make sure STRIPE_WEBHOOK_SECRET is set in Vercel
- Verify your webhook endpoint in Stripe Dashboard points to your deployed URL
- Check webhook signing secret matches

### "NEXT_PUBLIC_APP_URL is undefined"
- This variable is required for Stripe redirects to work
- Set it to your full Vercel deployment URL (e.g., `https://gym-app.vercel.app`)

---

## After Adding Environment Variables

Once you've added all environment variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on **Deployments**
3. Click the **...** menu on the latest deployment
4. Select **Redeploy**
5. Check "Use existing Build Cache" should be unchecked for first deploy
6. Click **Redeploy**

Your deployment should now succeed! 🚀

