import { dirty } from '.';
import path from 'path';
import cista from 'cista';

describe('dirt', () => {
  it('should exist', () => {
    expect(typeof dirty).toEqual('function');
  });

  it('sanity', async () => {
    expect(
      await dirty({
        rootPath: '.',
        components: {},
        changedFiles: [],
      }),
    ).toEqual([]);
  });

  it('should return dirty components with basic input', async () => {
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

  it('should return dirty components', async () => {
    const fakeFs = cista({
      './src/Component/Component.js': 'require("../AnotherComponent")',
      './src/Component/index.js': 'require("./Component.js")',
      './src/AnotherComponent/AnotherComponent.js': ';',
      './src/AnotherComponent/index.js': 'require("./AnotherComponent.js")',
    });

    console.log({ fakefsdir: fakeFs.dir });

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
