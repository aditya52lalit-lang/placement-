# PlacePrep Starter - Django Backend Quick Start

## 📋 What You Have Now

You have **3 complete files** ready for Amazon Q AI agent:

1. **AMAZON_Q_PROMPTS.json** - 6 step-by-step prompts that generate the complete Django backend
2. **AMAZON_Q_SETUP_GUIDE.md** - Instructions on how to use the prompts
3. **BUTTON_FLOWS_AND_ANIMATIONS.md** - Frontend integration guide with all UI/UX flows

---

## 🚀 Quick Start (5 Steps)

### Step 1: Copy First Prompt to Amazon Q
```
Open AMAZON_Q_PROMPTS.json
Find: prompts[0] (Step 1 - Models Setup)
Copy the entire "prompt" field value
Paste into Amazon Q chat
Add this request: "Generate the complete file with all imports, validators, docstrings, and error handling ready for production."
```

### Step 2: Save models.py Output
```
Amazon Q will output: models.py code
Save to: placeprep_backend/core/models.py
Action: Create file with all model definitions
```

### Step 3: Repeat for Steps 2-4
```
Step 2 → serializers.py (core/serializers.py)
Step 3 → views.py, routers.py, urls.py
Step 4 → services.py (core/services.py)
            + settings.py additions
```

### Step 4: Run Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Test API
```bash
python manage.py runserver
# Visit: http://localhost:8000/api/
```

---

## 📊 Project Architecture

### Backend Models (Step 1)
```
CustomUser
  ├─ branch (CSE, IT, ECE, etc)
  ├─ year (1-4)
  ├─ interests (list)
  └─ target_company_type

Roadmap (One-to-One with User)
  ├─ roadmap_data (JSON structure with 8 semesters)
  ├─ is_generated (bool)
  └─ generated_at (timestamp)

UserHabitGoal (One-to-Many with User)
  ├─ habit_name
  ├─ habit_type (daily/weekly/monthly)
  ├─ streak_count
  ├─ max_streak
  └─ last_completed

ProgressLog (One-to-Many tracking)
  ├─ habit_goal (FK)
  ├─ completed_date
  ├─ is_completed (bool)
  └─ notes

PeerConnection (User-to-User Many-to-Many)
  ├─ user
  ├─ peer
  ├─ connection_type
  └─ status (pending/active/inactive)

RemindersConfig (One-to-One with User)
  ├─ morning_reminder_enabled
  ├─ evening_reminder_enabled
  └─ smart_reminders_enabled
```

### API Endpoints (Step 3)

**Roadmap Generator:**
- `POST /api/roadmaps/generate/` - Create roadmap
- `GET /api/roadmaps/{id}/` - View roadmap
- `GET /api/roadmaps/{id}/get_animation_data/` - For timeline animation

**Habit Management:**
- `POST /api/habits/` - Create habit
- `PATCH /api/habits/{id}/` - Update habit
- `DELETE /api/habits/{id}/` - Delete habit
- `POST /api/habits/{id}/mark_complete/` - Mark complete (streak +1)

**Progress Tracking:**
- `GET /api/progress/get_this_week/` - Weekly summary
- `GET /api/progress/get_this_month/` - Monthly summary

**Peer Accountability:**
- `POST /api/peers/request_connection/` - Send buddy request
- `POST /api/peers/{id}/accept_connection/` - Accept request
- `GET /api/peers/{id}/get_peer_progress/` - View peer's habits

---

## 🎯 Two Core Features

### Feature 1: Roadmap Generator
**What it does:**
- User selects: Branch (CSE/IT/ECE) + Interests (AI/Web/Core/Govt) + Company Type (Product/Service/Startup/Govt)
- Backend generates: 8-semester roadmap with skills, projects, milestones
- Frontend displays: Animated timeline connecting all 8 semesters

**Data Structure Example:**
```json
{
  "1": {
    "skills": ["Python basics", "Git", "Time complexity"],
    "projects": ["Calculator"],
    "milestone": "Master fundamentals",
    "timeline": "Jul-Sep: Learn basics"
  },
  "2": { ... },
  ...
  "8": { ... }
}
```

**Animation Data:**
```json
[
  {
    "semester": 1,
    "skills": [...],
    "projects": [...],
    "milestone": "...",
    "timeline": "..."
  },
  ...
]
```

### Feature 2: Habit Tracking + Anti-Procrastination
**What it does:**
- Users create daily/weekly/monthly habits (e.g., "30-min coding")
- Mark habit complete → streak increases
- Miss habit → streak breaks
- View peer's progress → accountability
- Smart reminders based on procrastination patterns

**Streak Logic:**
```
Day 1: User completes ✓ → streak = 1
Day 2: User completes ✓ → streak = 2 (if last_completed was yesterday)
Day 3: User skips ✗ → streak = 0 (broken)
Day 4: User completes ✓ → streak = 1 (restart)
```

**Example Habits:**
- "30-min daily coding" (target: 30 minutes)
- "1 mock test weekly" (target: 1 test)
- "LeetCode grind" (target: 5 medium problems)

---

## 🔧 Configuration Checklist

After Amazon Q generates code:

- [ ] Create `.env` file from `.env.example` (from Step 6)
- [ ] Update `placeprep_backend/settings.py` with JWT config (from Step 4)
- [ ] Update `placeprep_backend/urls.py`:
  ```python
  # In urlpatterns:
  path('api/', include('core.urls')),
  ```
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Run migrations: `python manage.py migrate`
- [ ] Create superuser: `python manage.py createsuperuser`
- [ ] Test with: `python manage.py runserver`

---

