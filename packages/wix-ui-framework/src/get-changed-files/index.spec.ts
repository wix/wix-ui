import { getChangedFiles } from '.';

import { GitTestkit } from '../../test/git-testkit';

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
      await gitTestkit.init();
      await gitTestkit.createBranch('test');
      await gitTestkit.checkout('test');
      await gitTestkit.commitFile('testFile', '', 'add test file');
      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual([
        'testFile',
      ]);
    });
  });
});
