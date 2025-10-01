Online Quiz Application API

Quiz API Documentation
## 1. Project Overview

The Quiz API is a RESTful API built with Node.js, Express, and MongoDB that allows users to:
Create quizzes with multiple-choice or text-based questions.
Add questions to quizzes, including specifying correct answers.
List all quizzes.
Retrieve quiz questions (without exposing correct answers).
Submit answers and calculate scores.
This API is designed for integration with web or mobile applications that need a quiz/assessment functionality.

## 2. Local Setup and Running the Project
## Prerequisites

Node.js v18+
MongoDB installed and running locally (or a MongoDB Atlas URI)
npm package manager
Postman (for testing API endpoints)

### Step 1: Clone the repository
git clone https://github.com/omkarhaladukar/Online_Quiz_Application_API.git
cd <your-repo-folder>

### Step 2: Install dependencies
npm install

### Step 3: Configure environment variables
Create a .env file in the root folder:
PORT=5000
MONGO_URI=mongodb://localhost:27017/quiz-api
Replace MONGO_URI with your MongoDB connection string.

### Step 4: Start the server
nodemon src/index.js
#or
node src/index.js

You should see:
✅ MongoDB connected
🚀 Server running on port 5000

Server is now running at:
http://localhost:5000

### 1. API Endpoints
use Postman or Thunder Client

### 1️⃣ Create a Quiz

Endpoint: POST /api/quizzes
Body (JSON):
{
  "title": "JavaScript Basics",
  "description": "Test your JS knowledge"
}


Response: Returns the quiz _id.

### 2️⃣ Add a Question with Correct Answers

Endpoint: POST /api/quizzes/:quizId/questions
Body (JSON):
{
  "text": "Which of the following are JavaScript frameworks?",
  "type": "multiple",
  "options": [
    { "text": "React" },
    { "text": "Angular" },
    { "text": "Laravel" }
  ],
  "correctOptions": ["React", "Angular"]
}


### 3️⃣ List All Quizzes

Endpoint: GET /api/quizzes
Response:
[
  {
    "_id": "64fab001",
    "title": "JavaScript Basics",
    "description": "Test your JS knowledge",
    "published": false
  }
]

### 4️⃣ Get Quiz Questions (Without Correct Answers)

Endpoint: GET /api/quizzes/:quizId/questions
Response: Each question shows _id, text, type, and options. Correct answers are hidden.

### 5️⃣ Submit Answers and Calculate Score

Endpoint: POST /api/quizzes/:quizId/submit
Body (JSON):
{
  "answers": [
    {
      "questionId": "<questionId>",
      "selectedOptionIds": ["<optionId1>", "<optionId2>"]
    },
    {
      "questionId": "<textQuestionId>",
      "textAnswer": "ECMAScript"
    }
  ]
}

Response:

{
  "status": 200,
  "data": {
    "score": 1,
    "total": 1,
    "submissionId": "64fxxxxxx"
  },
  "message": null
}