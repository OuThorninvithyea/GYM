# Quick Guide: Add Firebase Admin Credentials

## You downloaded a JSON file from Firebase. Now let's add it to your app!

### The JSON file looks like this:

```json
{
  "type": "service_account",
  "project_id": "elite-gym-518f4",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@elite-gym-518f4.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  ...
}
```

### Extract these 3 values:

1. **project_id** → Copy this value
2. **client_email** → Copy this value
3. **private_key** → Copy this value (keep the quotes and \n characters!)

### Add to your .env.local file:

Open `.env.local` and add these lines at the bottom:

```env
# Firebase Admin SDK (add these new lines)
FIREBASE_PROJECT_ID=elite-gym-518f4
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@elite-gym-518f4.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here...\n-----END PRIVATE KEY-----\n"
```

**IMPORTANT**: Keep the quotes around FIREBASE_PRIVATE_KEY!

---

## Example:

If your JSON has:

```json
{
  "project_id": "elite-gym-518f4",
  "client_email": "firebase-adminsdk-abc123@elite-gym-518f4.iam.gserviceaccount.com",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
}
```

Add to `.env.local`:

```env
FIREBASE_PROJECT_ID=elite-gym-518f4
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@elite-gym-518f4.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n"
```

---

## After adding, tell me and I'll create the admin account automatically!
