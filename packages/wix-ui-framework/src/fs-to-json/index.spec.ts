import cista from 'cista';
import { fsToJson } from './index';

describe('fsToJson', () => {
  describe('given non existing path', () => {
    it('should reject with error', () => {
      const fsTree = {
        'src/hello': '',
      };
      const fakeFs = cista(fsTree);
      return expect(
        fsToJson({ cwd: fakeFs.dir, path: 'src/goodbye' }),
      ).rejects.toThrowError();
    });
  });

  describe('given existing path', () => {
    it('should resolve with json representation of file system', async () => {
      const fsTree = {
        'templates/component/hello.js': 'a',
        'src/matching-comonent/hello.js': '',
        'src/non-matching-component/goodbye.js': '',
      };
      const fakeFs = cista(fsTree);
      return expect(fsToJson({ cwd: fakeFs.dir, path: '.' })).resolves.toEqual({
        templates: {
          component: {
            'hello.js': '',
          },
        },
        src: {
          'matching-comonent': {
            'hello.js': '',
          },
          'non-matching-component': {
            'goodbye.js': '',
          },
        },
      });
    });

    it('should resolve with json with content when using `withContent`', async () => {
      const fsTree = {
        'templates/component/hello.js': 'a',
        'src/matching-comonent/hello.js': 'b',
        'src/non-matching-component/goodbye.js': 'c',
      };
      const fakeFs = cista(fsTree);
      return expect(
        fsToJson({
          cwd: fakeFs.dir,
          path: '.',
          withContent: true,
        }),
      ).resolves.toEqual({
        templates: {
          component: {
            'hello.js': 'a',
          },
        },
        src: {
          'matching-comonent': {
            'hello.js': 'b',
          },
          'non-matching-component': {
            'goodbye.js': 'c',
          },
        },
      });
    });
  });

  describe('exclude option', () => {
    it('should be used to filter tree', () => {
      const fsTree = {
        'take/me': 'a',
        'me/too': 'b',
        'skip/me': 'c',
        'nested/deep/good.js': 'd',
        'nested/deep/bad.js': 'e',
        'nested/deep/ti.ts': 'f',
      };

      const fakeFs = cista(fsTree);

      return expect(
        fsToJson({
          cwd: fakeFs.dir,
          path: '.',
          withContent: true,
          exclude: ['**/skip', '**/bad.js', '**/*.ts'],
        }),
      ).resolves.toEqual({
        take: { me: 'a' },
        me: { too: 'b' },
        nested: {
          deep: {
            'good.js': 'd',
          },
        },
      });
    });
  });
});
