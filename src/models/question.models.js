import mongoose from "mongoose";

const { Schema } = mongoose;


const OptionSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300
        },
    },
    { _id: true }
);

const QuestionSchema = new Schema(
    {
        quiz: {
            type: Schema.Types.ObjectId,
            ref: "Quiz",
            required: true
        },
        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000
        },
        type: {
            type: String,
            enum: ["single", "multiple", "text"],
            required: true,
        },
        options: {
            type: [OptionSchema],
            default: []
        },
        correctOptions: [
            {
                type: Schema.Types.ObjectId
                // refs option._id
            }],
        correctAnswerText: {
            type: String,
            trim: true,
            maxlength: 300
        },      // for text type
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", QuestionSchema);
