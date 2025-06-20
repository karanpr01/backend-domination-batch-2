// * 1. How Promise is executed in the Event Loop in Node.js
// * code example
// console.log("1");

// setTimeout(() => {
//   console.log("2 - setTimeout");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("3 - Promise");
// });

// console.log("4");




// * 2. Difference between setTimeout and setImmediate
// *code example:

// setTimeout(() =>{
//     console.log("Set TimeOut");
// },0)

// setImmediate(() => {
//     console.log("I will run immediately");
    
// })


// * I/O operation like reading files always run setImmediate first

// const fs = require('fs');

// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log("Set Timeout under readfile");
//   }, 0);

//   setImmediate(() => {
//     console.log("I will run immediately under readfile");
//   });
// });





// * 3. Is req or res an Object or Array in Node.js?



// code example:

// const http = require('http');

// const server = http.createServer((req, res) => {
//   // Check if req and res are objects
//   console.log("Is req an array?", Array.isArray(req)); // false
//   console.log("Is res an array?", Array.isArray(res)); // false

//   console.log("Type of req:", typeof req); // 'object'
//   console.log("Type of res:", typeof res); // 'object'

//   // Accessing some object properties
//   console.log("Request Method:", req.method); // e.g., GET
//   console.log("Request URL:", req.url);       // e.g., /

//   // Sending response using res object
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('Hello, Prem! req and res are objects 🚀');
//   res.end();
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");
// });







