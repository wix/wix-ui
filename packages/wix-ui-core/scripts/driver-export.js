const path = require('path');
const fs = require('fs');
const glob = require('glob');

const getCompName = (exportPath) => {
  return path.parse(exportPath).name.split('.')[0]; 
};

const filterExports = pattern => exportPath => {
  return !exportPath.includes('.private') && (path.parse(exportPath).name).includes(getCompName(exportPath) + pattern); // Private drivers are not exposed.
};

const throwOnError = (err) => {
  if (err) throw err;
};

const createDriversFolder = (driversDir) => {
  !fs.existsSync(driversDir) && fs.mkdirSync(driversDir); 
};

module.exports = (outputFile, pattern) => {
  const driversDir = './drivers';
  createDriversFolder(driversDir);

  const compDirPath = './src/components/**/*.driver.*'; // The path for ui-core components.
  const exportedDrivers = glob.sync(compDirPath).filter(filterExports(pattern));
  const formattedExportedDrivers = exportedDrivers.map(p => './../' + path.join('dist',path.parse(p).dir, path.parse(p).name)); // Formatting the path to a module require path pattern.
  
  const jsCommonFileContent = `module.exports = {${formattedExportedDrivers.map(exportPath => `...require('${exportPath}')`).join(',\n')}};`
  fs.writeFileSync(`${driversDir}/${outputFile}.js`, jsCommonFileContent, throwOnError);

  const typeScriptFileContent = formattedExportedDrivers.map(exportPath =>`export * from '${exportPath}';`).join('\n');
  fs.writeFileSync(`${driversDir}/${outputFile}.d.ts`, typeScriptFileContent, throwOnError);
};