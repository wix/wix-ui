const path = require('path');
const fse = require('fs-extra');
const [from, to] = process.argv.slice(2);

fse.ensureDirSync(to);
fse.readdirSync(from)
  .filter(file => path.extname(file) === '.svg')
  .forEach(file => fse.copySync(path.join(from, file), path.join(to, file)));
