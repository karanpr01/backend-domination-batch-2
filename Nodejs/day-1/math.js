const pi = 3.14
const admin = "Prem"
const platFrom = "CodeSnippet"

module.exports = {pi,admin,platFrom}

// We cannot export it as array because when we export an array,we are exporting  values only not in key/vlaue pair. When other file import it will treat data as array not as object so we cannot access the value like data.pi or data.admin they are just values not named properties
// module.exports = [pi,admin,platFrom]






// *Nodejs warpper
// (function (exports, require, module, __filename, __dirname) {
// });
