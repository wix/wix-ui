const path = require("path");
const fse = require("fs-extra");
const [from, to, indexPath] = process.argv.slice(2);

if (to && to !== ".") {
  fse.removeSync(to);
  fse.ensureDirSync(to);
}
fse
  .readdirSync(from)
  .filter(file => file.endsWith(".js"))
  .forEach(file => {
    const fileName = file.split(".").shift();
    const tsFile = `${fileName}.d.ts`;
    fse.writeFileSync(
      `${to}/${tsFile}`,
      [
        `export * from './${path.relative(to, from)}/${fileName}';`,
        `import defaultExport from './${path.relative(to, from)}/${fileName}';`,
        `export default defaultExport`
      ].join("\n")
    );

    return fse.writeFileSync(
      `${to}/${file}`,
      `module.exports = require('./${path.relative(to, from)}/${file}');\n`
    );
  });

if (indexPath) {
  fse.writeFileSync(
    `${to}/index.js`,
    `module.exports = require('./${path.relative(to, indexPath)}');\n`
  );
}
