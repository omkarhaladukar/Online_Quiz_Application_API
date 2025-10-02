import { Quiz } from "../models/quiz.models.js";
import { Question } from "../models/question.models.js";
import { Submission } from "../models/submission.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


//Create a new quiz
export const createQuiz = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        throw new ApiError(400, "Title and description are required")
    }

    const quiz = await Quiz.create({ title, description });
    return res
        .status(201)
        .json(new ApiResponse(201, quiz, "Quiz created successfully"));
});


//Add a question to a quiz
import mongoose from "mongoose";

// Add a question to a quiz
export const addQuestion = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { text, type, options, correctOptions = [], correctAnswerText } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new ApiError(404, "Quiz not found");

    // Pre-generate ObjectIds for options
    const optionIds = options.map(() => new mongoose.Types.ObjectId());

    // Attach _id to each option
    const optionsWithIds = options.map((opt, index) => ({
        _id: optionIds[index],
        text: opt.text,
    }));

    // Map correctOptions text → ObjectIds
    const correctOptionIds = correctOptions.map((txt) => {
        const option = optionsWithIds.find((o) => o.text === txt);
        if (!option) throw new ApiError(400, `Correct option "${txt}" not found in options`);
        return option._id;
    });

    // Create question
    const question = await Question.create({
        quiz: quiz._id,
        text,
        type,
        options: optionsWithIds,
        correctOptions: correctOptionIds,
        correctAnswerText,
    });

    // Add question to quiz
    quiz.questions.push(question._id);
    await quiz.save();

    return res
        .status(201)
        .json(new ApiResponse(201, question, "Question added successfully"));
});


// Get all quizzes
export const getAllQuizzes = asyncHandler(async (req, res) => {
    const quizzes = await Quiz.find().select("title description published");
    return res.json(new ApiResponse(200, quizzes));
});

// Get all questions for a quiz (without correct answers)
export const getQuizQuestions = asyncHandler(async (req, res) => {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) throw new ApiError(404, "Quiz not found");

    const questions = quiz.questions.map((q) => ({
        _id: q._id,
        text: q.text,
        type: q.type,
        options: q.options.map((o) => ({ _id: o._id, text: o.text })), // hide correct answers
    }));

    return res.json(
        new ApiResponse(200, { quizId: quiz._id, title: quiz.title, questions })
    );
});

// Submit answers and calculate score
export const submitQuiz = asyncHandler(async (req, res) => {
    const { quizId } = req.params;
    const { answers } = req.body; // [{ questionId, selectedOptionIds, textAnswer }]

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) throw new ApiError(404, "Quiz not found");

    let score = 0;
    const total = quiz.questions.length;

    const answerRecords = quiz.questions.map((q) => {
        const userAnswer = answers.find(
            (a) => a.questionId.toString() === q._id.toString()
        );

        let isCorrect = false;

        if (q.type === "single" || q.type === "multiple") {
            const correctIds = q.correctOptions.map((id) => id.toString());
            const userIds = (userAnswer?.selectedOptionIds || []).map((id) =>
                id.toString()
            );

            isCorrect =
                correctIds.length === userIds.length &&
                correctIds.every((id) => userIds.includes(id));
        } else if (q.type === "text") {
            if (
                q.correctAnswerText &&
                userAnswer?.textAnswer?.trim().toLowerCase() ===
                q.correctAnswerText.trim().toLowerCase()
            ) {
                isCorrect = true;
            }
        }

        if (isCorrect) score++;

        return {
            question: q._id,
            selectedOptionIds: userAnswer?.selectedOptionIds || [],
            textAnswer: userAnswer?.textAnswer || null,
            isCorrect,
            points: isCorrect ? 1 : 0,
        };
    });

    const submission = await Submission.create({
        quiz: quiz._id,
        answers: answerRecords,
        score,
        total,
    });

    return res.json(
        new ApiResponse(200, { score, total, submissionId: submission._id })
    );
});
