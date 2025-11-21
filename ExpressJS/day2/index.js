import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();

/* Golbal middlewares (req, res ,next )
const logger = (req,res,next) => {
    console.log(`Req-Method: ${req.method}, Req-Url: ${req.url}`);
    next()
}

app.use(logger)
*/

/* Specific Routes Middleware
const sayHello = (req,res,next) => {
    console.log(`Hello`);
    next()
}
*/


app.get("/" , (req, res) => {
    res.send("Welcome")
})

app.use("/api/v1/",userRouter)

/*
app.get("/about", sayHello, (req,res) => {
    res.send("About")
})

app.get("/contact", (req,res) => {
    res.send("Contact")
})
*/

app.listen(3000, () => {
    console.log("Server is Running✅ ");
})



// INbuilt MIddleware app.use(express.json())
// use cases of middleware ---> request ( modify , attach , update)
// 1. logger
// 2. authentication
// 3. authorization
// 4. error handling
// 5. compression