const http = require("http");


const server = http.createServer((req , res)=>{
   console.log("New Req Received.")

   res.end("Hello World")
});


server.listen(8000  , ()=>{
    console.log("Listening on port 8000")
})