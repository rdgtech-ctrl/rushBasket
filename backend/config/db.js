import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  await mongoose
    .connect(
      "mongodb+srv://dgmechpro200_db_user:greenblinkit568945@cluster0.9ihatpv.mongodb.net/green_blinkit",
    )
    .then(() => console.log("DB CONNECTED"));
};
