# Google Authentication Setup Guide

Follow these steps to enable Google Sign-In for your Elit Gym app.

## Step 1: Enable Google Authentication in Firebase Console

1. **Go to Firebase Console**

   - Visit: https://console.firebase.google.com
   - Select your project: **elit-9ab85**

2. **Navigate to Authentication**

   - Click on **"Authentication"** in the left sidebar
   - Click on the **"Sign-in method"** tab at the top

3. **Enable Google Provider**

   - Find **"Google"** in the list of sign-in providers
   - Click on **"Google"**
   - Toggle the **"Enable"** switch to ON
   - You'll see two fields:
     - **Project public-facing name**: Enter "Elit Gym"
     - **Project support email**: Select your email from the dropdown
   - Click **"Save"**

4. **Verify Setup**
   - Google should now show as **"Enabled"** in your sign-in methods list
   - You should see it alongside "Phone" (if you've already enabled that)

## Step 2: Test Google Sign-In

1. **Start your development server** (if not already running):

   ```bash
   npm run dev
   ```

2. **Test on Login Page**

   - Go to: http://localhost:3002/login
   - You should see a "Sign in with Google" button
   - Click it and sign in with any Google account
   - You should be redirected to /dashboard

3. **Test on Signup Page**
   - Go to: http://localhost:3002/signup
   - You should see a "Continue with Google" button at the top
   - Click it to auto-fill your name and email from Google
   - Complete the phone number field
   - Continue to plan selection

## What Happens When Users Sign In with Google?

### On Login Page:

- User clicks "Sign in with Google"
- Google popup appears for account selection
- User authenticates with Google
- They're immediately redirected to /dashboard
- Their Google account info is stored in Firebase Auth

### On Signup Page:

- User clicks "Continue with Google"
- Google popup appears for account selection
- Name and email are auto-filled from Google profile
- User still needs to:
  - Add their phone number (required)
  - Select a membership plan
  - Complete payment

## Troubleshooting

### Error: "This app is not authorized to use Firebase Authentication"

- Make sure you clicked "Save" after enabling Google sign-in
- Wait a few minutes for changes to propagate
- Clear your browser cache and try again

### Error: "Popup closed by user"

- This is normal if the user closes the Google popup
- Just try clicking the button again

### Error: "auth/popup-blocked"

- Browser is blocking popups
- Allow popups for localhost in your browser settings
- Or try a different browser

### Google button doesn't appear

- Make sure your dev server is running
- Check browser console for errors (F12)
- Verify `.env.local` has all Firebase config variables

## Additional Features

### Auto-filling User Data

When users sign in with Google, the app automatically:

- Extracts their display name
- Extracts their email address
- Extracts their profile photo URL (if you want to use it later)

### Detecting Sign-In Method

You can check how a user signed in using:

```javascript
const user = auth.currentUser;
const signInMethod = user?.providerData[0]?.providerId;
// Returns: 'phone' or 'google.com'
```

## Security Notes

1. **Phone Number Requirement**

   - Even with Google sign-in, we still require a phone number
   - This ensures all members can receive SMS notifications
   - Phone numbers are collected during signup flow

2. **Email Verification**

   - Google accounts are already verified by Google
   - No additional email verification needed

3. **Multiple Sign-In Methods**
   - Users can link both phone and Google to the same account
   - Firebase automatically handles this if they use the same email

## Next Steps

After setting up Google Authentication:

1. ✅ **Enable Phone Authentication** (if not already done)

   - See PHONE_AUTH_SETUP.md

2. ✅ **Create Firestore Database** (if not already done)

   - See PHONE_AUTH_SETUP.md

3. ✅ **Test Complete User Flow**

   - Sign up with Google → Select plan → Complete payment
   - Sign in with Google → View dashboard
   - Sign up with phone → OTP verification → Select plan
   - Sign in with phone → OTP verification → Dashboard

4. 🔄 **Configure Stripe** (for payments)
   - See SETUP_GUIDE.md

## Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify all Firebase config in `.env.local`
3. Ensure Google sign-in is enabled in Firebase Console
4. Try with a different Google account
5. Clear browser cache and cookies

---

**That's it! Google Sign-In is now ready to use! 🎉**
