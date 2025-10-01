import { Router } from "express";
import {
    createQuiz,
    addQuestion,
    getAllQuizzes,
    getQuizQuestions,
    submitQuiz,
} from "../controllers/quiz.controllers.js";

import { validateQuiz, validateQuestion } from "../middlewares/validation.middlewares.js";
import { validateRequest } from "../middlewares/validateRequest.middlewares.js";

const router = Router();

// Quiz management
router.post("/", validateQuiz, validateRequest, createQuiz);
router.post("/:quizId/questions", validateQuestion, validateRequest, addQuestion);

// Quiz listing
router.get("/", getAllQuizzes);

// Quiz taking
router.get("/:quizId/questions", getQuizQuestions);
router.post("/:quizId/submit", submitQuiz);

export default router;
