import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/user.routes.js"
import privateRoutes from "./routes/private.routes.js"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));


  app.use("/auth" , authRoutes)
  app.use("/private" , privateRoutes)

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });