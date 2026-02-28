# 🧪 API Testing Guide - Placement Prep Starter

## 📋 Table of Contents
1. [Setup](#setup)
2. [Authentication APIs](#authentication-apis)
3. [User Profile APIs](#user-profile-apis)
4. [Progress APIs](#progress-apis)
5. [Quiz APIs](#quiz-apis)
6. [Testing Tools](#testing-tools)

## 🚀 Setup

### Base URL
```
Local: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_JWT_TOKEN"
}
```

## 🔐 Authentication APIs

### 1. Signup
**Endpoint:** `POST /api/auth/signup`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response (201):**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Errors:**
- 400: Email already registered
- 400: Validation errors (invalid email, short password)

---

### 2. Login
**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "name": "John Doe",
    "background": "B.Tech",
    "branch": "CSE",
    "selectedDomains": ["AI", "Web"]
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Errors:**
- 401: Invalid credentials
- 400: Validation errors

---

### 3. Get Current User
**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "name": "John Doe",
    "background": "B.Tech",
    "branch": "CSE",
    "selectedDomains": ["AI", "Web"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Errors:**
- 401: Authentication required
- 401: Invalid token

---

## 👤 User Profile APIs

### 1. Get Profile
**Endpoint:** `GET /api/user/profile`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200):**
```json
{
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "name": "John Doe",
    "background": "B.Tech",
    "branch": "CSE",
    "selectedDomains": ["AI", "Web"]
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 2. Update Background
**Endpoint:** `PUT /api/user/background`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request:**
```json
{
  "background": "B.Tech"
}
```

**Response (200):**
```json
{
  "message": "Background updated",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "email": "john@example.com",
    "name": "John Doe",
    "background": "B.Tech"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/user/background \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"background": "B.Tech"}'
```

**Valid Values:** `B.Tech`, `B.Com`, `MBA`, `Degree`

---

### 3. Update Branch
**Endpoint:** `PUT /api/user/branch`

**Request:**
```json
{
  "branch": "CSE"
}
```

**Response (200):**
```json
{
  "message": "Branch updated",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "branch": "CSE"
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/user/branch \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"branch": "CSE"}'
```

---

### 4. Update Domains
**Endpoint:** `PUT /api/user/domains`

**Request:**
```json
{
  "domains": ["AI", "Web", "Data"]
}
```

**Response (200):**
```json
{
  "message": "Domains updated",
  "user": {
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "selectedDomains": ["AI", "Web", "Data"]
  }
}
```

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/user/domains \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domains": ["AI", "Web", "Data"]}'
```

---

## 📊 Progress APIs

### 1. Get All Progress
**Endpoint:** `GET /api/progress`

**Response (200):**
```json
{
  "progress": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
      "domain": "AI",
      "topic": "python-basics",
      "completed": false,
      "progress": 45,
      "lastAccessed": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/progress \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 2. Get Domain Progress
**Endpoint:** `GET /api/progress/:domain`

**Example:** `GET /api/progress/AI`

**Response (200):**
```json
{
  "progress": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "domain": "AI",
      "topic": "python-basics",
      "completed": false,
      "progress": 45
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "domain": "AI",
      "topic": "numpy-basics",
      "completed": true,
      "progress": 100
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/progress/AI \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 3. Update Progress
**Endpoint:** `POST /api/progress`

**Request:**
```json
{
  "domain": "AI",
  "topic": "python-basics",
  "progress": 75,
  "completed": false
}
```

**Response (200):**
```json
{
  "message": "Progress updated",
  "progress": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "domain": "AI",
    "topic": "python-basics",
    "completed": false,
    "progress": 75,
    "lastAccessed": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/progress \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "AI",
    "topic": "python-basics",
    "progress": 75,
    "completed": false
  }'
```

---

## 📝 Quiz APIs

### 1. Get Quiz
**Endpoint:** `GET /api/quiz/:domain/:topic`

**Example:** `GET /api/quiz/AI/python-basics`

**Response (200):**
```json
{
  "quiz": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "domain": "AI",
    "topic": "python-basics",
    "duration": 600,
    "questions": [
      {
        "question": "What is Python?",
        "options": [
          "Programming Language",
          "Snake",
          "Framework",
          "Database"
        ],
        "difficulty": "easy"
      }
    ]
  }
}
```

**Note:** Correct answers are NOT sent to frontend

**cURL:**
```bash
curl -X GET http://localhost:5000/api/quiz/AI/python-basics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 2. Submit Quiz
**Endpoint:** `POST /api/quiz/submit`

**Request:**
```json
{
  "quizId": "65a1b2c3d4e5f6g7h8i9j0k1",
  "answers": [
    { "selectedAnswer": 0 },
    { "selectedAnswer": 2 },
    { "selectedAnswer": 1 }
  ],
  "timeTaken": 450
}
```

**Response (200):**
```json
{
  "message": "Quiz submitted successfully",
  "result": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "quizId": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "domain": "AI",
      "topic": "python-basics"
    },
    "score": 4,
    "totalQuestions": 5,
    "percentage": 80,
    "timeTaken": 450,
    "strengths": [
      "Excellent understanding of core concepts",
      "Strong problem-solving skills"
    ],
    "weaknesses": [
      "Need more practice on complex problems"
    ],
    "confidenceScore": 85,
    "recommendations": [
      "Ready to move to advanced topics",
      "Consider taking on real-world projects"
    ],
    "completedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "answers": [
      {"selectedAnswer": 0},
      {"selectedAnswer": 2}
    ],
    "timeTaken": 450
  }'
```

---

### 3. Get All Results
**Endpoint:** `GET /api/quiz/results/all`

**Response (200):**
```json
{
  "results": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "quizId": {
        "domain": "AI",
        "topic": "python-basics"
      },
      "score": 4,
      "totalQuestions": 5,
      "percentage": 80,
      "completedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/quiz/results/all \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 4. Get Specific Result
**Endpoint:** `GET /api/quiz/results/:id`

**Example:** `GET /api/quiz/results/65a1b2c3d4e5f6g7h8i9j0k2`

**Response (200):**
```json
{
  "result": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "userId": "65a1b2c3d4e5f6g7h8i9j0k1",
    "quizId": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "domain": "AI",
      "topic": "python-basics"
    },
    "answers": [
      {
        "questionIndex": 0,
        "selectedAnswer": 0,
        "isCorrect": true
      }
    ],
    "score": 4,
    "totalQuestions": 5,
    "percentage": 80,
    "strengths": ["Core concepts", "Problem solving"],
    "weaknesses": ["Advanced topics"],
    "confidenceScore": 85,
    "recommendations": ["Practice more", "Review basics"]
  }
}
```

**cURL:**
```bash
curl -X GET http://localhost:5000/api/quiz/results/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🛠️ Testing Tools

### Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Placement Prep Starter API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:5000/api"
    },
    {
      "key": "token",
      "value": ""
    }
  ]
}
```

### Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new request
3. Set base URL: `http://localhost:5000/api`
4. Add Authorization header with token

### Browser Testing

Use browser console:

```javascript
// Login
const login = async () => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test@example.com',
      password: 'test123'
    })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
};

// Get profile
const getProfile = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/user/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return await response.json();
};
```

---

## 🧪 Test Scenarios

### Scenario 1: Complete User Journey
```bash
# 1. Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# 2. Login (save token)
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  | jq -r '.token')

# 3. Update background
curl -X PUT http://localhost:5000/api/user/background \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"background":"B.Tech"}'

# 4. Update domains
curl -X PUT http://localhost:5000/api/user/domains \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"domains":["AI","Web"]}'

# 5. Get quiz
curl -X GET http://localhost:5000/api/quiz/AI/python-basics \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 Response Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **401**: Unauthorized (auth required)
- **404**: Not Found
- **500**: Server Error

---

## 🔒 Security Notes

1. **Never expose JWT tokens** in logs or version control
2. **Use HTTPS** in production
3. **Validate all inputs** on both client and server
4. **Implement rate limiting** to prevent abuse
5. **Use environment variables** for sensitive data

---

**Happy Testing! 🧪**
