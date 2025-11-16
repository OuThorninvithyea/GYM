# Firebase Admin SDK Setup for Vercel

This guide will help you set up Firebase Admin credentials in Vercel to fix the build error.

## 🔴 Error You're Seeing

```
Firebase admin initialization error Error: Service account object must contain a string "private_key" property.
```

This means the Firebase Admin environment variables are missing or incorrectly formatted in Vercel.

---

## 📝 Step-by-Step Setup

### Step 1: Download Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **GYM** project
3. Click the **⚙️ (Settings) icon** → **Project Settings**
4. Navigate to the **Service Accounts** tab
5. Click the **"Generate new private key"** button
6. In the popup, click **"Generate key"**
7. A JSON file will download (e.g., `your-project-firebase-adminsdk-xxxxx.json`)

### Step 2: Open the Downloaded JSON File

Open the file in a text editor. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAAS...(very long)...==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

### Step 3: Extract These 3 Values

You need to copy these **3 specific values**:

1. **`project_id`** - Example: `gym-app-12345`
2. **`client_email`** - Example: `firebase-adminsdk-xxxxx@gym-app-12345.iam.gserviceaccount.com`
3. **`private_key`** - The entire value including `-----BEGIN PRIVATE KEY-----` through `-----END PRIVATE KEY-----\n`

---

## 🚀 Add to Vercel

### Go to Vercel Environment Variables

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your **GYM** project
3. Go to **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Add These 3 Environment Variables

#### Variable 1: FIREBASE_ADMIN_PROJECT_ID

- **Name:** `FIREBASE_ADMIN_PROJECT_ID`
- **Value:** Copy the `project_id` from your JSON file
- **Example:** `gym-app-12345`
- **Environment:** Check ✅ Production, Preview, Development
- Click **Save**

#### Variable 2: FIREBASE_ADMIN_CLIENT_EMAIL

- **Name:** `FIREBASE_ADMIN_CLIENT_EMAIL`
- **Value:** Copy the `client_email` from your JSON file
- **Example:** `firebase-adminsdk-abc12@gym-app-12345.iam.gserviceaccount.com`
- **Environment:** Check ✅ Production, Preview, Development
- Click **Save**

#### Variable 3: FIREBASE_ADMIN_PRIVATE_KEY

⚠️ **MOST IMPORTANT - Follow Carefully!**

- **Name:** `FIREBASE_ADMIN_PRIVATE_KEY`
- **Value:** Copy the ENTIRE `private_key` value from JSON

**How to copy it correctly:**

1. In your JSON file, find the `"private_key"` field
2. Copy **everything** between the quotes, including the `\n` characters
3. It should look like this:

```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCB...\n-----END PRIVATE KEY-----\n
```

**Important Notes:**
- ✅ Keep the `\n` as literal characters (don't replace them with actual line breaks)
- ✅ Include `-----BEGIN PRIVATE KEY-----` at the start
- ✅ Include `-----END PRIVATE KEY-----` at the end
- ✅ The `\n` after `-----BEGIN PRIVATE KEY-----` should be literal characters
- ✅ Don't add extra spaces or line breaks

**Example of correct format:**
```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7qil0Fq41zgyr\nP8m4O88oA5OooaV+5qFzJEeD8NH6W0pUojQHNfjnWv/AxJ2KQFD3gddTgGXSKjHI\n...(more lines)...\nYNFHlqWTHnVdrIBQmu4yH7YfhsEQTkBCd3Qz7WBXCQm/r6qBMmX8cz+ccDv8E9pw\n-----END PRIVATE KEY-----\n
```

- **Environment:** Check ✅ Production, Preview, Development
- Click **Save**

---

## ✅ After Adding All Variables

### Verify You Have These Set:

1. ✅ `FIREBASE_ADMIN_PROJECT_ID`
2. ✅ `FIREBASE_ADMIN_CLIENT_EMAIL`
3. ✅ `FIREBASE_ADMIN_PRIVATE_KEY`

Plus your existing variables:
- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- ✅ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_APP_ID`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `STRIPE_WEBHOOK_SECRET`
- ✅ `NEXT_PUBLIC_APP_URL`

### Redeploy

1. Go to **Deployments** tab
2. Click **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Your build should now succeed! 🎉

---

## 🔍 Troubleshooting

### Build still fails?

Check these common issues:

1. **Private key has extra quotes:** Make sure you didn't accidentally add extra quotes around the key
2. **Missing `\n` characters:** The `\n` should be literal text, not actual line breaks
3. **Copy/paste error:** Try copying the private_key value again, making sure to get it all
4. **Spaces:** Don't add spaces before or after the key value

### Check Vercel Logs

After redeploying, check the build logs:
- Look for: `"Firebase Admin initialized successfully"` ✅
- If you see: `"Missing Firebase Admin credentials"` ❌ - check which variable is missing

---

## 📱 For Local Development

Add these to your `.env.local` file:

```bash
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
```

**Note:** For local `.env.local`, you should wrap the private key in double quotes.

---

## ✅ Success!

Once set up correctly:
- ✅ Build will complete successfully
- ✅ All API routes will work
- ✅ Payment processing will function
- ✅ QR code validation will work
- ✅ Admin features will be accessible

Need help? Check the Vercel logs for specific error messages.

