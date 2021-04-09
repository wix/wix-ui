import { dirty } from '.';
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

  it('should return dirty components', async () => {
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
});
