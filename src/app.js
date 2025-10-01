import express from "express";
import dotenv from "dotenv";
import quizRoutes from "./routes/quiz.routes.js";
import { ApiError } from "./utils/ApiError.js";
import { ApiResponse } from "./utils/ApiResponse.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/quizzes", quizRoutes);

// Health check endpoint
app.get("/", (req, res) => {
    res.json(new ApiResponse(200, null, "Quiz API is running 🚀"));
});

// 404 handler
app.use((req, res, next) => {
    next(new ApiError(404, "Route not found"));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(" Error:", err);

    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json(new ApiResponse(err.statusCode, null, err.message));
    }

    res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
});

export default app;
