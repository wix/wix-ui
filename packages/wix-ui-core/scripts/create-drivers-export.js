const path = require('path');
const fs = require('fs');
const glob = require('glob');

const filterExports = pattern => exportPath => {
  const compName = path.parse(exportPath).name.split('.')[0]; // Gets the component name from the driver path.
  return !exportPath.includes('.private') && (path.parse(exportPath).name).includes(compName + pattern); // Private drivers are not exposed.
};

const throwOnError = (err) => {
  if (err) throw err;
};

const createExports = (fileName, pattern) => {
  const driversDir = './drivers';
  !fs.existsSync(driversDir) && fs.mkdirSync(driversDir); // Creates the drivers folder in the root of ui-core

  const compDirPath = './src/components/**/*.driver.*'; // The path for ui-core components.
  const exportedDrivers = glob.sync(compDirPath).filter(filterExports(pattern));
  const formattedExportedDrivers = exportedDrivers.map(p => './' + path.join('dist',path.parse(p).dir, path.parse(p).name)); // Formatting the path to a module require path pattern.
  
  const jsCommonFileContent = `module.exports = {${formattedExportedDrivers.map(exportPath => `...require('${exportPath}')`).join(',\n')}};`
  fs.writeFileSync(`${driversDir}/${fileName}.js`, jsCommonFileContent, throwOnError);

  const typeScriptFileContent = formattedExportedDrivers.map(exportPath =>`export * from '${exportPath}';`).join('\n');
  fs.writeFileSync(`${driversDir}/${fileName}.d.ts`, typeScriptFileContent, throwOnError);
};

createExports('drivers', '.driver');
createExports('protractorDrivers', '.protractor.driver');