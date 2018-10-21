const path = require('path');
const fs = require('fs');
const glob = require('glob');

const exportedDrivers = glob.sync('./src/components/**/*.driver.*').filter(p => !p.includes('.private'))
const fileContent = exportedDrivers.map(p =>'export * from "' + path.dirname(p) + path.basename(p, '.ts') + '";\n').join('')
console.log(fileContent)
const filepath = "drivers.js"; // created in the root of ui-core

fs.writeFileSync(filepath, fileContent, (err) => {
    if (err) throw err;
    console.log("The extansions file was succesfully saved!");
}); 

