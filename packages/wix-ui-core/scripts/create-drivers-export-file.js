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
  //const exportedDrivers = glob.sync('./src/components/**/*.driver.*').filter(p => !p.includes('.private'))
  const exportedDrivers = glob.sync(`./src/components/**/*.${pattern}.*`).filter(p => !p.includes('.private'))

  const exportNames = exportedDrivers.map(p => path.basename(p, '.ts'))
  const camelCasedExportNames = exportNames.map(n => toCamelCase(n.split('.').join('-')))
  
  const exportedDriversPaths = exportedDrivers.map(p => './' + path.join('dist',path.parse(p).dir, path.parse(p).name))
 
  const jsfilePath = `${fileName}.js `;
  const typeScriptFilePath =  `${fileName}.d.ts`; // created in the root of ui-core
  const jsFileContent = camelCasedExportNames.map((exportName, i) => `module.exports.${exportName} = require('${exportedDriversPaths[i]}');`).join('\n')
  const typeScriptFileContent = exportedDriversPaths.map(p =>`export * from '${p}';`).join('\n')
  
  fs.writeFileSync(jsfilePath, jsFileContent, (err) => {
      if (err) throw err;
      console.log("The js extansions file was succesfully saved!");
  }); 
  
  fs.writeFileSync(typeScriptFilePath, typeScriptFileContent, (err) => {
    if (err) throw err;
    console.log("The ts extansions file was succesfully saved!");
  }); 
};

// createExports('drivers', 'driver')
createExports('protractorDrivers', 'protractor.driver');