## 📝 File Organization (After All Steps)

```
placeprep_backend/
├── manage.py
├── requirements.txt          ← From Step 6
├── .env.example               ← From Step 6
├── Dockerfile                 ← From Step 6
├── docker-compose.yml         ← From Step 6
│
├── placeprep_backend/
│   ├── settings.py            ← Add JWT config from Step 4
│   ├── urls.py                ← Add core.urls include
│   ├── wsgi.py
│   └── asgi.py
│
├── core/
│   ├── models.py              ← From Step 1
│   ├── serializers.py         ← From Step 2
│   ├── views.py               ← From Step 3
│   ├── routers.py             ← From Step 3
│   ├── urls.py                ← From Step 3
│   ├── services.py            ← From Step 4
│   ├── permissions.py         ← Create (custom permissions)
│   ├── admin.py               ← Create (admin registration)
│   ├── apps.py
│   ├── tests.py
│   │
│   └── migrations/
│       └── 0001_initial.py
│
└── logs/
    └── django.log
```

---

## 🧪 Testing the API

After running `python manage.py runserver`:

### Test 1: Create User & Get JWT Token
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "branch": "CSE"
  }'
```

### Test 2: Generate Roadmap
```bash
curl -X POST http://localhost:8000/api/roadmaps/generate/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "branch": "CSE",
    "interests": ["AI", "Web Development"],
    "target_company_type": "Product"
  }'
```

### Test 3: Create Habit
```bash
curl -X POST http://localhost:8000/api/habits/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "habit_name": "30-min daily coding",
    "habit_type": "daily",
    "target_count": 30,
    "unit": "minutes"
  }'
```

### Test 4: Mark Habit Complete
```bash
curl -X POST http://localhost:8000/api/habits/1/mark_complete/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "completed_date": "2025-02-28",
    "notes": "Solved 3 medium LeetCode problems"
  }'
```

---

## 🎨 Frontend Integration Points

### Step 5 Provides:
- ✅ React route structure (`/roadmap`, `/habits`, `/progress`, `/peers`, `/settings`)
- ✅ Button flows with API calls for each feature
- ✅ Animation data structure for roadmap timeline
- ✅ Form validation rules
- ✅ Error handling patterns
- ✅ Success message templates

### For React Developer:
1. Read **BUTTON_FLOWS_AND_ANIMATIONS.md**
2. Follow the route structure outlined
3. Implement each screen with the specified button interactions
4. Use Framer Motion for roadmap timeline animation
5. Connect to API endpoints with proper error handling

### Example: Creating a Habit Button
```jsx
import axios from 'axios';

function CreateHabitButton({ userId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateHabit = async (habitData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/habits/',
        habitData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setLoading(false);
      // Show success toast
      // Add habit to list
    } catch (err) {
      setError(err.response.data);
      setLoading(false);
      // Show error toast
    }
  };

  return (
    <button 
      onClick={() => handleCreateHabit(formData)}
      disabled={loading}
    >
      {loading ? '⏳ Creating...' : 'Create Habit'}
    </button>
  );
}
```

---

## 🚨 Common Issues & Fixes

### Issue: Models not migrating
```bash
# Fix:
rm -rf core/migrations/*  (except __init__.py)
python manage.py makemigrations
python manage.py migrate
```

### Issue: JWT token not recognized
```
Check: settings.py has correct JWT configuration
Check: Request header: Authorization: Bearer YOUR_TOKEN
Check: Token not expired
```

### Issue: CORS errors on frontend
```
Fix in settings.py:
CORS_ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:3001']
```

### Issue: Static files not loading
```bash
python manage.py collectstatic
```

---

## 📚 Amazon Q Prompt Order

Follow this exact order:

1. **Step 1** → Models Setup → `core/models.py`
2. **Step 2** → Serializers → `core/serializers.py`
3. **Step 3** → Views & Routers → `core/views.py`, `core/routers.py`, `core/urls.py`
4. **Step 4** → Business Logic → `core/services.py` + `settings.py` updates
5. **Step 5** → Frontend Guide → Documentation for React team
6. **Step 6** → Deployment → `.env.example`, `requirements.txt`, Docker files

---

## 🎯 Success Criteria

Your backend is ready when:

- ✅ All 6 models defined and migrated
- ✅ All 5 ViewSets with custom actions implemented
- ✅ API endpoints accessible at `http://localhost:8000/api/`
- ✅ Roadmap generation creates 8-semester JSON structure
- ✅ Habit streak calculation works correctly
- ✅ Peer connections allow mutual acceptance
- ✅ JWT authentication secures endpoints
- ✅ CORS allows frontend domain access
- ✅ All tests pass: `python manage.py test`
- ✅ Frontend can call all endpoints and handle responses

---

## 🌐 Deployment Ready

After backend works locally:

1. Copy `.env.example` → `.env` (update with production values)
2. Install PostgreSQL (replace SQLite for production)
3. Use Docker Compose: `docker-compose up`
4. Deploy to: Heroku, Railway, AWS, DigitalOcean, or GCP

---

## 📞 Need Help?

If Amazon Q output is incomplete:
- Ask: "Add the missing PATCH endpoint for updating habits"
- Ask: "Include type hints for all functions"
- Ask: "Add docstring examples for each serializer"
- Ask: "Create fixture files with sample data for testing"

---

## 🎊 You're All Set!

You now have:
1. JSON prompts for Amazon Q ✅
2. Step-by-step setup guide ✅
3. Button flows & animations for frontend ✅
4. This quick start reference ✅

**Next: Copy the first prompt to Amazon Q and generate `models.py`!**

Happy coding! 🚀
