import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import connectDB from './db/index.js';
import app from './app.js';

connectDB()
    .then(() => {
        app.on("error", (err) => {
            console.log("ERROR:", err);
            throw err;
        });
        app.listen(process.env.PORT || 5000, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MONGODB CONNECTION FAILED:", err);
    });