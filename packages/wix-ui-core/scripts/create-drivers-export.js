const path = require('path');
const fs = require('fs');
const glob = require('glob');

function filterExports(exportPath,pattern){
  const compName = path.parse(exportPath).name.split('.')[0]; // Gets the component name from the driver path.
  return !exportPath.includes('.private') && (path.parse(exportPath).name).includes(compName + pattern); // Private drivers are not exposed.
};

function writeToExportsFile(filePathm, fileContent){
  fs.writeFileSync(filePathm, fileContent, (err) => {
    if (err) throw err;
  }); 
};

function createExports(fileName, pattern){
  const driversDir = './drivers';
  !fs.existsSync(driversDir) && fs.mkdirSync(driversDir); // Creates the drivers folder in the root of ui-core

  const compDirPath = './src/components/**/*.driver.*'; // The path for ui-core components.
  const exportedDrivers = glob.sync(compDirPath).filter(exportPath => filterExports(exportPath,pattern));
  const formattedExportedDrivers = exportedDrivers.map(p => './' + path.join('dist',path.parse(p).dir, path.parse(p).name));
  
  const jsCommonfilePath = `${driversDir}/${fileName}.js`;
  const jsCommonFileContent = `module.exports = {${formattedExportedDrivers.map(exportPath => `...require('${exportPath}')`).join(',\n')}};`
  writeToExportsFile(jsCommonfilePath, jsCommonFileContent);
  
  const typeScriptFilePath =  `${driversDir}/${fileName}.d.ts`; 
  const typeScriptFileContent = formattedExportedDrivers.map(exportPath =>`export * from '${exportPath}';`).join('\n');
  writeToExportsFile(typeScriptFilePath, typeScriptFileContent);
};

createExports('drivers', '.driver');
createExports('protractorDrivers', '.protractor.driver');