import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 8000

const app = express();

app.get("/", (req,res) => {
    res.send("Welcom to logger api👋 ")
})

app.listen(port, () => {
    console.log("Server is Running✅ ");
    console.log("Server is Running on", port);
    
})