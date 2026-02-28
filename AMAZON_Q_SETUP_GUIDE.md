# PlacePrep Starter - Amazon Q AI Agent Setup Guide

## Overview
This guide helps you use Amazon Q AI agent to build a Django 5.1 backend for PlacePrep Starter—a placement prep app for 1st-year engineering students.

## Key Features to Build

### 1. **Roadmap Generator App**
- User enters: Branch, Interests, Target Company Type
- App generates: 4-year semester-wise roadmap with skills, mini-projects, internship timeline
- **Animation**: Timeline line connects all 8 semesters from top to bottom with smooth animation

### 2. **Habit + Anti-Procrastination Tool**
- Daily 30-min coding goals with streak counting
- Peer accountability system
- Weekly mock tests
- Smart reminders based on behavior patterns
- Anti-procrastination notifications

---

## How to Use AMAZON_Q_PROMPTS.json

### Step-by-Step Instructions

1. **Open Amazon Q** in your IDE or AWS Console
2. **Navigate to the file**: `AMAZON_Q_PROMPTS.json` in your project root
3. **Copy the prompt content** for each step (found under `prompts` array)
4. **Paste into Amazon Q** one prompt at a time
5. **Request**: "Generate the complete file with all imports, validators, docstrings, and error handling ready for production."

### Prompt Order (Step by Step)

| Step | Name | File Output | Time Est |
|------|------|-------------|----------|
| 1 | Models Setup | `core/models.py` | 5-10 min |
| 2 | Serializers | `core/serializers.py` | 5-10 min |
| 3 | Views & Routers | `core/views.py`, `core/routers.py`, `core/urls.py` | 10-15 min |
| 4 | Roadmap & Habit Logic | `core/services.py` + `settings.py` partial | 10-15 min |
| 5 | Frontend Integration Guide | Documentation + button flows | 5 min |
| 6 | Environment & Deployment | `.env.example`, `requirements.txt`, Docker files | 5 min |

---

## Project Structure (After Build)

```
placeprep_backend/
├── manage.py
├── placeprep_backend/
│   ├── settings.py          ← Update with JWT, CORS, DB config
│   ├── urls.py              ← Include core app urls
│   ├── asgi.py
│   └── wsgi.py
├── core/
│   ├── models.py            ← Step 1: CustomUser, Roadmap, Habits, etc
│   ├── serializers.py       ← Step 2: All serializers
│   ├── views.py             ← Step 3: ViewSets & custom actions
│   ├── routers.py           ← Step 3: DefaultRouter registration
│   ├── urls.py              ← Step 3: API routes
│   ├── services.py          ← Step 4: Roadmap generation, streak logic
│   ├── permissions.py       ← Custom permission classes
│   ├── admin.py             ← Django admin registration
│   └── migrations/
├── .env.example             ← Step 6: Environment variables template
├── requirements.txt         ← Step 6: Python dependencies
├── Dockerfile               ← Step 6: Docker containerization
├── docker-compose.yml       ← Step 6: Docker Compose setup
└── README.md                ← Project documentation
```

---

## Amazon Q Prompt Usage Tips

### Before Copy-Pasting:

