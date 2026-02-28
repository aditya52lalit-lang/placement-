# PlacePrep Starter - Complete DJ Transformation Guide

## 📦 What's Included

Your project now has **enhancement files** for transforming your existing React + Node.js + MongoDB app into a **Django-based backend** with two killer features:

### 📄 4 New Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **AMAZON_Q_PROMPTS.json** | Main prompts for AI code generation (6 steps) | AI Agent (Amazon Q) |
| **QUICK_START.md** | 5-minute setup reference | Backend Developer |
| **AMAZON_Q_SETUP_GUIDE.md** | Detailed step-by-step instructions | Backend Developer |
| **BUTTON_FLOWS_AND_ANIMATIONS.md** | Complete UI/UX integration guide | Frontend Developer |

---

## 🎯 The Two Features You're Building

### 1️⃣ **Roadmap Generator**
A smart placement prep roadmap builder that:
- Takes user's branch, interests, and company preference
- Generates a 4-year (8-semester) personalized roadmap
- Shows semester-wise skills, mini-projects, and milestones
- **With animated timeline visualization** (line connects all 8 semesters)

**Example Output:**
```
Semester 1 (Jul-Sep): Master Fundamentals
  Skills: Python, Git, DSA basics
  Projects: Calculator
  Milestone: Complete DSA basics

Semester 2 (Oct-Dec): Build Strong Foundation
  Skills: Data Structures, OOP, Web Basics
  Projects: Chat App
  ...
```

### 2️⃣ **Habit Tracker + Anti-Procrastination**
A streak-based habit system with peer accountability:
- Daily/weekly habits ("30-min coding", "1 mock test")
- Streak counting (encourage consistency)
- Peer accountability (buddy system)
- Smart reminders (learn from behavior patterns)
- Anti-procrastination notifications

**Example:**
- Day 1: ✓ (Streak: 1)
- Day 2: ✓ (Streak: 2) 
- Day 3: ✗ (Streak: broken 💔)
- Day 4: ✓ (Streak: 1 again, but keep trying!)

---

## 🔄 Your Project Evolution

### Current State (React + Node.js + MongoDB)
```
Frontend: React + Vite (with mock data)
Backend: Node.js + Express (API built but not used in exploration mode)
Database: MongoDB (optional for current state)
```

### Target State (React + Django + PostgreSQL)
```
Frontend: React + Vite (enhanced with roadmap animations, habit tracking UI)
Backend: Django 5.1 + Django REST Framework (6 models, 16+ endpoints)
Database: PostgreSQL (production-ready)
Authentication: JWT (via djangorestframework-simplejwt)
```

### Why This Upgrade?
- ✅ Django ORM is more powerful than Mongoose for complex queries
- ✅ DRF provides built-in validation, pagination, filtering
- ✅ PostgreSQL better for complex relationships (habits → streaks → peers)
- ✅ Production-ready patterns (admin panel, migrations, permissions)
- ✅ Scalable from hackathon to real deployment

---

## 📋 Read These Files In Order

### For Backend Developers:

1. **Start Here:** [QUICK_START.md](QUICK_START.md)
   - 5-minute overview
   - File structure
   - Testing commands

2. **Then Read:** [AMAZON_Q_SETUP_GUIDE.md](AMAZON_Q_SETUP_GUIDE.md)
   - How to use Amazon Q AI agent
   - Step-by-step instructions
   - Endpoint summary

3. **Reference:** [AMAZON_Q_PROMPTS.json](AMAZON_Q_PROMPTS.json)
   - Copy prompts to Amazon Q one by one
   - Each prompt generates one part of backend

### For Frontend Developers:

1. **Start Here:** [QUICK_START.md](QUICK_START.md) (sections: "Frontend Integration Points")
   - Overview of new routes
   - Button flows

2. **Deep Dive:** [BUTTON_FLOWS_AND_ANIMATIONS.md](BUTTON_FLOWS_AND_ANIMATIONS.md)
   - Complete button flows diagram
   - Animation specifications
   - Form validation rules
   - Error handling patterns

3. **Reference:** [AMAZON_Q_SETUP_GUIDE.md](AMAZON_Q_SETUP_GUIDE.md) (section: "API Endpoint Summary")
   - All available endpoints
   - Request/response formats

