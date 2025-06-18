const fs = require("fs")

// async - non blocking
// sync - blocking 

//* read

// async
// fs.readFile("Nodejs/day-1/sample.txt" , "utf-8" , (err , data)=>{
//     if(err){
//         console.log(err)
//     }

//     console.log(data)
// })

// Sync
// const data = fs.readFileSync("Nodejs/day-1/sample.txt", "utf8")
// console.log(data);


//* write


// Sync
//  fs.writeFileSync("Nodejs/day-1/sample.txt" , "Hello world this is sample content")

// Async
// fs.writeFile("Nodejs/day-1/sample.txt" , "Hello world this is updated content using sync method" , (err)=>{
//     console.log(err)
// })


//* update

// Async
// fs.appendFile("Nodejs/day-1/sample.txt" , "\n I am new line" , (err)=>{
//     console.log(err)
// })

// Sync
// fs.appendFileSync("Nodejs/day-1/sample.txt", "\n I am New line Written using Sync Method")




//* delete


// Async
// fs.unlink("Nodejs/day-1/sample.txt" , (err)=>{
//     console.log(err)
// }) 


// * Writing a new file
// fs.writeFileSync("Nodejs/day-1/fs/sample.txt" , "Hello world this is new file")


// Sync
// fs.unlinkSync("Nodejs/day-1/fs/sample.txt")


// * Rename

// Async
// fs.rename("Nodejs/day-1/fs/sample.txt","Nodejs/day-1/fs/samplenew.txt", (err) =>{
//     if (err) throw err
// })

// Sync
// fs.renameSync("Nodejs/day-1/fs/samplesync.txt","Nodejs/day-1/fs/a.txt")



// * Copy File

// Async
// fs.copyFile("Nodejs/day-1/fs/a.txt","Nodejs/day-1/fs/b.txt", (err) => {
//     if(err) throw err
// })

// Sync
// fs.copyFileSync("Nodejs/day-1/fs/a.txt","Nodejs/day-1/fs/c.txt")

// * Deleting the copy file

// fs.unlinkSync("Nodejs/day-1/fs/b.txt")
// fs.unlinkSync("Nodejs/day-1/fs/c.txt")



//!  DIRECTORY OPERATIONS

// * Create a Directory

// Async
// fs.mkdir('myFolder', { recursive: true }, (err) => {
//   if (err) throw err;
// });

// Sync
// fs.mkdirSync('Nodejs/day-1/myFolder', { recursive: true });
// If directory exists it will throw an error unless we set  { recursive: true }

//* Read Directory

// Async
// fs.readdir('Nodejs', (err, files) => {
//   if (err) throw err;
//   console.log(files);
// });

// Sync
// const files = fs.readdirSync('Nodejs/day-1');
// console.log(files);


// * Remove Directory with files

// Async (modern)
// fs.rm('myFolder', { recursive: true, force: true }, (err) => {
//   if (err) throw err;
// });
// Removed directory create on line 98 with a file inside it title sample.txt

// Sync
// fs.rmSync('Nodejs/day-1/myFolder', { recursive: true, force: true });
//  Removed directory create on line 103 with a file inside it title sample.txt


// * FILE INFO (STATISTICS)

// Async
// fs.stat('Nodejs/day-1', (err, stats) => {
//   if (err) throw err;
//   console.log(stats.isFile(), stats.size);
// });
// It's return false because "Nodejs/day-1" is folder not a file

//  Sync
// const stats = fs.statSync('Nodejs/day-1/fs/a.txt');
// console.log(stats.isFile(), stats.size);


// *  WATCHING FILES

// fs.watch('Nodejs/day-1/fs/a.txt', (eventType, filename) => {
//   console.log(`Event: ${eventType} on file: ${filename}`);
// });
// It is watching the file and if any changes happend in file like edit,renaming,saving it will tiggered a callback.

//* fs Promises

const fsPromises = require('fs').promises;

async function read() {
  const data = await fsPromises.readFile('Nodejs/day-1/fs/a.txt', 'utf8');
  console.log(data);
}
read();

// The code imports the fs module's promise-based API, then defines an async function that uses await to read the content of the a.txt file. When the function is called, it reads the file and prints its content to the console.