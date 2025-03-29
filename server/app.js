import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: "*"
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit : "16kb" }));
app.use(cookieParser());



//Import routes:
import authRouter from "./Routes/auth.routes.js";
import transactionRouter from "./Routes/transaction.routes.js";
import errorMiddleware from "./Middlewares/error.middleware.js"

//Endpoints:
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/transaction", transactionRouter);


//Error handler middleware:
app.use(errorMiddleware);


export default app;