1. **Read the full prompt** to understand requirements
2. **Note the constraints** (they're important!)
3. **Check expected output** to validate AI response quality
4. **Ask for clarifications** if AI output seems incomplete

### Useful Requests to Add:

- "Add type hints to all functions and class methods"
- "Make the docstrings follow Google style format"
- "Add TODO comments for future enhancements"
- "Ensure all model fields have help_text for admin panel"
- "Add bulk create methods for test data generation"

### If AI Response is Incomplete:

Ask follow-up questions:
- "Add the missing endpoints I mentioned in the prompt"
- "Can you add pagination to all ListViewSet actions?"
- "Include proper docstrings for all serializer fields"
- "Add custom validators for the branch and semester fields"

---

## Development Workflow

### Phase 1: Backend Foundation (Using Steps 1-4)

```bash
# 1. Create Django project
django-admin startproject placeprep_backend
cd placeprep_backend
python manage.py startapp core

# 2. Copy models.py from Amazon Q output (Step 1)
# 3. Copy serializers.py from Amazon Q output (Step 2)
# 4. Copy views.py, routers.py, urls.py from Amazon Q output (Step 3)
# 5. Copy services.py from Amazon Q output (Step 4)

# 6. Run migrations
python manage.py makemigrations
python manage.py migrate

# 7. Create superuser
python manage.py createsuperuser

# 8. Test API
python manage.py runserver
# Visit http://localhost:8000/api/ for browsable API
```

### Phase 2: Configure Settings (From Step 6)

1. Copy `.env.example` → `.env` (update with your values)
2. Update `settings.py` with JWT, CORS, Database config (from Step 6 prompt output)
3. Add `requirements.txt` dependencies
4. Install: `pip install -r requirements.txt`
5. Test endpoints with Postman or curl

### Phase 3: Frontend Integration (Step 5 Guidance)

1. Review button flows from Step 5
2. Build React pages consuming API endpoints
3. Implement animation for roadmap timeline
4. Test all CRUD operations

---

## API Endpoint Summary

### Authentication (via djoser or custom)
```
POST /api/auth/register/       - User registration
POST /api/auth/login/          - User login (JWT)
POST /api/auth/refresh/        - Refresh JWT token
GET  /api/users/me/            - Get current user profile
PATCH /api/users/{id}/         - Update user profile
```

### Roadmap Generator
```
GET  /api/roadmaps/            - List all user's roadmaps
POST /api/roadmaps/generate/   - Generate new roadmap (branch, interests, company_type)
GET  /api/roadmaps/{id}/       - Get roadmap details
GET  /api/roadmaps/{id}/get_animation_data/  - Get timeline for animation
GET  /api/roadmaps/{id}/get_semester_breakdown/ - Get specific semester
```

### Habit Management
```
GET  /api/habits/              - List active habits
POST /api/habits/              - Create new habit
PATCH /api/habits/{id}/        - Update habit
DELETE /api/habits/{id}/       - Delete habit
POST /api/habits/{id}/mark_complete/   - Mark today as completed (streak +1)
POST /api/habits/{id}/mark_incomplete/ - Mark incomplete (streak reset)
GET  /api/habits/{id}/get_stats/       - Get habit statistics
```

### Progress & Tracking
```
GET  /api/progress/            - List all progress logs
GET  /api/progress/get_this_week/     - Weekly summary
GET  /api/progress/get_this_month/    - Monthly summary
POST /api/progress/            - Log new progress entry
```

### Peer Accountability
```
GET  /api/peers/               - List connections
POST /api/peers/request_connection/   - Send connection request
POST /api/peers/{id}/accept_connection/ - Accept request
POST /api/peers/{id}/reject_connection/ - Reject request
GET  /api/peers/{id}/get_peer_progress/ - View peer's habits (if mutual)
DELETE /api/peers/{id}/        - Remove connection
```

### Reminders Configuration
```
GET  /api/reminders/get_or_create_config/  - Get settings
PUT  /api/reminders/get_or_create_config/  - Update settings
```

---

## Important Notes for Amazon Q

1. **Code Style**: Prompts ask for "tired dev" comments and hand-written code—not textbook perfect
2. **Docstrings**: Include proper docstrings + occasional comments like "# smh this took forever"
3. **Human Touch**: Variable naming varies slightly, small custom logic added
4. **No Generic Comments**: Avoid "TODO: implement this later"
5. **Production-Ready**: All validators, error handling, permissions included

---

## Testing the Backend

### After Step 3 (Views):

```bash
# Start Django server
python manage.py runserver

# Test workflow:
1. Create user (signup)
2. Generate roadmap (POST /api/roadmaps/generate/)
3. Create habit (POST /api/habits/)
4. Mark habit complete (POST /api/habits/{id}/mark_complete/)
5. View progress (GET /api/progress/get_this_week/)
6. Add peer (POST /api/peers/request_connection/)
```

### Using Postman:

1. Authenticate: Get JWT token from login endpoint
2. Add to header: `Authorization: Bearer YOUR_TOKEN`
3. Test each endpoint with sample data
4. Verify response structure matches serializers

---

## Frontend React Integration

**Roadmap Animation Data** (from Step 5):
```javascript
GET /api/roadmaps/{id}/get_animation_data/

Response:
[
  {
    "semester": 1,
    "skills": ["Python", "Git", "DSA"],
    "projects": ["Calculator"],
    "milestone": "Master fundamentals",
    "timeline": "Jul-Sep"
  },
  ...
]
```

**Use Framer Motion for animation:**
```jsx
// Pseudo-code
<motion.svg>
  <motion.line 
    animate={{ pathLength: 1 }} 
    transition={{ duration: 3 }}
  />
  {roadmap.map(sem => (
    <motion.circle 
      whileHover={{ scale: 1.2 }}
      onClick={() => expandSemester(sem)}
    />
  ))}
</motion.svg>
```

---

## Deployment Checklist (Step 6)

- [ ] Copy `.env.example` → `.env` (update values)
- [ ] Install PostgreSQL (or use managed DB service)
- [ ] Update `DATABASE_` vars in `.env`
- [ ] Run `python manage.py migrate`
- [ ] Generate strong `SECRET_KEY`
- [ ] Set `DEBUG=False` for production
- [ ] Configure CORS for frontend domain
- [ ] Setup email backend (for reminders)
- [ ] Optional: Use Docker (`docker-compose up`)
- [ ] Optional: Deploy to Heroku, Railway, or AWS

---

## File Checklist After All Steps

### Generated Files (from Amazon Q):
- ✅ `core/models.py` (Step 1)
- ✅ `core/serializers.py` (Step 2)
- ✅ `core/views.py` (Step 3)
- ✅ `core/routers.py` (Step 3)
- ✅ `core/urls.py` (Step 3)
- ✅ `core/services.py` (Step 4)
- ✅ `requirements.txt` (Step 6)
- ✅ `.env.example` (Step 6)
- ✅ `Dockerfile` (Step 6)
- ✅ `docker-compose.yml` (Step 6)

### Manual Additions:
- ⚠️ Update `placeprep_backend/settings.py` (add JWT, CORS, DB config from Step 4)
- ⚠️ Update `placeprep_backend/urls.py` (include core app urls)
- ⚠️ Create `.env` from `.env.example`
- ⚠️ Create `core/admin.py` (register models)
- ⚠️ Create `core/permissions.py` (custom permission classes)

---

## Next Steps

1. **Load AMAZON_Q_PROMPTS.json** into Amazon Q
2. **Execute prompts Step 1-4** to generate backend files
3. **Review & adapt** output as needed
4. **Run Django locally** (python manage.py runserver)
5. **Test all endpoints** with Postman/curl
6. **Build React frontend** using Step 5 guidance
7. **Deploy** using Step 6 Docker setup

---

## Questions or Issues?

If Amazon Q output is incomplete:
- Ask for missing validators or error handling
- Request type hints or docstring improvements
- Ask for specific test examples
- Request code comments explaining complex logic

Good luck building PlacePrep Starter! 🚀
