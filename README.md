# 🚀 Placement Prep Starter - AI-Powered Learning Platform

A hackathon-winning full-stack web application for placement preparation with AI-powered analysis, built with React, Node.js, MongoDB, and modern UI/UX design.

## ✨ Features

### 🎨 Frontend Features
- **Glassmorphism UI** with gradient backgrounds and dark mode
- **Smooth Animations** using Framer Motion
- **Responsive Design** for all devices
- **JWT Authentication** with protected routes
- **Interactive Dashboards** with progress tracking
- **Real-time Quiz System** with timer and auto-submit
- **AI Chatbot Interface** for personalized feedback

### 🔧 Backend Features
- **RESTful API** with Express.js
- **MongoDB Database** with Mongoose ODM
- **JWT Authentication** for secure access
- **MVC Architecture** for clean code organization
- **Input Validation** and error handling
- **AI Analysis Engine** for quiz results

## 📁 Project Structure

```
placement-prep-starter/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── userController.js     # User profile management
│   │   ├── progressController.js # Learning progress tracking
│   │   └── quizController.js     # Quiz and AI analysis
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── LearningProgress.js   # Progress tracking schema
│   │   ├── Quiz.js               # Quiz schema
│   │   └── QuizResult.js         # Quiz results schema
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   ├── user.js               # User routes
│   │   ├── progress.js           # Progress routes
│   │   └── quiz.js               # Quiz routes
│   ├── middleware/
│   │   └── auth.js               # JWT verification middleware
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx    # Route protection
    │   ├── context/
    │   │   └── AuthContext.jsx       # Global auth state
    │   ├── pages/
    │   │   ├── Login.jsx             # Login page
    │   │   ├── Signup.jsx            # Signup page
    │   │   ├── BackgroundSelection.jsx
    │   │   ├── BranchSelection.jsx
    │   │   ├── DomainSelection.jsx
    │   │   ├── LearningModule.jsx    # Learning dashboard
    │   │   ├── Quiz.jsx              # Quiz interface
    │   │   └── Results.jsx           # AI analysis & chatbot
    │   ├── utils/
    │   │   └── api.js                # API client
    │   ├── App.jsx                   # Main app component
    │   ├── main.jsx                  # React entry point
    │   └── index.css                 # Global styles
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone the Repository
```bash
cd c:\Users\MSI C C\Desktop\place
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and JWT secret
# Default values are already set for local development

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### Step 4: MongoDB Setup

**Option A: Local MongoDB**
```bash
# Make sure MongoDB is running locally
# Default connection: mongodb://localhost:27017/placement-prep
```

**Option B: MongoDB Atlas**
```bash
# Update backend/.env with your Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/placement-prep
```

## 🚀 Usage Guide

### 1. Authentication
- Navigate to `http://localhost:3000`
- Sign up with email and password
- Login to access the platform

### 2. Profile Setup
- **Background Selection**: Choose B.Tech, B.Com, MBA, or Degree
- **Branch Selection**: Select your specialization
- **Domain Selection**: Pick learning domains (AI, Web Dev, Data Science, etc.)

### 3. Learning Journey
- View personalized learning modules
- Track progress with visual indicators
- Start modules to begin learning

### 4. Quiz System
- Take timed MCQ quizzes
- Real-time progress tracking
- Auto-submit on timeout

### 5. AI Analysis
- View detailed performance metrics
- Get AI-powered recommendations
- Chat with AI assistant for personalized guidance

## 🎨 UI/UX Features

### Design Elements
- **Glassmorphism Cards**: Frosted glass effect with backdrop blur
- **Gradient Backgrounds**: Animated gradient backgrounds
- **Neon Borders**: Glowing borders on selected elements
- **Smooth Transitions**: Page and component animations
- **Dark Mode**: Default dark theme with neon accents

### Color Palette
- Primary: Purple (#6366f1)
- Secondary: Pink (#ec4899)
- Accent: Cyan (#06b6d4)
- Background: Dark gradients

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/background` - Update background
- `PUT /api/user/branch` - Update branch
- `PUT /api/user/domains` - Update selected domains

### Learning Progress
- `GET /api/progress` - Get all progress
- `GET /api/progress/:domain` - Get domain progress
- `POST /api/progress` - Update progress

### Quiz
- `GET /api/quiz/:domain/:topic` - Get quiz
- `POST /api/quiz/submit` - Submit quiz
- `GET /api/quiz/results/all` - Get all results
- `GET /api/quiz/results/:id` - Get specific result

## 🧪 Testing

### Test User Credentials
```
Email: test@example.com
Password: test123
```

### Sample API Requests

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Quiz:**
```bash
curl -X GET http://localhost:5000/api/quiz/AI/python-basics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔄 Database Models

### User Model
```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  background: String (B.Tech, B.Com, MBA, Degree),
  branch: String,
  selectedDomains: [String]
}
```

### LearningProgress Model
```javascript
{
  userId: ObjectId,
  domain: String,
  topic: String,
  completed: Boolean,
  progress: Number (0-100),
  lastAccessed: Date
}
```

### Quiz Model
```javascript
{
  domain: String,
  topic: String,
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    difficulty: String
  }],
  duration: Number
}
```

### QuizResult Model
```javascript
{
  userId: ObjectId,
  quizId: ObjectId,
  answers: [{
    questionIndex: Number,
    selectedAnswer: Number,
    isCorrect: Boolean
  }],
  score: Number,
  percentage: Number,
  strengths: [String],
  weaknesses: [String],
  confidenceScore: Number,
  recommendations: [String]
}
```

## 🎯 Future Enhancements

- [ ] OpenAI GPT integration for real AI analysis
- [ ] Video learning modules
- [ ] Peer-to-peer learning
- [ ] Leaderboards and achievements
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Social authentication (Google, GitHub)
- [ ] Advanced analytics dashboard

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# For local: mongod --dbpath /path/to/data
# For Atlas: Verify connection string in .env
```

### Port Already in Use
```bash
# Backend (5000)
# Kill process: npx kill-port 5000

# Frontend (3000)
# Kill process: npx kill-port 3000
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT License - Feel free to use this project for learning and hackathons!

## 👨‍💻 Author

Built with ❤️ for hackathons and placement preparation

## 🙏 Acknowledgments

- Tailwind CSS for amazing utility classes
- Framer Motion for smooth animations
- Lucide React for beautiful icons
- MongoDB for flexible database
- Express.js for robust backend

---

**Happy Learning! 🚀**
