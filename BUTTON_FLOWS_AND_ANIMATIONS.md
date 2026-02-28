# PlacePrep Starter - Button Flows & Frontend Integration Guide

## 1. ROADMAP GENERATOR FLOW

### Screen: Roadmap Input Form
```
┌─────────────────────────────────────────┐
│  Generate Your 4-Year Placement Roadmap │
├─────────────────────────────────────────┤
│                                         │
│  Branch Selection:                      │
│  [CSE ▼] [IT ▼] [ECE ▼]               │
│                                         │
│  Your Interests (select multiple):      │
│  ☐ AI & Machine Learning               │
│  ☐ Web Development                      │
│  ☐ Core/Systems Programming             │
│  ☐ Government Jobs                      │
│  ☐ Startup Culture                      │
│                                         │
│  Target Company Type:                   │
│  ◉ Product  ◯ Service  ◯ Startup  ◯ Govt │
│                                         │
│  [Generate Roadmap]  [Cancel]           │
└─────────────────────────────────────────┘

API CALLS:
- [Generate Roadmap Button]
  POST /api/roadmaps/generate/
  Body: {
    "branch": "CSE",
    "interests": ["AI", "Web Development"],
    "target_company_type": "Product"
  }
  Response: 201 Created with roadmap_data
  UI: Show loading spinner → Navigate to roadmap timeline view

- [Cancel Button]
  → Go back to dashboard (no API call)
```

### Screen: Roadmap Timeline Animation
```
┌──────────────────────────────────────────────────┐
│  Your 4-Year Placement Roadmap                   │
├──────────────────────────────────────────────────┤
│                                                  │
│     Sem 1         Sem 2        ...      Sem 8   │
│      ●─────────────●─────────────●─────────●   │
│      │             │             │         │   │
│   Python          Web         Intern    Placement│
│   Git             Full-Stack   LeetCode  Season  │
│   DSA             Projects     Grind            │
│                                                  │
│  [View Details] [Edit Roadmap] [Back]           │
└──────────────────────────────────────────────────┘

API CALLS:
- On page load:
  GET /api/roadmaps/{id}/get_animation_data/
  Response: Array of 8 semesters with skills/projects/timeline
  UI: Animate line drawing from Sem 1 to Sem 8 over 2-3 seconds

- [View Details for Semester]
  Click on semester node
  UI: Expand node → Show full skills list, projects, milestones

- [Edit Roadmap Button]
  Modal confirmation: "Generate a new roadmap?"
  → POST /api/roadmaps/generate/ (overwrites existing)

- [Back Button]
  → Navigate to /dashboard
```

---

## 2. HABIT CREATION & MANAGEMENT FLOW

### Screen: Create New Habit
```
┌─────────────────────────────────────────────┐
│  Create a New Habit Goal                    │
├─────────────────────────────────────────────┤
│                                             │
│  Habit Name:                                │
│  [____________________________]  Max 100 ch │
│  (e.g., "30-min daily coding")              │
│                                             │
│  Frequency:                                 │
│  [Daily ▼]  [Weekly ▼]  [Monthly ▼]       │
│                                             │
│  Target:                                    │
│  [30      ] [minutes ▼]                     │
│  OR [1    ] [tests ▼]                       │
│                                             │
│  Description (optional):                    │
│  [______________________________]            │
│  (e.g., "LeetCode medium problems")        │
│                                             │
│  [Create Habit]  [Cancel]                  │
└─────────────────────────────────────────────┘

API CALLS:
- [Create Habit Button]
  POST /api/habits/
  Body: {
    "habit_name": "30-min daily coding",
    "habit_type": "daily",
    "target_count": 30,
    "unit": "minutes",
    "description": "LeetCode grind"
  }
  Response: 201 Created
  UI: Toast "Habit created! Start tracking today."
      → Add to habits list
      → Navigate to /habits

- [Cancel Button]
  → Go back without saving
```

