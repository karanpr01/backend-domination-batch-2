const {Readable , Writable} = require("stream");


const readableStream = new Readable({
     objectMode: true,
    highWaterMark:2,
    read(){}
});



readableStream.on("data" , (chunk)=>{
    console.log('Data is coming' , JSON.stringify(chunk))
 
})


console.log(readableStream.push({name:"suraj" , age:21}))


// const writableStream = new Writable({
//     write(s){
//         console.log("Writing" , s.toString())
//     }
// })


