import express from "express";
import { Request } from "express";
import { Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./src/lib/dbConnect";
import { compilerRouter } from "./src/routes/compilerRouter";
import { userRouter } from "./src/routes/userRouter";
import cookieParser from "cookie-parser";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

config();
app.use("/compiler", compilerRouter);
app.use("/user", userRouter);
dbConnect();

app.listen(4000, () => {
  console.log("hello");
});
