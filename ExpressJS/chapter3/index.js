import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("05b783393c776a3ce088e68b43d35636d08e7d75eee6ec2163fd00e812fefded"))

app.get("/", (req,res) => {
    res.send("Hello World!")
});

app.get("/setCookies", (req,res) => {
    // res.cookie("token", "my-token", {maxAge:1000*60*60*24});
    res.cookie("age", "21" ,{signed:true})

    res.send("Cookies Set")
});

app.get("/getCookies", (req,res) => {
    console.log(req.signedCookies.age);
    console.log(req.cookies);
    // console.log(req.headers.cookie); 

   

    res.send("Cookies Set")
})

app.listen(3000,() => {
    console.log("Server is Running");
    
})