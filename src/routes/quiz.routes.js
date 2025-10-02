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

router.post("/", validateQuiz, validateRequest, createQuiz);
router.post("/:quizId/questions", validateQuestion, validateRequest, addQuestion);


router.get("/", getAllQuizzes);

router.get("/:quizId/questions", getQuizQuestions);
router.post("/:quizId/submit", submitQuiz);

export default router;
