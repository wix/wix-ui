const path = require('path');
const fs = require('fs');
const regexp = /\.bundle\.min\.js$/;
const bundlePath = path.resolve('dist/statics');

if (fs.existsSync(bundlePath)) {
  fs
    .readdirSync(bundlePath)

    .map(name => [name, path.resolve(bundlePath, name)])

    .filter(([name]) =>
      name.match(regexp)
    )

    .map(([name, absolutePath]) => {
      const componentPath = path.relative('./', absolutePath);

      return [
        `./${name.replace(regexp, '')}.js`,
        fs.readFileSync(componentPath, 'utf-8')
      ];
    })

    .map(([path, source]) =>
      fs.writeFileSync(path, source));
}