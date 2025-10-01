import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log(" MongoDB connected");

        // Start server
        const server = app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });

        // Handle server errors
        server.on("error", (err) => {
            console.error(" Server Error:", err);
            process.exit(1);
        });

    } catch (err) {
        console.error(" MONGODB CONNECTION FAILED:", err.message);
        process.exit(1);
    }
};

startServer();