### Screen: Daily Habits Dashboard
```
┌────────────────────────────────────────────┐
│  Your Habits - February 28, 2025            │
├────────────────────────────────────────────┤
│                                            │
│  Today's Progress:                         │
│  ━━━━━━━━━  4 of 5 completed              │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ 30-min Coding                       │  │
│  │ Streak: 5 days 🔥                  │  │
│  │ [✓ Mark Complete] [Mark Incomplete] │  │
│  │ [Edit] [Delete] [View Stats]        │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ Weekly Mock Test                    │  │
│  │ Streak: 2 weeks 💪                 │  │
│  │ [✓ Mark Complete] [Mark Incomplete] │  │
│  │ [Edit] [Delete] [View Stats]        │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  [+ Add New Habit]                       │
│                                            │
│  [Dashboard] [Progress] [Peers] [Settings]│
└────────────────────────────────────────────┘

API CALLS:
- On page load:
  GET /api/habits/
  Response: List of active habits with streak_count, last_completed

- [Mark Complete Button]
  POST /api/habits/{id}/mark_complete/
  Body: {
    "completed_date": "2025-02-28",
    "notes": "Solved 3 medium problems"
  }
  Response: 200 OK {
    "habit": {...},
    "streak_updated": true,
    "new_streak": 6,
    "message": "Keep it up! 6 day streak 🔥"
  }
  UI: Update streak display → Show toast with message
      Disable button if already completed today

- [Mark Incomplete Button]
  POST /api/habits/{id}/mark_incomplete/
  Response: 200 OK {
    "streak_updated": false,
    "streak_broken": true,
    "message": "Streak broken, but no worries—restart tomorrow!"
  }
  UI: Reset streak to 0 → Show encouraging toast

- [Edit Button]
  → Navigate to /habits/{id}/edit
  → PATCH /api/habits/{id}/ with updated values
  → Return to habits list

- [Delete Button]
  → Show confirmation modal: "Are you sure? This habit will be deleted."
  → If confirmed: DELETE /api/habits/{id}/
  → Remove from list, show toast "Habit deleted"

- [View Stats Button]
  → Navigate to /habits/{id}/stats
  → GET /api/habits/{id}/get_stats/
  → Show chart: completion_rate over last 30 days, streak history

- [+ Add New Habit Button]
  → Navigate to /habits/create
  → Show form (same as Create New Habit screen)
```

---

## 3. PROGRESS TRACKING FLOW

### Screen: Weekly Progress Summary
```
┌────────────────────────────────────────────┐
│  Your Weekly Progress                       │
├────────────────────────────────────────────┤
│                                            │
│  Week of Feb 24 - Mar 2                    │
│                                            │
│  Completion Rate: 65% (13/20 days)         │
│                                            │
│  Daily Breakdown:                          │
│  Mon 24 ✓  Tue 25 ✓  Wed 26 ✓              │
│  Thu 27 ✗  Fri 28 ✓  Sat 01 ✓  Sun 02 ✗  │
│                                            │
│  Best Habit: 30-min coding (5 completions)│
│  Weakest: Weekly mock test (1 completion) │
│                                            │
│  [Get Last Week]  [Monthly View]          │
└────────────────────────────────────────────┘

API CALLS:
- On page load:
  GET /api/progress/get_this_week/
  Response: {
    "week_start": "2025-02-24",
    "week_end": "2025-03-02",
    "completion_rate": 65,
    "daily_log": [
      {"date": "2025-02-24", "completed": true, "habits_completed": 3},
      ...
    ],
    "habit_summary": [
      {"habit_name": "30-min coding", "completions": 5},
      ...
    ]
  }
  UI: Render chart/calendar view with completion dots

- [Monthly View Button]
  GET /api/progress/get_this_month/
  Response: Similar structure, aggregated for 30 days
  UI: Show monthly heatmap or bar chart
```

---

## 4. PEER ACCOUNTABILITY FLOW

