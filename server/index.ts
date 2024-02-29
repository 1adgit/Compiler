import express from "express";
import { Request } from "express";
import { Response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { dbConnect } from "./src/lib/dbConnect";
import { compilerRouter } from "./src/routes/compilerRouter";
const app = express();
app.use(express.json());
app.use(cors());
config();
app.use("/compiler", compilerRouter);
dbConnect();

app.listen(4000, () => {
  console.log("hello");
});
