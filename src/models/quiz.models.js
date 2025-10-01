import mongoose from "mongoose";

const { Schema } = mongoose;

const QuizSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 300
        },
        description: {
            type: String,
            trim: true,
            maxlength: 2000
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question"
            }
        ],
        published: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", QuizSchema);