### Screen: Peer Connections List
```
┌────────────────────────────────────────────┐
│  Your Accountability Partners              │
├────────────────────────────────────────────┤
│                                            │
│  Active Connections (3):                   │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ @priya_sharma (CSE, Sem 1)         │  │
│  │ Partner since: Feb 20               │  │
│  │ Active Habits: 4                    │  │
│  │ Streak: 7 days                      │  │
│  │ [View Progress] [Remove Connection] │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ @rocky_patel (ECE, Sem 1)           │  │
│  │ ...                                 │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  Pending Requests (1):                     │
│                                            │
│  ┌─────────────────────────────────────┐  │
│  │ @shreya_gupta → wants to be your     │  │
│  │ buddy                               │  │
│  │ [Accept] [Reject]                   │  │
│  └─────────────────────────────────────┘  │
│                                            │
│  [+ Add New Peer]                         │
│                                            │
│  [Dashboard] [Habits] [Progress] [Settings]│
└────────────────────────────────────────────┘

API CALLS:
- On page load:
  GET /api/peers/get_my_connections/
  Response: List of active and pending connections

- [Accept Button] (on pending request)
  POST /api/peers/{id}/accept_connection/
  Response: 200 OK
  UI: Move connection to "Active Connections" section
      Show toast: "@shreya_gupta accepted! Keep each other accountable 💪"

- [Reject Button]
  POST /api/peers/{id}/reject_connection/
  Response: 204 No Content
  UI: Remove from pending section
      Show toast: "Request declined"

- [View Progress Button]
  GET /api/peers/{id}/get_peer_progress/
  Response: {
    "peer": {...},
    "active_habits": [
      {"habit_name": "30-min coding", "streak": 7, "completed_today": true},
      ...
    ],
    "weekly_completion": 70
  }
  UI: Show peer's habit summary
      → Keep encouraging! Peer has 7 day streak on coding
      → NOT showing sensitive data (just habit names and streak)

- [Remove Connection Button]
  → Show confirmation modal
  if confirmed:
  DELETE /api/peers/{id}/
  Response: 204 No Content
  UI: Remove from active connections list

- [+ Add New Peer Button]
  → Show search/invite modal
  → Input peer username or email
  → POST /api/peers/request_connection/ with peer_id and connection_type
  → Show toast: "Connection request sent to @username"
```

---

## 5. REMINDERS & SETTINGS FLOW

### Screen: Notification Settings
```
┌──────────────────────────────────────────┐
│  Reminder Settings                        │
├──────────────────────────────────────────┤
│                                          │
│  ☑ Enable Morning Reminder               │
│  Set time: [08:00 ▼]                    │
│  "Good morning! Ready to code?"          │
│  Last sent: 2 hours ago                  │
│                                          │
│  ☑ Enable Evening Reminder               │
│  Set time: [06:00 ▼]                    │
│  "How was your coding today?"            │
│  Last sent: Yesterday at 6:05 PM         │
│                                          │
│  ☐ Enable Smart Reminders (Beta)         │
│  Sends reminders when you're procrastinating │
│  based on your habit patterns            │
│                                          │
│  [Save Settings]  [Cancel]               │
│                                          │
│  ─────────────────────────────────────   │
│  Danger Zone:                            │
│  [Delete All Reminders] ← Red button     │
└──────────────────────────────────────────┘

API CALLS:
- On page load:
  GET /api/reminders/get_or_create_config/
  Response: {
    "morning_reminder_enabled": true,
    "reminder_time_morning": "08:00",
    "evening_reminder_enabled": true,
    "reminder_time_evening": "18:00",
    "smart_reminders_enabled": false,
    "last_reminder_sent": "2025-02-28T16:45:00Z"
  }
  UI: Populate toggles and time pickers

- [Save Settings Button]
  PUT /api/reminders/get_or_create_config/
  Body: {
    "morning_reminder_enabled": true,
    "reminder_time_morning": "08:30",
    "evening_reminder_enabled": true,
    "reminder_time_evening": "18:30",
    "smart_reminders_enabled": false
  }
  Response: 200 OK
  UI: Show toast "Settings saved!"

- [Cancel Button]
  → Discard changes, go back to dashboard
  → Does NOT make API call

- [Smart Reminders Toggle]
  → When enabled, show info modal:
    "Smart reminders learn from your habits and send
     messages at the best time to keep you on track."
  → Example: "Hey, you've skipped coding 3 times this week—
    let's build momentum tomorrow!"
```

