import express from "express";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser("a2e61ec83159dd76ec58ee65e14bd0a1228af46b0b87ced5f1740d2989b1ae89"))

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get('/set-cookies' , (req , res)=>{
    // res.cookie("token" , "my-token" , {maxAge:1000 * 60 * 60 * 24});
    res.cookie("age" , "21" , {signed:true})

    res.send("cookies set")
})


app.get("/get-cookies" , (req , res)=>{
    // console.log(req.cookies.token); // undefined
    console.log(req.signedCookies.age)
    // console.log(req.headers.cookie) // token=my-token

    res.send("cookies get")
})

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
