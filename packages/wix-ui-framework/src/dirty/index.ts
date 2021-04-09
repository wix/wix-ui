const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dependencyTree = require('dependency-tree');
const globby = require('globby');

const exec = (cmd) => execSync(cmd, { encoding: 'utf8' });
const [rootPathRaw, outputPathRaw] = process.argv.slice(2);

const rootPath = path.resolve(process.cwd(), rootPathRaw);
const outputPath = path.resolve(process.cwd(), outputPathRaw);
const allComponentsPath = path.resolve(
  rootPath,
  path.join('.wuf', 'components.json'),
);
const gitRootPath = exec('git rev-parse --show-toplevel').trim();

try {
  // clean up any builds from previous runs
  fs.unlinkSync(outputPath);
} catch (e) {}

const changedFiles = exec('git diff master --name-only')
  .trim()
  .split('\n')
  .map((p) => path.resolve(gitRootPath, p));

const components = require(allComponentsPath);

const shouldTestSubset = () => {
  const componentPaths = Object.entries(components).map(([, { path }]) => path);

  const areAllFilesComponents = changedFiles
    .filter((file) => file.includes('src/'))
    .every((file) =>
      componentPaths.some((p) => path.relative(rootPath, file).startsWith(p)),
    );

  return areAllFilesComponents;
};

// if changed files include a file which is not found in any of the component file trees
// then run all visual tests, not just a subset
//
// this is because those files may have an impact on visual tests.
// For example updating some theme can have impact on all components
if (!shouldTestSubset()) {
  process.exit();
}

const visited = {};
const getDependencies = (componentPath) => {
  const filename = require.resolve(path.resolve(rootPath, componentPath));
  return dependencyTree.toList({
    filename,
    directory: path.dirname(filename),
    visited,
    filter: (p) =>
      [
        ['.js', '.jsx', '.ts', '.tsx', '.st.css', '.scss'].some((extension) =>
          p.endsWith(extension),
        ),
        !p.includes('node_modules'),
        p !== path.resolve(rootPath, 'src/index.js'),
      ].every(Boolean),
  });
};

const componentsWithDependencyList = Object.entries(components).reduce(
  (acc, [componentName, { path: componentPath }]) => {
    acc[componentName] = getDependencies(componentPath);
    return acc;
  },
  {},
);

const componentsToTest = Object.entries(componentsWithDependencyList).reduce(
  (acc, [componentName, dependencies]) => {
    const shouldTest = dependencies.some((dependency) =>
      changedFiles.includes(dependency),
    );
    if (shouldTest) {
      acc.push(componentName);
    }
    return acc;
  },
  [],
);

(async () => {
  if (componentsToTest.length) {
    const absoluteComponentTestPaths = await componentsToTest.reduce(
      async (acc, componentName) => {
        const paths = await globby(
          path.resolve(
            rootPath,
            components[componentName].path,
            '**',
            '*.visual.js',
          ),
          { cwd: rootPath },
        );
        return [...(await acc), ...paths];
      },
      Promise.resolve([]),
    );

    const absoluteTestPaths = [
      ...changedFiles.filter((p) => p.includes('.visual.js')),
      ...absoluteComponentTestPaths,
    ];

    const relativeTestPaths = absoluteTestPaths.map((p) =>
      path.relative(path.dirname(allComponentsPath), p),
    );

    console.log('Will run a subset of these visual tests:');
    absoluteTestPaths.forEach((p) => console.log(path.relative(rootPath, p)));
    console.log('');

    // TODO: This is hackish, continuing with this approach we should use ejs template
    const output = `
const requires = [
${relativeTestPaths.map((p) => `require('${p}')`).join(',\n')}
];

requires.forEach(req => {
  if (typeof req.runTests === 'function') {
    req.runTests();
  }
})
  `.trim();

    fs.writeFileSync(outputPath, output, {
      encoding: 'utf8',
    });
  }
})();
