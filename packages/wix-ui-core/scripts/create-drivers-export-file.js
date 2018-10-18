const path = require('path');
const fs = require('fs');
const glob = require('glob');

const fileContent = glob.sync('./src/components/**/**.driver.*').map(p => 'export * from "' + p.replace(p.slice(p.lastIndexOf('.')),'') + '";\n').join('')
console.log(fileContent)
const filepath = "drivers.js";

fs.writeFile(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log("The file was succesfully saved!");
}); 
