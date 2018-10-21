const path = require('path');
const fs = require('fs');
const glob = require('glob');

function toCamelCase( str ){
  str= str[0].toLowerCase() + str.slice(1)
  return str.replace(/-([a-z])/g, function (m, w) {
    return w.toUpperCase();
  });
}

function createExports(fileName, pattern){
  
}

const exportedDrivers = glob.sync('./src/components/**/*.driver.*').filter(p => !p.includes('.private'))

const exportNames = exportedDrivers.map(p => path.basename(p, '.ts'))
const camelCasedExportNames = exportNames.map(n => toCamelCase(n.split('.').join('-')))

const trimmedExportedDriversPaths = exportedDrivers.map(p => './' + path.join('dist',path.parse(p).dir, path.parse(p).name))

const jsFileContent = camelCasedExportNames.map((exportName, i) => `module.exports.${exportName} = require('${trimmedExportedDriversPaths[i]}');`).join('\n')

const typeScriptFileContent = trimmedExportedDriversPaths.map(p =>`export * from '${p}';`).join('\n')


const jsfilePath = "drivers.js"
const typeScriptFilePath = "drivers.d.ts"; // created in the root of ui-core

fs.writeFile(jsfilePath, jsFileContent, (err) => {
    if (err) throw err;
    console.log("The extansions file was succesfully saved!");
}); 

fs.writeFileSync(typeScriptFilePath, typeScriptFileContent, (err) => {
  if (err) throw err;
  console.log("The second extansions file was succesfully saved!");
}); 

