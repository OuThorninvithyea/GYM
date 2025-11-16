# Workout Statistics & Attendance Tracking Feature

## Overview

Your Elit Gym dashboard now displays comprehensive workout statistics and attendance tracking for each member!

## What's New? ✨

### 1. **Membership Timeline Dashboard**
Shows:
- **Member since date** (e.g., Aug 15, 2024)
- **Expiry date** (e.g., Aug 15, 2025)
- **Progress bar** showing percentage of membership used
- **Days as member** counter
- **Days remaining** in membership
- **Current plan** (1-month, 6-month, 12-month)

### 2. **Workout Statistics Cards**
Displays:
- **Total Check-ins**: Number of gym visits
- **Total Workout Time**: Combined time spent in gym (hours/minutes)
- **Average Session Duration**: Typical workout length
- **Visits per Week**: Average frequency
- **Favorite Location**: Most visited gym branch

### 3. **Recent Check-ins History**
Shows last 10 visits with:
- **Location** where they checked in
- **Date & Time** of check-in
- **Workout Duration** (how long they stayed)
- **Checkout Time** (when they left)

## Files Created/Updated

### New Files:
1. **`components/WorkoutStats.tsx`** - Main statistics component
2. **`app/api/user/entries/route.ts`** - API to fetch user's gym entries
3. **`EXAMPLE_USER_DATA.json`** - Sample data structure
4. **`ADD_EXAMPLE_DATA.md`** - Guide to add example data
5. **`WORKOUT_STATS_FEATURE.md`** - This file

### Updated Files:
1. **`lib/db.ts`**
   - Added `checkoutTime` and `duration` to `Entry` interface
   - Added `getUserEntries()` function
   - Updated `getRecentEntries()` to include checkout times

2. **`app/dashboard/page.tsx`**
   - Added `WorkoutStats` component
   - Fetches user entries from API
   - Displays comprehensive statistics

## How It Works

### Data Flow:
```
1. User logs into dashboard
   ↓
2. Dashboard fetches user data (name, plan, dates)
   ↓
3. Dashboard fetches user entries (check-ins)
   ↓
4. WorkoutStats component calculates statistics
   ↓
5. Display beautiful charts and history
```

### Entry Data Structure:
```typescript
{
  userId: "user-uid-here",
  userName: "Vithyeas",
  location: "Phnom Penh - Central",
  timestamp: Date,      // Check-in time
  checkoutTime: Date,   // Checkout time
  duration: 90,         // Duration in minutes
  staffId: "staff_001"
}
```

## Example Data

For user **vitihyeass@gmail.com**, example includes:
- **15 gym check-ins** over the past 2 weeks
- **1,320 minutes** total workout time (22 hours)
- **88 minutes** average session duration
- **12-month membership** starting Aug 15, 2024
- **272 days remaining** on membership

## What Members See

### Dashboard Sections:

1. **Membership Timeline**
   ```
   ┌────────────────────────────────────┐
   │  Membership Timeline               │
   │                                    │
   │  Aug 15, 2024 ━━━━━━━ Aug 15, 2025│
   │  [████████░░░░░░░░░░░░] 25.5%     │
   │                                    │
   │  [93 Days]  [272 Days] [12 Month] │
   │  As Member  Remaining   Plan       │
   └────────────────────────────────────┘
   ```

2. **Workout Statistics**
   ```
   ┌──────────┬──────────┬──────────┐
   │  📈 15   │  ⏱️ 22h  │  💪 88m  │
   │  Check-  │  Total   │  Average │
   │  ins     │  Time    │  Session │
   └──────────┴──────────┴──────────┘
   ```

3. **Recent Check-ins**
   ```
   ┌────────────────────────────────────┐
   │ 💪 PP Central  Nov 16, 6:30 AM     │
   │    → 105m workout                  │
   ├────────────────────────────────────┤
   │ 💪 PP Central  Nov 15, 5:00 PM     │
   │    → 105m workout                  │
   ├────────────────────────────────────┤
   │ 💪 PP Central  Nov 14, 6:15 AM     │
   │    → 75m workout                   │
   └────────────────────────────────────┘
   ```

## Setting Up Example Data

### Quick Setup (5 minutes):

1. **Create User Account**
   ```bash
   # Go to signup page
   http://localhost:3002/signup
   
   # Or add manually in Firebase Console
   ```

