import express from "express"
import dotenv from "dotenv";

import publicRoutes from "./routers/public.routes.js"
import privateRoutes from "./routers/private.routes.js"

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();



app.get("/" , (req , res)=>{
    res.send("Welcome to logger api🔥")
})

app.use("/api/v1/public" , publicRoutes)
app.use("/api/v1/private" , privateRoutes)


app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})