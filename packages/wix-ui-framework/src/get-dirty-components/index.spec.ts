import { getDirtyComponents } from '.';
import path from 'path';
import cista from 'cista';
import { GitTestkit } from '../../test/git-testkit';
import { getChangedFiles } from '../get-changed-files';

describe('getDirtyComponents', () => {
  it('sanity', async () => {
    expect(
      await getDirtyComponents({
        rootPath: '.',
        components: {},
        changedFiles: [],
      }),
    ).toEqual([]);
  });

  it('should return empty list when no dirty components found', async () => {
    const fakeFs = cista({
      './src/Component/Component.js': 'require("../AnotherComponent")',
      './src/Component/index.js': 'require("./Component.js")',
      './src/AnotherComponent/AnotherComponent.js': ';',
      './src/AnotherComponent/index.js': 'require("./AnotherComponent.js")',
    });

    const dirtyComponents = await getDirtyComponents({
      rootPath: fakeFs.dir,
      components: {
        Component: { path: 'src/Component' },
        AnotherComponent: { path: 'src/AnotherComponent' },
      },
      changedFiles: [
        'src/unrelated-file',
        'unrelated-file',
        'package.json',
        'src/NotComponent/index.js',
      ].map((p) => path.join(fakeFs.dir, p)),
    });

    expect(dirtyComponents).toEqual([]);
  });

  it('should return list of dirty components with basic input', async () => {
    const fakeFs = cista({
      './src/Component/Component.js': ';',
      './src/Component/index.js': 'require("./Component.js")',
    });

    const dirtyComponents = await getDirtyComponents({
      rootPath: fakeFs.dir,
      components: { Component: { path: 'src/Component' } },
      changedFiles: ['src/Component/Component.js'],
    });

    expect(dirtyComponents).toEqual(['Component']);
  });

  it('should return list of dirty components when a dependency changed', async () => {
    const fakeFs = cista({
      './src/Component/Component.js': 'require("../AnotherComponent")',
      './src/Component/index.js': 'require("./Component.js")',
      './src/AnotherComponent/AnotherComponent.js': ';',
      './src/AnotherComponent/index.js': 'require("./AnotherComponent.js")',
    });

    const dirtyComponents = await getDirtyComponents({
      rootPath: fakeFs.dir,
      components: {
        Component: { path: 'src/Component' },
        AnotherComponent: { path: 'src/AnotherComponent' },
      },
      changedFiles: [path.join(fakeFs.dir, 'src/AnotherComponent/index.js')],
    });

    expect(dirtyComponents).toEqual(['Component', 'AnotherComponent']);
  });

  it('should return list of dirty components', async () => {
    const gitTestkit = new GitTestkit();
    await gitTestkit.init({
      files: {
        A: { 'index.js': '' },
        B: { 'index.js': `require("../C")` },
        C: { 'index.js': `require("./C.js")` },
      },
    });
    await gitTestkit.createBranch('test');
    await gitTestkit.checkout('test');
    await gitTestkit.commitFile({
      name: 'C/C.js',
      content: '"hello world"',
      message: 'add component',
    });

    const dirtyComponents = await getDirtyComponents({
      rootPath: gitTestkit.cwd,
      components: {
        A: { path: 'A' },
        B: { path: 'B' },
        C: { path: 'C' },
      },
      changedFiles: await getChangedFiles({ cwd: gitTestkit.cwd }),
    });

    expect(dirtyComponents).toEqual(['B', 'C']);
  });
});
