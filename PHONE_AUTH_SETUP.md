# Phone Authentication Setup Guide

## 🔥 Firebase Console Steps

### 1. Enable Phone Authentication

**Go to Firebase Console:**
https://console.firebase.google.com/project/elite-gym-518f4/authentication/providers

**Steps:**

1. Click on **"Phone"** in the provider list
2. Toggle the switch to **ENABLE**
3. Click **"Save"**

### 2. Verify Your Domain (Important!)

Still in Authentication settings:

1. Go to **Settings** tab (top of page)
2. Click **"Authorized domains"**
3. Make sure these domains are listed:
   - `localhost`
   - `elite-gym-518f4.firebaseapp.com`
   - `elite-gym-518f4.web.app`

If `localhost` is not there:

- Click **"Add domain"**
- Enter: `localhost`
- Click **"Add"**

### 3. Add Test Phone Numbers (For Development)

In Authentication → Sign-in method:

1. Scroll to **"Phone numbers for testing"**
2. Click **"Add phone number"**
3. Add:
   - Phone: `+855123456789` (no spaces)
   - Code: `123456`
4. Click **"Add"**
5. Click **"Save"**

### 4. Wait 2-3 Minutes

Firebase needs time to propagate the settings.

### 5. Restart Your Dev Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

### 6. Test Login

Go to: http://localhost:3002/login

Enter: `+855123456789`
Code: `123456`

---

## ✅ Checklist

- [ ] Phone provider is ENABLED (green toggle)
- [ ] localhost is in authorized domains
- [ ] Test phone number added
- [ ] Waited 2-3 minutes
- [ ] Restarted dev server
- [ ] Cleared browser cache

---

## 🐛 Still Not Working?

### Error: "configuration-not-found"

→ Phone auth is not enabled. Double-check step 1.

### Error: "reCAPTCHA verification failed"

→ Clear browser cache or use incognito mode.

### Error: "Invalid phone number"

→ Use format: +855XXXXXXXXX (country code required)

---

## 📸 Visual Guide

**What "ENABLED" Should Look Like:**

Phone provider row should have:

- Green toggle switch (on the right)
- Status: "Enabled"

If you see a gray toggle or "Disabled", click it to enable.