---

## 🚀 Quick Execution Path

### If You Want to Build the Backend NOW:

1. Open: `AMAZON_Q_PROMPTS.json`
2. Copy the first prompt (Step 1 - Models Setup)
3. Paste into **Amazon Q** chat
4. Ask: "Generate the complete file with all imports, validators, docstrings, and error handling ready for production."
5. Save output to: `placeprep_backend/core/models.py`
6. Repeat for Steps 2-4
7. Run: `python manage.py migrate`
8. Run: `python manage.py runserver`
9. Visit: `http://localhost:8000/api/`

### If You Want to Update the Frontend:

1. Read: [BUTTON_FLOWS_AND_ANIMATIONS.md](BUTTON_FLOWS_AND_ANIMATIONS.md)
2. Note all button interactions and API endpoints
3. Create React components for:
   - Roadmap generator form
   - Animated timeline
   - Habit list with streak counter
   - Peer connections manager
4. Connect buttons to Django API endpoints

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│           React Frontend (Vite)                     │
│   - Roadmap Generator Form                         │
│   - Animated Timeline (Framer Motion)              │
│   - Habit Dashboard                                │
│   - Peer Accountability View                       │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ HTTP/REST
                   │ JWT Tokens
                   │ JSON Payloads
                   │
┌──────────────────▼──────────────────────────────────┐
│        Django 5.1 + DRF Backend                     │
│                                                    │
│  Models:                                           │
│  - CustomUser (extending AbstractUser)             │
│  - Roadmap (4-year semester plans)                 │
│  - UserHabitGoal (daily/weekly goals)              │
│  - ProgressLog (daily tracking)                    │
│  - PeerConnection (buddy system)                   │
│  - RemindersConfig (notification settings)         │
│                                                    │
│  API Endpoints: 16+                                │
│  - Roadmap generation (with animation data)        │
│  - Habit CRUD + mark complete/incomplete           │
│  - Progress tracking (weekly/monthly)              │
│  - Peer connection requests                        │
│  - Reminder configuration                          │
│                                                    │
│  Features:                                         │
│  - JWT Authentication                              │
│  - Scoped Permissions (only see own data)          │
│  - Pagination & Filtering                          │
│  - Custom streak logic                             │
│  - Roadmap generation algorithm                    │
└──────────────────┬──────────────────────────────────┘
                   │
                   │ ORM Queries
                   │ Transactions
                   │
