# ⚡ Quick Start Guide - Placement Prep Starter

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)
```bash
# Run the setup script
setup.bat

# OR manually:
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Start MongoDB (1 minute)
```bash
# Option A: Local MongoDB
mongod --dbpath C:\data\db

# Option B: Use MongoDB Atlas (Free)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Get connection string
# 4. Update backend/.env
```

### Step 3: Start Backend (30 seconds)
```bash
cd backend
npm run dev

# Should see:
# ✅ MongoDB Connected
# 🚀 Server running on port 5000
```

### Step 4: Start Frontend (30 seconds)
```bash
# New terminal
cd frontend
npm run dev

# Should see:
# ➜  Local:   http://localhost:3000/
```

### Step 5: Open Browser (30 seconds)
```
Navigate to: http://localhost:3000
```

## 🎯 First-Time User Flow

### 1. Sign Up
- Click "Sign up"
- Enter: Name, Email, Password
- Click "Sign Up" button

### 2. Choose Background
- Select: B.Tech / B.Com / MBA / Degree
- Automatically proceeds to next step

### 3. Select Branch
- Choose your specialization
- Example: Computer Science for B.Tech

### 4. Pick Domains
- Select one or more: AI, Web Dev, Data Science, Robotics, Core
- Click "Continue with X domains"

### 5. Start Learning
- View learning modules
- Click "Start Module" on any topic
- Take quiz and get AI analysis

## 📝 Test Credentials

```
Email: demo@test.com
Password: demo123
```

## 🔧 Common Commands

### Backend
```bash
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 🎨 Key Features to Demo

### 1. Glassmorphism UI ✨
- Frosted glass cards
- Gradient backgrounds
- Smooth animations

### 2. Authentication 🔐
- JWT-based auth
- Protected routes
- Persistent sessions

### 3. Progress Tracking 📊
- Visual progress bars
- Completion status
- Last accessed tracking

### 4. Quiz System 📝
- Timed quizzes
- MCQ format
- Auto-submit

### 5. AI Analysis 🤖
- Performance metrics
- Strengths/weaknesses
- Personalized recommendations
- Interactive chatbot

## 🐛 Quick Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB
mongod --dbpath C:\data\db
```

### Port Already in Use
```bash
# Kill port 5000 (backend)
npx kill-port 5000

# Kill port 3000 (frontend)
npx kill-port 3000
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error
```bash
# Make sure backend is running on port 5000
# Frontend proxy is configured in vite.config.js
```

## 📁 Important Files

### Configuration
- `backend/.env` - Environment variables
- `frontend/vite.config.js` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind settings

### Entry Points
- `backend/server.js` - Backend entry
- `frontend/src/main.jsx` - Frontend entry
- `frontend/src/App.jsx` - Main app component

### API Client
- `frontend/src/utils/api.js` - All API calls

### Auth
- `backend/middleware/auth.js` - JWT verification
- `frontend/src/context/AuthContext.jsx` - Auth state

## 🎯 Demo Script for Hackathon

### 1. Introduction (30 seconds)
"Placement Prep Starter is an AI-powered learning platform with a stunning glassmorphism UI, personalized learning paths, and intelligent performance analysis."

### 2. UI/UX Demo (1 minute)
- Show animated login page
- Demonstrate smooth transitions
- Highlight glassmorphism effects
- Show responsive design

### 3. User Flow Demo (2 minutes)
- Quick signup
- Background/branch selection
- Domain selection with animations
- Learning dashboard

### 4. Quiz System Demo (1 minute)
- Start a quiz
- Show timer and progress bar
- Answer questions
- Submit quiz

### 5. AI Analysis Demo (1 minute)
- Show results page
- Highlight AI metrics
- Demonstrate chatbot
- Show recommendations

### 6. Technical Stack (30 seconds)
"Built with React, Node.js, MongoDB, Tailwind CSS, and Framer Motion for a production-ready, scalable solution."

## 🏆 Winning Features

1. **Premium UI/UX** - Glassmorphism + animations
2. **Full-Stack** - Complete MERN implementation
3. **AI Integration** - Smart analysis engine
4. **Scalable** - Clean architecture, ready for production
5. **Secure** - JWT auth, input validation
6. **Responsive** - Works on all devices
7. **Fast** - Vite build, optimized queries
8. **Well-Documented** - Comprehensive docs

## 📊 Project Stats

- **Lines of Code**: ~3000+
- **Components**: 10+ React components
- **API Endpoints**: 12 RESTful APIs
- **Database Models**: 4 Mongoose schemas
- **Pages**: 7 main pages
- **Features**: 20+ features

## 🚀 Next Steps After Setup

1. ✅ Explore the UI
2. ✅ Create test account
3. ✅ Complete user flow
4. ✅ Take a quiz
5. ✅ Check AI analysis
6. ✅ Review code structure
7. ✅ Read documentation
8. ✅ Customize for your needs

## 💡 Customization Ideas

- Add more quiz questions
- Integrate real AI (OpenAI GPT)
- Add video tutorials
- Implement leaderboards
- Add social features
- Create mobile app
- Add email notifications
- Implement payment system

## 📞 Need Help?

- Check `README.md` for detailed setup
- Read `DOCUMENTATION.md` for architecture
- Review code comments
- Check console for errors

---

**Ready to win that hackathon! 🏆**

Good luck! 🚀
