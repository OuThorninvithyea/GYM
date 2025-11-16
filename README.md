# Elit Gym - Elite Fitness Management System

A modern, full-stack gym membership and QR check-in system built for Elit Gym, Cambodia's premier gym chain with 20 locations nationwide.

## 🌟 Features

### For Members

- 📱 **Phone-based Authentication** - Secure OTP login via Firebase Phone Auth
- 🎫 **Personal QR Code** - Unique QR code for contactless check-in at all locations
- 💳 **Easy Renewals** - Renew membership in seconds with Stripe/ABA Pay
- 📊 **Dashboard** - Track membership status, expiry date, and days remaining
- 🔔 **Auto Reminders** - Receive SMS/Email alerts 7 and 1 day before expiry
- 📥 **Download QR** - Save QR code to phone for offline access

### For Staff

- 📷 **QR Scanner** - Quick member validation using phone/tablet camera
- ✅ **Instant Validation** - Real-time membership status verification
- 📍 **Multi-Location Support** - Works across all 20 Elit Gym locations
- 📝 **Entry Logging** - Automatic check-in tracking for analytics

### For Admins

- 👥 **Member Management** - View all members, filter by status
- 📈 **Analytics Dashboard** - Track membership stats and revenue
- 📤 **Export Data** - Export members and entries to CSV
- 🔔 **Bulk Reminders** - Send renewal reminders to expiring members
- 💰 **Payment Tracking** - Monitor all transactions and renewals

## 🛠️ Tech Stack

### Frontend

- **Next.js 16** (App Router) - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **html5-qrcode** - QR code scanning
- **qrcode.react** - QR code generation

### Backend

- **Next.js API Routes** - Serverless API
- **Firebase Auth** - Phone authentication
- **Firestore** - NoSQL database
- **Firebase Functions** - Serverless functions for cron jobs
- **Stripe** - Payment processing (placeholder for ABA Pay)

### Deployment

- **Vercel** - Frontend hosting
- **Firebase** - Backend services
- **PWA Ready** - Installable on mobile devices

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Stripe account (for payments)
- Twilio account (optional, for SMS)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd elit
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (Server-side)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account@your_project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key\n-----END PRIVATE KEY-----\n"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Twilio (Optional - for SMS)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Email (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** > **Phone** provider
3. Enable **Firestore Database**
4. Deploy Firestore rules:

```bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
```

5. Set up Firebase Functions:

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 5. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Set up a webhook endpoint:
   - URL: `https://your-domain.com/api/webhook/stripe`
   - Events: `checkout.session.completed`

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Deploy Firebase Functions

```bash
firebase deploy --only functions
```

## 📱 PWA Installation

The app is Progressive Web App (PWA) ready:

1. Visit the site on mobile
2. Tap "Add to Home Screen"
3. Use like a native app

## 🗂️ Project Structure

```
elit-gym-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── signup/
│   │   ├── user/
│   │   ├── validate-entry/
│   │   ├── create-checkout-session/
│   │   ├── webhook/
│   │   └── admin/
│   ├── dashboard/         # Member dashboard
│   ├── checkin/          # Staff QR scanner
│   ├── admin/            # Admin panel
│   ├── signup/           # Registration
│   ├── login/            # Authentication
│   ├── success/          # Payment success
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── Navbar.tsx
│   ├── QRGenerator.tsx
│   ├── QRScanner.tsx
│   ├── MembershipCard.tsx
│   ├── PricingCard.tsx
│   ├── StripeCheckout.tsx
│   └── ...
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase config
│   ├── firebase-admin.ts # Admin SDK
│   ├── auth-context.tsx  # Auth provider
│   ├── db.ts            # Database operations
│   ├── stripe.ts        # Stripe config
│   └── utils.ts         # Helper functions
├── functions/            # Firebase Functions
│   └── src/
│       └── index.ts     # Cron jobs & webhooks
├── public/              # Static assets
│   └── manifest.json    # PWA manifest
├── firebase.json        # Firebase config
├── firestore.rules      # Security rules
└── firestore.indexes.json # DB indexes
```

## 🔐 Security

- Phone authentication via Firebase
- Firestore security rules
- Environment variables for secrets
- HTTPS only in production
- Input validation on all forms
- XSS protection
- CSRF protection

## 📊 Database Schema

### Users Collection

```typescript
{
  uid: string;
  phone: string;
  name: string;
  email?: string;
  joinDate: Date;
  expiryDate: Date;
  membershipPlan: '1-month' | '6-month' | '12-month';
  qrId: string;
  stripeCustomerId?: string;
  isActive: boolean;
  role: 'member' | 'staff' | 'admin';
}
```

### Entries Collection

```typescript
{
  userId: string;
  userName: string;
  location: string;
  timestamp: Date;
  staffId?: string;
}
```

### Payments Collection

```typescript
{
  userId: string;
  userName: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  stripeId?: string;
  plan: string;
}
```

### Promos Collection

```typescript
{
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  createdAt: Date;
}
```

## 🎨 Customization

### Branding

- Colors: Edit CSS variables in `app/globals.css`
- Logo: Replace files in `public/`
- Fonts: Update in `app/layout.tsx`

### Pricing

- Edit `lib/stripe.ts` to modify plans and pricing

### Locations

- Update location list in `app/checkin/page.tsx`

## 🔧 ABA Pay Integration

To replace Stripe with ABA Pay (Cambodia's local payment):

1. Get ABA Pay API credentials from [docs.abapay.com.kh](https://docs.abapay.com.kh)
2. Replace Stripe imports in:
   - `lib/stripe.ts`
   - `components/StripeCheckout.tsx`
   - `app/api/create-checkout-session/route.ts`
   - `app/api/webhook/stripe/route.ts`
3. Update payment flow according to ABA Pay docs

## 📧 Email/SMS Configuration

### Email (Nodemailer)

- Gmail: Use App Password (not regular password)
- Other providers: Update SMTP settings in `.env.local`

### SMS (Twilio)

- Get credentials from [twilio.com](https://twilio.com)
- Verify phone numbers in development
- Add billing in production

## 🐛 Troubleshooting

### Firebase Auth Issues

- Verify reCAPTCHA is working
- Check phone number format (+855...)
- Enable Phone Auth in Firebase Console

### QR Scanner Not Working

- Grant camera permissions
- Use HTTPS in production
- Test on mobile device

### Stripe Webhooks

- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
- Verify webhook secret matches

## 📈 Analytics

Track key metrics:

- Total members
- Active members
- Expiring members (7 days)
- Monthly revenue
- Check-in frequency
- Popular locations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary and confidential.

## 👨‍💻 Support

For issues or questions:

- Email: support@elitgym.com.kh
- Phone: +855 XX XXX XXX

## 🎯 Roadmap

- [ ] iOS/Android native apps
- [ ] Biometric authentication
- [ ] Workout tracking
- [ ] Personal trainer booking
- [ ] Nutrition plans
- [ ] Social features
- [ ] Gamification/challenges
- [ ] Multi-language (Khmer/English toggle)

---

**Built with ❤️ for Elit Gym Cambodia**

© 2025 Elit Gym. All rights reserved.
