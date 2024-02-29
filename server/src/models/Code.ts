import mongoose from "mongoose";

interface iCodeSchema {
  fullCode: {
    html: string;
    css: string;
    javascript: string;
  };
}

const CodeSchema = new mongoose.Schema<iCodeSchema>({
  fullCode: {
    html: String,
    css: String,
    javascript: String,
  },
});
export const Code = mongoose.model("Code", CodeSchema);
