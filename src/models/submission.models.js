import mongoose from "mongoose";

const { Schema } = mongoose;


const AnswerRecordSchema = new Schema(
    {
        question: {
            type: Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },
        selectedOptionIds: [
            {
                type: Schema.Types.ObjectId
            }],           // for choice questions
        textAnswer: {
            type: String,
            trim: true,
            maxlength: 1000
        },                 // for text questions
        isCorrect: {
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default: 0
        },
    },
    { _id: false }
);

const SubmissionSchema = new Schema(
    {
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
            required: true
        },
        answers: {
            type: [AnswerRecordSchema],
            default: []
        },
        score: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        takenAt: {
            type: Date,
            default: Date.now
        },
        takenBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }, 
    },
    { timestamps: true }
);

export const Submission = mongoose.model("Submission", SubmissionSchema);
