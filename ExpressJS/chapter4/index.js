import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(cookieParser("secert"));
app.use(session({
    secret: "mySecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24
    }
}))

app.get('/', (req,res) => {
    // console.log(req.session);
    // console.log(req.session.id);
    
    res.send("Hello World!")
});


app.get("/login", (req,res) => {
    req.session.user = {
        name: "Prem",
        email: "prem@gmail.com",
        age: 21
    }

    res.send(`login successfull ${JSON.stringify(req.session.user)}`)
});

app.get("/logout", (req, res) => {
    req.session.destroy()
    res.send("logout Successfull")
})

app.listen(3000,() =>{
    console.log("Server is Running");
    
})