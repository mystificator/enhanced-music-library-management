import express from "express";
import * as dotenv from "dotenv";
import connectDB from './mongodb/connect.js';
import cors from 'cors';

import { userRouter } from './routes/userRoutes.js';
import { adminRouter } from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Hello there");
});

app.use("/", userRouter);
app.use("/users", adminRouter);

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>
            console.log("Server has started on port http://localhost:8080")
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
