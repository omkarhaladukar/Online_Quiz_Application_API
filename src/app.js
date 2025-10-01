import express from 'express';

import { router as quizRouter } from "./routes/quiz.routes.js";


const app = express();

// routes declaration
app.use("/api/v1/users", quizRouter);

export default app;