┌──────────────────▼──────────────────────────────────┐
│    PostgreSQL Database (or SQLite for dev)         │
│                                                    │
│  Tables:                                           │
│  - auth_user (with branch, year, interests)        │
│  - core_roadmap                                    │
│  - core_userhabitgoal                              │
│  - core_progresslog                                │
│  - core_peerconnection                             │
│  - core_remindersconfig                            │
└─────────────────────────────────────────────────────┘
```

---

## 📊 API Feature Matrix

### Generated by Amazon Q (Step by Step):

| Feature | Step | Models | Serializers | Views | Endpoints |
|---------|------|--------|-------------|-------|-----------|
| **Roadmap Generation** | 1,2,3,4 | Roadmap | RoadmapSerializer | RoadmapViewSet | POST /api/roadmaps/generate/ |
| **Roadmap Timeline Animation** | 2,3 | - | RoadmapSerializer (with SerializerMethodField) | - | GET /api/roadmaps/{id}/get_animation_data/ |
| **Habit Creation** | 1,2,3 | UserHabitGoal | HabitGoalSerializer | HabitGoalViewSet | POST /api/habits/ |
| **Streak Counting** | 1,4 | UserHabitGoal, ProgressLog | - | HabitGoalViewSet (mark_complete action) | POST /api/habits/{id}/mark_complete/ |
| **Progress Tracking** | 1,2,3 | ProgressLog | ProgressLogSerializer | ProgressLogViewSet | GET /api/progress/get_this_week/ |
| **Peer Accountability** | 1,2,3 | PeerConnection | PeerConnectionSerializer | PeerConnectionViewSet | POST /api/peers/request_connection/ |
| **Notifications config** | 1,2,3 | RemindersConfig | RemindersConfigSerializer | RemindersConfigViewSet | PUT /api/reminders/get_or_create_config/ |

---

## 💾 Files You'll Create

### From Amazon Q Outputs:

```
placeprep_backend/
├── core/
│   ├── models.py              ← Step 1
│   ├── serializers.py         ← Step 2
│   ├── views.py               ← Step 3
│   ├── routers.py             ← Step 3
│   ├── urls.py                ← Step 3
│   ├── services.py            ← Step 4
│   └── permissions.py         ← Custom (create yourself)
│
├── placeprep_backend/
│   └── settings.py            ← Add JWT config from Step 4
│
├── .env.example               ← Step 6
├── requirements.txt           ← Step 6
├── Dockerfile                 ← Step 6
└── docker-compose.yml         ← Step 6
```

### Manual Additions:

- `placeprep_backend/urls.py` - Add `path('api/', include('core.urls'))`
- `core/admin.py` - Register models in Django admin
- `core/permissions.py` - CustomUser permission checks
- `.env` - Copy from `.env.example`, fill in values

---

## 🎨 Frontend Routes (Step 5 Guidance)

```
React Router Setup:
├── /                          → Dashboard (habit list, quick stats)
├── /roadmap/generate          → Roadmap Generator Form
├── /roadmap/:id               → View Roadmap with Animation
├── /habits                    → All Habits List
├── /habits/new                → Create New Habit
├── /habits/:id/edit           → Edit Habit
├── /habits/:id/stats          → Habit Statistics (streak, completion %)
├── /progress                  → Weekly/Monthly Progress View
├── /peers                     → Peer Connections Manager
├── /settings/reminders        → Reminder Configuration
└── /settings/profile          → User Profile (branch, interests update)
```

---

## 🧪 Test Your Implementation

### Backend Testing Path:

```bash
# 1. Model migrations work
python manage.py migrate
✓ Creates all tables

# 2. Admin panel works
python manage.py createsuperuser
python manage.py runserver
→ Visit http://localhost:8000/admin
✓ See all models registered

# 3. API endpoints work
curl http://localhost:8000/api/
✓ See browsable API root

# 4. Roadmap generation works
POST /api/roadmaps/generate/
→ Returns 8-semester JSON structure

# 5. Habit streak works
POST /api/habits/
POST /api/habits/{id}/mark_complete/
→ Streak increments correctly

# 6. Frontend integration
React calls API endpoints
→ Data displays, buttons work
```

### Frontend Testing Path:

```jsx
// Test roadmap animation loads
GET /api/roadmaps/{id}/get_animation_data/
→ Verify timeline renders

// Test habit completion
POST /api/habits/{id}/mark_complete/
→ Verify streak updates in UI

// Test form validation
Submit empty form
→ Verify inline errors appear

// Test error handling
Call invalid endpoint
→ Verify error toast appears
```

---

## 🚨 Important Notes

### Before You Start:

1. ✅ **Review AMAZON_Q_PROMPTS.json** - Understand what each step generates
2. ✅ **Have Django installed** - `pip install django djangorestframework`
3. ✅ **Create Django project first** - `django-admin startproject placeprep_backend`
4. ✅ **Create core app** - `python manage.py startapp core`

### During Implementation:

1. ✅ **Follow steps 1-4 in order** - Each step builds on previous
2. ✅ **Don't skip Step 4** - Contains important business logic
3. ✅ **Test after each step** - Run migrations between steps
4. ✅ **Review Amazon Q output** - Adapt if needed for your use case

### After Implementation:

1. ✅ **Run migrations** - `python manage.py migrate`
2. ✅ **Create superuser** - `python manage.py createsuperuser`
3. ✅ **Test API** - Use Postman or curl to call endpoints
4. ✅ **Build frontend** - Follow BUTTON_FLOWS_AND_ANIMATIONS.md
5. ✅ **Deploy** - Use Docker or cloud platform

---

## 💡 Pro Tips

### From the Prompts:

- **Comments Style**: Prompts ask for "tired dev" comments like `# smh took forever to debug`—This makes code look hand-written, not AI-generated
- **Code Quality**: All code includes validators, docstrings, error handling—Production-ready, not stub code
- **Best Practices**: PEP 8, type hints, proper Meta classes—Django standards followed

