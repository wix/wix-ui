const path = require('path');
const fse = require('fs-extra');
const SVGO = require('svgo');

const [from, to] = process.argv.slice(2);
const svgo = new SVGO({
  plugins: [
    { removeViewBox: false },
    { removeStyleElement: true },
    { removeScriptElement: true },
    { cleanupIDs: false },
    { removeAttrs: { attrs: '(stroke|fill)' } },
    { convertPathData: false },
  ],
});

fse.ensureDirSync(to);
fse.readdirSync(from)
  .filter(file => path.extname(file) === '.svg')
  .forEach(async file => {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);
    const svgData = fse.readFileSync(fromPath, 'utf-8');
    const { data: optimizedSvgData } = await svgo.optimize(svgData);

    fse.writeFileSync(toPath, optimizedSvgData, 'utf-8');
  });
