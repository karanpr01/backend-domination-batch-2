
const fs = require('fs');

fs.watch("example_file.txt", (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});



<<<<<<< HEAD
console.log(math.admin , math.pi , math.platFrom)
// If export as array it will show undefined.
=======

// Changing the contents of the file 
setTimeout(
  () => fs.writeFileSync("example_file.txt", 
  "The file is modified"), 3000
);
>>>>>>> upstream/main
