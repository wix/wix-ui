const path = require('path');
const diff = require('deep-diff');
const { fsToJson } = require('./dist/fs-to-json');
const { mapTree } = require('./dist/map-tree');

const wsrCwd = '../../../wix-style-react/src';

const wsrJson = fsToJson({
  cwd: wsrCwd,
  path: '.',
});

// const templateJson = fsToJson({
// cwd: '../../../wix-style-react/generator/templates/src/Component',
// path: '.',
// });

const mandatoryShape = {
  'index.js': '',
  'Component.js': '',
  // 'Component.meta.js': '',
  // 'Component.st.css': '',
  // 'Component.uni.driver.js': '',
  docs: { 'index.story.js': '' },
  // test: {
  // 'Component.e2e.js': '',
  // 'Component.spec.js': '',
  // 'Component.visual.js': '',
  // 'ComponentStories.js': '',
  // 'storySettings.js': '',
  // },
};

Promise.all([wsrJson]).then(([wsr]) => {
  const maxMissingFiles = 2;
  const totalConsiderableItems = Object.keys(wsr).length;

  const analyzedComponents = Object.keys(wsr)
    .map(componentName => {
      return {
        componentName,
        structure: wsr[componentName],
      };
    })

    // skip non folders at root level
    .filter(({ structure }) => structure !== '')

    .map(({ componentName, structure }) => {
      const replaceName = 'Component';

      const namedMandatoryShape = mapTree(mandatoryShape, ({ key, value }) => {
        const basename = path.basename(key);
        const match = basename.match(new RegExp(`^${replaceName}\\.(.*)`));

        if (match) {
          return { [`${componentName}.${match[1]}`]: value };
        }
      });

      const diffs = (diff(namedMandatoryShape, structure) || []).filter(
        ({ kind }) => kind === 'D',
      );

      const missingFiles = diffs.reduce((files, d) => {
        const rootPath = d.path.join('/');
        files.push(rootPath);

        if (d.lhs) {
          files.push(...Object.keys(d.lhs).map(p => [rootPath, p].join('/')));
        }

        return files;
      }, []);

      return {
        componentName,
        structure,
        missingFiles,
      };
    });

  const goodComponents = analyzedComponents.filter(
    ({ missingFiles }) => missingFiles.length === 0,
  );

  const nonComponents = analyzedComponents.filter(
    ({ missingFiles }) => missingFiles.length > 0,
  );

  console.log(`Mandatory structure:`);
  console.log(JSON.stringify(mandatoryShape, null, 2));

  console.log();
  console.log(`Valid components (${goodComponents.length}):\n`);

  goodComponents.map(({ componentName }) => {
    console.log(`<${componentName}>`);
  });

  console.log(
    `\n${
      goodComponents.length
    }/${totalConsiderableItems} folders are considered components. They miss no more than ${maxMissingFiles} files from template\n`,
  );

  console.log(`Invalid components (${nonComponents.length}):\n`);
  nonComponents.map(({ componentName, missingFiles }) => {
    console.log(
      `"src/${componentName}" is not a component, it lacks ${
        missingFiles.length
      } entries:\n`,
    );
    console.log(missingFiles.join('\n'), '\n');
    console.log('\n', '-'.repeat(50), '\n');
  });

  console.log(
    `${
      nonComponents.length
    }/${totalConsiderableItems} folders are not considered components. They miss more than ${maxMissingFiles} files from template`,
  );
});