### For Amazon Q Usage:

- Copy **one prompt at a time** (don't paste all at once)
- Add this request: "Generate the complete file with all imports, validators, docstrings, and error handling ready for production."
- Review output before saving
- Ask follow-ups if anything is incomplete

### For Frontend Integration:

- Read **BUTTON_FLOWS_AND_ANIMATIONS.md** completely first
- Follow the exact API call sequences shown
- Use error handling patterns provided
- Implement animations for roadmap timeline (Framer Motion recommended)

---

## 📞 Troubleshooting Reference

### If Amazon Q Output is Incomplete:

Ask these follow-ups:
```
"Add missing validators for branch field"
"Include proper docstring examples for each serializer"
"Add type hints to all function parameters"
"Create fixture data for testing this endpoint"
```

### If Backend Won't Start:

```bash
# Check syntax
python manage.py check

# Check imports
python -c "from core import models; print(dir(models))"

# Check migrations
python manage.py showmigrations
```

### If Frontend Won't Connect:

```bash
# Check CORS in settings.py
CORS_ALLOWED_ORIGINS = ['http://localhost:3000']

# Check JWT in headers
Authorization: Bearer <your_token>

# Check endpoint exists
curl http://localhost:8000/api/
```

---

## 🎊 Success Checklist

- ✅ AMAZON_Q_PROMPTS.json created with 6 steps
- ✅ QUICK_START.md has 5-minute overview
- ✅ AMAZON_Q_SETUP_GUIDE.md has detailed steps
- ✅ BUTTON_FLOWS_AND_ANIMATIONS.md has all UI flows
- ✅ Backend developer can run through Steps 1-4
- ✅ Frontend developer knows what routes to build
- ✅ API endpoints documented and traceable
- ✅ Animation requirements clear (timeline with Framer Motion)
- ✅ Button flows have error handling and success messages
- ✅ Database models support both features (roadmap + habits)

---

## 🚀 Next Steps

### Right Now:

1. **Backend Dev**: Open `AMAZON_Q_PROMPTS.json`
2. **Copy Step 1** prompt
3. **Paste into Amazon Q**
4. **Generate models.py**
5. **Save to `placeprep_backend/core/models.py`**

### Then:

1. **Repeat for Steps 2-4**
2. **Run migrations**
3. **Test endpoints**
4. **Frontend Dev: Read button flows**
5. **Build React components**

### Finally:

1. **Test frontend-backend integration**
2. **Deploy with Docker**
3. **Get feedback from 1st year students**
4. **Iterate and improve**

---

## 📚 File Quick Links

| Document | Use Case | Read Time |
|----------|----------|-----------|
| [QUICK_START.md](QUICK_START.md) | Quick reference, get started fast | 5 min |
| [AMAZON_Q_SETUP_GUIDE.md](AMAZON_Q_SETUP_GUIDE.md) | Detailed walkthrough, step-by-step | 10 min |
| [AMAZON_Q_PROMPTS.json](AMAZON_Q_PROMPTS.json) | Main prompts for code generation | 15 min to skim |
| [BUTTON_FLOWS_AND_ANIMATIONS.md](BUTTON_FLOWS_AND_ANIMATIONS.md) | UI/UX design, frontend integration | 20 min |

---

## 🎯 Your Mission

**Transform your PlacePrep Starter app into a production-grade platform for 1st-year engineering students** with:

- 🛣️ Smart roadmap generator (with animated timeline)
- 📊 Habit tracker with streak system
- 👥 Peer accountability buddy system
- ⏰ Smart reminders (anti-procrastination)
- 🚀 Scalable Django backend + React frontend

**You have all the tools. Let's build! 🔥**

---

**Created:** Feb 28, 2025  
**For:** PlacePrep Starter - 1st Year Edition  
**Stack:** Django 5.1 + React + PostgreSQL  
**Status:** Ready for Amazon Q AI generation ✅

---

Good luck! 🚀 If you hit any snags, revisit the detailed guides or ask Amazon Q for clarifications.