---

## 6. FORM VALIDATION & ERROR HANDLING

### Input Validation (Frontend)

```javascript
// Branch Selection
✓ Required field
✓ Must be one of: CSE, IT, ECE, ME, Civil, Biotech

// Interests Selection
✓ Required field
✓ At least 1 interest
✓ Maximum 5 interests
✓ Valid options: AI, Web, Core, Govt, Startup, Design

// Target Company Type
✓ Required field
✓ Must be one of: Product, Service, Startup, Government

// Habit Name
✓ Required field
✓ Maximum 100 characters
✓ No special characters except spaces, hyphens

// Target Count
✓ Required field
✓ Must be > 0
✓ Integer only

// Reminder Time
✓ Valid time format (HH:MM)
✓ 24-hour format
```

### API Error Responses

```javascript
// 400 Bad Request - Validation Error
Response: {
  "branch": ["This field is required."],
  "interests": ["Ensure this field has at least 1 item."]
}
UI: Display inline field errors above each input
    Show toast: "Please fix the errors below"

// 401 Unauthorized
Response: {
  "detail": "Authentication credentials were not provided."
}
UI: Redirect to /signup page
    Show toast: "You need to sign up first"

// 403 Forbidden
Response: {
  "detail": "You do not have permission to perform this action."
}
UI: Show error modal: "Access Denied"
    "This action is not allowed for your account."

// 404 Not Found
Response: {
  "detail": "Not found."
}
UI: Show error: "This resource doesn't exist"

// 500 Server Error
Response: {
  "detail": "Internal server error."
}
UI: Show error toast: "Something went wrong. Please try again later."
    [Retry Button] to retry request
```

---

## 7. BUTTON STATE MANAGEMENT

### Loading States
```
BEFORE CLICK:
[Generate Roadmap]

WHILE LOADING (POST request in progress):
[⏳ Generating...] (disabled, cursor: progress)

AFTER SUCCESS (201):
Show toast: "Roadmap generated!"
Navigate to roadmap timeline view

AFTER ERROR:
[Generate Roadmap] (re-enabled)
Show error toast: "Failed to generate roadmap. Try again."
[Retry] button available
```

### Delete Confirmation Flow
```
USER CLICKS [Delete Habit]:
↓
Show Modal:
┌───────────────────────────────────┐
│ Delete "30-min Coding"?           │
├───────────────────────────────────┤
│ This action cannot be undone.     │
│                                   │
│ [Cancel]  [Delete] (red button)   │
└───────────────────────────────────┘

IF USER CLICKS [Delete]:
↓
DELETE /api/habits/{id}/
↓
Response: 204 No Content
↓
Remove from habits list
Show toast: "Habit deleted successfully"

IF USER CLICKS [Cancel]:
↓
Close modal (no API call)
```

---

## 8. SUCCESS MESSAGES WITH PERSONALITY

### Streak Updates
```
Streak: 1 day   → "You started! Keep going 👌"
Streak: 3 days  → "3 day streak! You're consistent 💪"
Streak: 7 days  → "7 day streak! Amazing 🔥"
Streak: 14 days → "2 weeks! You're unstoppable 🚀"
Streak: BROKEN  → "Streak broken, but no worries—restart tomorrow! 💙"
```

### Roadmap Generation
```
"Your personalized 4-year placement roadmap is ready! 🎯"
"Get started with Semester 1: Master the fundamentals 📚"
```

### Habit Completion
```
"Great job! Keep the momentum going 💪"
"Another day, another step closer to your goals 🎯"
"You're crushing it! 5 day streak incoming 🔥"
```

### Peer Accountability
```
"Connection request sent! Waiting for @username to respond ⏳"
"Amazing! You're now accountability partners with @username 👥"
"Check out @username's progress—they're on a 7 day streak! 🔥"
```

---

## 9. MOBILE RESPONSIVENESS CHECKLIST

