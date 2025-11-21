import express from "express";
import dotenv from "dotenv";

import publicRoutes from "./routers/public.routes.js";
import privateRoutes from "./routers/private.routes.js";

dotenv.config();

const port = process.env.PORT || 8000

const app = express();

app.get("/", (req,res) => {
    res.send("Welcom to logger api👋 ")
})

app.use("/api/v1/public", publicRoutes )
app.use("/api/v1/private", privateRoutes )

app.listen(port, () => {
    console.log("Server is Running✅ ");
    console.log("Server is Running on", port);
    
})