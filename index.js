import express from "express";
import * as dotenv from "dotenv";

import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    res.send("Hello there");
});

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
