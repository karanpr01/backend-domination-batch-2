import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
const app = express();

app.use(cookieParser("codesnippet"));

app.use(session(
    {
        secret:"mysecret",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:1000 * 60 * 60 * 24 // 1 day
        }
    }
))

app.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
  res.send("hello world");
});


app.get("/login" ,(req , res)=>{
    req.session.user = {
        name:"suraj",
        email:"suraj@example.com",
        age:21
    };

    res.json(`login successfull ${(req.session.user.name)}`)
})

app.get('/logout' , (req , res)=>{
    req.session.destroy();
    res.send("logout successfull")
})
app.listen(8080, () => {
  console.log("server is running on port 8080");
});