2. **Add Check-in Entries**
   - See `ADD_EXAMPLE_DATA.md` for detailed steps
   - Firestore → `entries` collection → Add documents
   - Copy example data from `EXAMPLE_USER_DATA.json`

3. **View Dashboard**
   ```bash
   # Login as the user
   http://localhost:3002/login
   
   # Dashboard shows all statistics!
   ```

### Automated Import (Advanced):

Use Firebase Admin SDK to batch import data from `EXAMPLE_USER_DATA.json`:

```javascript
// Import script (create if needed)
import admin from 'firebase-admin';
import data from './EXAMPLE_USER_DATA.json';

// Initialize Firebase Admin
// ... 

// Import entries
data.entries.forEach(async (entry) => {
  await admin.firestore().collection('entries').add(entry);
});
```

## Testing the Feature

### Test Checklist:

- [ ] Login as vitihyeass@gmail.com
- [ ] Dashboard loads membership timeline
- [ ] Shows "93 Days as Member"
- [ ] Shows "272 Days Remaining"
- [ ] Progress bar displays (green/gold)
- [ ] Statistics cards show:
  - [ ] Total check-ins (15)
  - [ ] Total workout time (22h)
  - [ ] Average session (88m)
- [ ] Recent check-ins list appears
- [ ] Each entry shows location, date, duration
- [ ] Favorite location displays correctly
- [ ] Responsive on mobile devices

## Benefits for Members

1. **Track Progress**
   - See how often they visit
   - Monitor workout consistency
   - Celebrate milestones

2. **Stay Motivated**
   - Visualize their commitment
   - Compare weekly averages
   - Set personal goals

3. **Manage Membership**
   - Know exactly when renewal is due
   - See days remaining at a glance
   - Plan ahead for renewal

## Benefits for Gym

1. **Member Engagement**
   - Data-driven insights
   - Identify inactive members
   - Send targeted reminders

2. **Analytics**
   - Track busiest locations
   - Monitor peak hours
   - Plan staffing accordingly

3. **Retention**
   - Show value of membership
   - Encourage regular visits
   - Build habit formation

## Next Enhancements (Future)

### Could Add:
- **Monthly Reports**: Email summary of workouts
- **Goal Setting**: Set target visits per week
- **Achievements**: Badges for milestones
- **Workout Streaks**: Consecutive days tracking
- **Social Features**: Compare with friends
- **Heat Map**: Busiest times/days visualization
- **Calorie Estimates**: Based on duration
- **Personal Records**: Longest/shortest sessions

## API Endpoints

### Get User Entries:
```
GET /api/user/entries?userId={userId}

Response:
{
  entries: [
    {
      id: "entry123",
      userId: "user456",
      userName: "Vithyeas",
      location: "Phnom Penh - Central",
      timestamp: "2024-11-16T06:30:00Z",
      checkoutTime: "2024-11-16T08:15:00Z",
      duration: 105,
      staffId: "staff_001"
    },
    ...
  ],
  success: true
}
```

## Database Schema

### Firestore Collections:

**users** collection:
```
{
  uid: string
  name: string
  email: string
  phone: string
  joinDate: timestamp    ← Used for "Days as Member"
  expiryDate: timestamp  ← Used for "Days Remaining"
  membershipPlan: string ← Used for "Plan Duration"
  ...
}
```

**entries** collection:
```
{
  userId: string
  userName: string
  location: string
  timestamp: timestamp      ← Check-in time
  checkoutTime: timestamp   ← NEW! Checkout time
  duration: number          ← NEW! Minutes in gym
  staffId: string
}
```

## Troubleshooting

### No statistics showing
- Check if entries exist in Firestore
- Verify `userId` matches user's UID
- Check browser console for errors

### Wrong durations
- Verify `duration` field is in minutes
- Check `checkoutTime` is after `timestamp`
- Ensure data types are correct

### Timeline incorrect
- Check `joinDate` and `expiryDate` timestamps
- Verify dates are in correct format
- Ensure timezone handling is correct

## Documentation References

- **Setup Guide**: `ADD_EXAMPLE_DATA.md`
- **Example Data**: `EXAMPLE_USER_DATA.json`
- **Component Code**: `components/WorkoutStats.tsx`
- **API Route**: `app/api/user/entries/route.ts`

---

**Your members can now see their complete fitness journey! 🎉💪**

Track → Analyze → Improve → Succeed

