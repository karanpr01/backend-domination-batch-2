
const fs = require('fs');

fs.watch("example_file.txt", (eventType, filename) => {
  console.log("\nThe file", filename, "was modified!");
  console.log("The type of change was:", eventType);
});




// Changing the contents of the file 
setTimeout(
  () => fs.writeFileSync("example_file.txt", 
  "The file is modified"), 3000
);