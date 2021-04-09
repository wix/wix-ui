import { dirty } from '.';
import path from 'path';
import cista from 'cista';

describe('dirt', () => {
  it('sanity', async () => {
    expect(
      await dirty({
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

    const dirtyComponents = await dirty({
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

    const dirtyComponents = await dirty({
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

    const dirtyComponents = await dirty({
      rootPath: fakeFs.dir,
      components: {
        Component: { path: 'src/Component' },
        AnotherComponent: { path: 'src/AnotherComponent' },
      },
      changedFiles: [path.join(fakeFs.dir, 'src/AnotherComponent/index.js')],
    });

    expect(dirtyComponents).toEqual(['Component', 'AnotherComponent']);
  });
});