- ✅ Buttons must be at least 44x44px for touch targets
- ✅ Forms should stack vertically on mobile
- ✅ Roadmap timeline should be vertical on mobile (<768px)
- ✅ Habit cards should be single column on mobile
- ✅ Modal dialogs should be full-width on mobile
- ✅ Text should be readable without zoom (16px minimum for body text)
- ✅ Navigation tabs should be sticky or easily accessible

---

## 10. ANIMATION PREFERENCES

### Roadmap Timeline Animation
```
Duration: 2-3 seconds
Type: Smooth SVG line draw (or Framer Motion variants)
Easing: ease-out or cubic-bezier for natural feel
On Load: Auto-play animation
On Interact: Pause animation, show node details on click
```

### Button Interactions
```
Hover: Slight scale (1.02) or color shift
Click: Immediate visual feedback (loading state)
Success: Green checkmark or toast notification
Error: Red outline or toast notification
```

### Habit Streak Updates
```
Update Animation: Pulse effect or number change animation
Duration: 500ms
Type: Framer Motion `whileTap` or CSS transition
```

---

## 11. DATA FLOW DIAGRAMS

### User → Roadmap Generation → Animation
```
User Fills Form
    ↓
[Generate Roadmap] clicked
    ↓
POST /api/roadmaps/generate/
    ↓
Backend generates 8-semester roadmap (JSON)
    ↓
201 Created response with roadmap_data
    ↓
Frontend stores roadmap ID
    ↓
GET /api/roadmaps/{id}/get_animation_data/
    ↓
Returns array of 8 semester objects
    ↓
Frontend renders SVG timeline
    ↓
Animate line from semester 1 to 8
    ↓
User clicks semester → expandNode(sem)
    ↓
Display skills, projects, milestones for that semester
```

### User marks Habit Complete → Streak Update
```
User clicks [Mark Complete]
    ↓
POST /api/habits/{id}/mark_complete/ with date + notes
    ↓
Backend logic:
  - Create ProgressLog entry
  - Check if last_completed was yesterday
  - Yes? Increment streak_count
  - No?  Reset to 1
  - Update max_streak if needed
    ↓
200 OK response with updated habit + streak message
    ↓
Frontend updates habit card:
  - Show new streak count
  - Display motivational message
  - Show checkmark for today
  - Disable button (can't double-complete same day)
    ↓
Toast notification: "Keep it up! 5 day streak 🔥"
```

---

## 12. ACCESSIBILITY REQUIREMENTS

- All form inputs have associated `<label>` elements
- Buttons have descriptive text (not just icons)
- Color contrast ratio >= 4.5:1 for text
- Timeline animation has a `prefers-reduced-motion` fallback
- Modals have proper ARIA attributes (`role="dialog"`, `aria-labelledby`, etc.)
- Error messages linked to form fields with `aria-describedby`
- Keyboard navigation: Tab through all interactive elements
- Focus indicators: Visible outline on all focusable elements

---

## 13. QUICK REFERENCE: BUTTON MATRIX

| Screen | Button | Action | API Call | Response |
|--------|--------|--------|----------|----------|
| Roadmap Form | Generate | POST roadmap | POST /api/roadmaps/generate/ | 201 Created |
| Roadmap Form | Cancel | Go back | None | Navigate to /dashboard |
| Habits List | Mark Complete | Update streak | POST /api/habits/{id}/mark_complete/ | 200 OK |
| Habits List | Edit | Update habit | PATCH /api/habits/{id}/ | 200 OK |
| Habits List | Delete | Confirm+Delete | DELETE /api/habits/{id}/ | 204 No Content |
| Peers List | Accept | Accept request | POST /api/peers/{id}/accept_connection/ | 200 OK |
| Peers List | Reject | Deny request | POST /api/peers/{id}/reject_connection/ | 204 No Content |
| Peers List | Remove | Remove buddy | DELETE /api/peers/{id}/ | 204 No Content |
| Settings | Save | Save config | PUT /api/reminders/.../get_or_create_config/ | 200 OK |
| Settings | Cancel | Discard | None | Navigate to /dashboard |

---

This guide covers all button flows, API interactions, error handling, and animations. Share with frontend team for React/Vue/Angular implementation! 🚀
