import express from "express";
import * as dotenv from "dotenv";
import connectDB from './mongodb/connect.js';
import cors from 'cors';

import { userRouter } from './routes/userRoutes.js';
import { adminRouter } from "./routes/adminRoutes.js";
import { artistRouter } from "./routes/artistRoutes.js";
import { albumRouter } from "./routes/albumRoutes.js";
import { trackRouter } from "./routes/trackRoutes.js";
import { favoriteRouter } from "./routes/favoriteRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.send("Hello there");
});

app.use("/", userRouter);
app.use("/users", adminRouter);
app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/favorites", favoriteRouter);

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
