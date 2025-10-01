import { body, check } from "express-validator";

// Validate quiz creation
export const validateQuiz = [
    body("title")
        .notEmpty().withMessage("Quiz title is required")
        .isLength({ max: 300 }).withMessage("Title max length 300 chars"),
    body("description")
        .optional()
        .isLength({ max: 2000 }).withMessage("Description max length 2000 chars"),
];

// Validate question creation
export const validateQuestion = [
    body("text")
        .notEmpty().withMessage("Question text is required")
        .isLength({ max: 1000 }).withMessage("Text max length 1000 chars"),

    body("type")
        .isIn(["single", "multiple", "text"]).withMessage("Invalid question type"),

    // Choice questions: must have at least 2 options
    check("options").custom((options, { req }) => {
        if (["single", "multiple"].includes(req.body.type)) {
            if (!options || options.length < 2) {
                throw new Error("Choice questions must have at least 2 options");
            }
        }
        return true;
    }),

    // Correct options validation
    check("correctOptions").custom((correctOptions, { req }) => {
        if (["single", "multiple"].includes(req.body.type)) {
            if (req.body.type === "single" && correctOptions.length !== 1) {
                throw new Error("Single choice must have exactly 1 correct option");
            }
        }
        return true;
    }),

    // Text question: answer length max 300
    check("correctAnswerText").custom((val, { req }) => {
        if (req.body.type === "text" && val && val.length > 300) {
            throw new Error("Text answer must be <= 300 chars");
        }
        return true;
    }),
];
