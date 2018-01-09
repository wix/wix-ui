const fs = require('fs');
const [folder] = process.argv.slice(2);

fs.readdirSync(folder)
  .filter(file => file.endsWith('.js'))
  .forEach(file => fs.writeFileSync(file, `module.exports = require('${folder}/${file}');\n`));
