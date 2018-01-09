const fse = require('fs-extra');
const [from, to] = process.argv.slice(2);

if (to && to !== '.' ) {
  fse.removeSync(to);
  fse.ensureDirSync(to);
}
fse.readdirSync(from)
  .filter(file => file.endsWith('.js'))
  .forEach(file => fse.writeFileSync(`${to}/${file}`, `module.exports = require('${from}/${file}');\n`));
