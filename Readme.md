Online Quiz Application API

Quiz API Documentation
## 1. Project Overview

The Quiz API is a RESTful API built with Node.js, Express, and MongoDB that allows users to:<br>
Create quizzes with multiple-choice or text-based questions.<br>
Add questions to quizzes, including specifying correct answers.<br>
List all quizzes.<br>
Retrieve quiz questions (without exposing correct answers).<br>
Submit answers and calculate scores.<br>
This API is designed for integration with web or mobile applications that need a quiz/assessment functionality.<br>

## Data modeling diagram(ERD)
![model](<WhatsApp Image 2025-10-02 at 12.54.59_779ba22b.jpg>)

## 2. Local Setup and Running the Project
## Prerequisites

Node.js v18+<br>
MongoDB installed and running locally (or a MongoDB Atlas URI)<br>
npm package manager<br>
Postman (for testing API endpoints)<br>

### Step 1: Clone the repository
\n git clone https://github.com/omkarhaladukar/Online_Quiz_Application_API.git<br>
cd your-repo-folder

### Step 2: Install dependencies
npm install

### Step 3: Configure environment variables
Create a .env file in the root folder:<br>
PORT=5000<br>
MONGO_URI=mongodb://localhost:27017/quiz-api<br>
Replace MONGO_URI with your MongoDB connection string.

### Step 4: Start the server
nodemon src/index.js
#or
node src/index.js

You should see:<br>
✅ MongoDB connected<br>
🚀 Server running on port 5000

Server is now running at:<br>
http://localhost:5000

### 1. API Endpoints
use Postman or Thunder Client

### 1️⃣ Create a Quiz

Endpoint: POST /api/quizzes<br>
Body (JSON):<br>
<br>
{<br>
  "title": "JavaScript Basics",<br>
  "description": "Test your JS knowledge"<br>
}<br>
<br>
Response: Returns the quiz _id.

### 2️⃣ Add a Question with Correct Answers

Endpoint: POST /api/quizzes/:quizId/questions<br>
Body (JSON):
<br>
{<br>
  "text": "Which of the following are JavaScript frameworks?",<br>
  "type": "multiple",<br>
  "options": [<br>
    { "text": "React" },<br>
    { "text": "Angular" },<br>
    { "text": "Laravel" }<br>
  ],<br>
  "correctOptions": ["React", "Angular"]<br>
}


### 3️⃣ List All Quizzes

Endpoint: GET /api/quizzes<br>
Response:
<br>
[<br>
  {<br>
    "_id": "64fab001",<br>
    "title": "JavaScript Basics",<br>
    "description": "Test your JS knowledge",<br>
    "published": false<br>
  }<br>
]

### 4️⃣ Get Quiz Questions (Without Correct Answers)

Endpoint: GET /api/quizzes/:quizId/questions<br>
Response: Each question shows _id, text, type, and options. Correct answers are hidden.

### 5️⃣ Submit Answers and Calculate Score

Endpoint: POST /api/quizzes/:quizId/submit<br>
Body (JSON):
<br>
{<br>
  "answers": [<br>
    {<br>
      "questionId": "<questionId>",<br>
      "selectedOptionIds": ["<optionId1>", "<optionId2>"]<br>
    },<br>
    {<br>
      "questionId": "<textQuestionId>",<br>
      "textAnswer": "ECMAScript"<br>
    }<br>
  ]<br>
}
<br>

Response:
<br>
{<br>
  "status": 200,<br>
  "data": {<br>
    "score": 1,<br>
    "total": 1,<br>
    "submissionId": "64fxxxxxx"<br>
  },<br>
  "message": null<br>
}<br>