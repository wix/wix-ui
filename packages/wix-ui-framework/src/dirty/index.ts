import path from 'path';
import dependencyTree from 'dependency-tree';

import { Components } from '../typings';

interface Params {
  rootPath: string;
  components: Components;
  changedFiles: string[];
}

export const dirty = async ({
  rootPath,
  components,
  changedFiles: changedFilesRaw,
}: Params): Promise<string[]> => {
  const visited = {};
  const changedFiles = changedFilesRaw.map((changedFilePath) =>
    path.resolve(changedFilePath),
  );

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

  const dirtyComponents = Object.entries(componentsWithDependencyList).reduce(
    (acc, [componentName, dependencies]) => {
      const isDirty = dependencies.some(
        (dependency) =>
          changedFiles.includes(dependency) ||
          changedFiles.some((changedFile) => {
            return changedFile.includes(
              path.resolve(components[componentName].path),
            );
          }),
      );
      if (isDirty) {
        acc.add(componentName);
      }
      return acc;
    },
    new Set<string>(),
  );

  return Array.from(dirtyComponents);
};
