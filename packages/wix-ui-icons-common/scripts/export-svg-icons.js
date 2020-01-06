const path = require('path');
const fse = require('fs-extra');
const optimizeSvg = require('svg2react-icon/src/lib/svg-optimizer');

const [from, to] = process.argv.slice(2);

fse.ensureDirSync(to);
fse.readdirSync(from)
  .filter(file => path.extname(file) === '.svg')
  .forEach(async file => {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);
    const svgData = fse.readFileSync(fromPath, 'utf-8');
    const optimizedSvgData = await optimizeSvg(svgData, true);

    fse.writeFileSync(toPath, optimizedSvgData, 'utf-8');
  });
