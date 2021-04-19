import path from 'path';
import { tmpdir } from 'os';
import fs from 'fs';

import { GitTestkit } from '../../test/git-testkit';
import { getChangedFiles } from '.';

describe('getChangedFiles', () => {
  describe('given path with clean git', () => {
    it('should return empty list', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init();
      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual([]);
    });
  });

  describe('given path with dirty git', () => {
    it('should return list of changed files', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init({
        branches: {
          test: {
            testFile: '',
          },
        },
      });
      await gitTestkit.checkout('test');
      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual(
        ['testFile'].map((p) => path.join(gitTestkit.cwd, p)),
      );
    });

    it('should return list of changed files', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init({
        files: {
          A: { 'index.js': '' },
          B: { 'index.js': `require('../C')` },
          C: { 'index.js': `require('./C.js')` },
        },
        branches: {
          test: {
            C: { 'C.js': 'hello world' },
          },
        },
      });
      await gitTestkit.checkout('test');
      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual(
        ['C/C.js'].map((p) => path.join(gitTestkit.cwd, p)),
      );
    });

    it('should return absoute paths resolved to git root', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init({
        files: {
          packages: {
            'wix-ui-tpa': {
              src: {
                components: {
                  BigChungus: {
                    'index.js': `import * as Dep from '../SmallChungus'`,
                  },
                  SmallChungus: { 'index.js': `;` },
                },
              },
            },
          },
        },
        branches: {
          test: {
            packages: {
              'wix-ui-tpa': {
                src: {
                  components: {
                    TheChungus: {
                      'index.js': `import Dep from '../SmallChungus'`,
                    },
                    SmallChungus: {
                      'index.js': `require('./SmallChungus.js')`,
                      'SmallChungus.js': ';',
                    },
                  },
                },
              },
            },
          },
        },
      });

      await gitTestkit.checkout('test');

      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual(
        [
          'packages/wix-ui-tpa/src/components/SmallChungus/SmallChungus.js',
          'packages/wix-ui-tpa/src/components/SmallChungus/index.js',
          'packages/wix-ui-tpa/src/components/TheChungus/index.js',
        ].map((p) => path.join(gitTestkit.cwd, p)),
      );
    });
  });

  describe('when running in non git repo', () => {
    it('should throw error', async () => {
      const tmp = tmpdir();
      const cwd = path.join(tmp, `${new Date().getTime()}`);
      fs.mkdirSync(cwd);
      expect(getChangedFiles({ cwd })).rejects.toThrow(
        'wuf must be used inside a git repository',
      );
    });
  });
});
