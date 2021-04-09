import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dependencyTree from 'dependency-tree';
import globby from 'globby';

import { Components } from '../typings';

const exec = (cmd: string) => execSync(cmd, { encoding: 'utf8' });
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

const components: Components = require(allComponentsPath);

const shouldTestSubset = () => {
  const componentPaths = Object.entries(components).map(
    ([, { path: componentPath }]) => componentPath,
  );

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
const getDependencies = (componentPath: string) => {
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

const componentsWithDependencyList: Record<string, string[]> = Object.entries(
  components,
).reduce((acc, [componentName, { path: componentPath }]) => {
  acc[componentName] = getDependencies(componentPath);
  return acc;
}, {});

const componentsToTest: Set<string> = Object.entries(
  componentsWithDependencyList,
).reduce((acc, [componentName, dependencies]) => {
  const shouldTest = dependencies.some(
    (dependency) =>
      changedFiles.includes(dependency) ||
      changedFiles.some((changedFile) =>
        changedFile.includes(path.resolve(components[componentName].path)),
      ),
  );
  if (shouldTest) {
    acc.add(componentName);
  }
  return acc;
}, new Set<string>());

(async () => {
  if (componentsToTest.size) {
    const absoluteComponentTestPaths = await Array.from(
      componentsToTest,
    ).reduce(async (acc, componentName) => {
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
    }, Promise.resolve([]));

    const absoluteTestPaths = Array.from(
      new Set([
        ...changedFiles.filter((p) => p.includes('.visual.js')),
        ...absoluteComponentTestPaths,
      ]),
    );

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

export default () => {};
