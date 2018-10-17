const path = require('path');
const fs = require('fs');

module.exports = ()=> {
  const componentsPath = path.resolve('dist', 'components/');

  if (fs.existsSync(componentsPath)) {
    fs
      .readdirSync(componentsPath)
      .map(name => [name, path.resolve(componentsPath, name)])
      .filter(([, absolutePath]) =>
        fs.lstatSync(absolutePath).isDirectory() && fs.readdirSync(absolutePath).includes('.driver')
      )
      .map(([name, absolutePath]) => {
        const componentPath = path.relative('./', absolutePath);
        const files = [
          {path: `./${name}.js`, source: `module.exports = require('./${componentPath}');\n`},
        ];
        return files;
      })
      .map(files => files.forEach(({path, source}) => {
        fs.writeFileSync(path, source);
      }));
  }
};


function importComponentDriverPath(componentPath){
  
};
