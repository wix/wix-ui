const path = require('path');
const fse = require('fs-extra');
const [from, to, indexPath] = process.argv.slice(2);

if (to && to !== '.' ) {
  fse.removeSync(to);
  fse.ensureDirSync(to);
}
fse.readdirSync(from)
  .filter(file => file.endsWith('.js'))
  .forEach(file => fse.writeFileSync(
    `${to}/${file}`,
    `module.exports = require('${path.relative(to, from)}/${file}');\n`
  ));

if (indexPath) {
  fse.writeFileSync(
    `${to}/index.js`,
    `module.exports = require('${path.relative(to, indexPath)}');\n`
  )
}
