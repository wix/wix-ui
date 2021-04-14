import { jsonToFs } from '.';
import { fsToJson } from '../fs-to-json';
import cista from 'cista';

describe('jsonToFs', () => {
  describe('given no `cwd`', () => {
    it('should reject promise', () => {
      expect(jsonToFs({ cwd: '' })).rejects.toEqual(
        'jsonToFs expects `cwd` to be passed',
      );
    });
  });

  describe('given cwd and tree', () => {
    it('should create that tree', async () => {
      const tree = {
        a: '1',
        b: '2',
      };
      const tmpFs = cista();
      await jsonToFs({ tree, cwd: tmpFs.dir });
      const actualFs = await fsToJson({
        cwd: tmpFs.dir,
        path: '.',
        withContent: true,
      });
      expect(tree).toEqual(actualFs);
    });

    it('should create deeply nested', async () => {
      const tree = {
        a: '1',
        b: '2',
        c: {
          d: '3',
        },
        e: '4',
        f: {
          g: {
            h: {
              i: '5',
            },
            j: '6',
            k: '7',
          },
          l: '8',
        },
        m: '9',
      };
      const tmpFs = cista();
      await jsonToFs({ tree, cwd: tmpFs.dir });
      const actualFs = await fsToJson({
        cwd: tmpFs.dir,
        path: '.',
        withContent: true,
      });
      expect(tree).toEqual(actualFs);
    });
  });
});
