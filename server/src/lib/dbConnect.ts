import mongoose from "mongoose";
export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "Compiler",
    });
    console.log("connection established");
  } catch (error) {
    console.log("error occured");
  }
};
