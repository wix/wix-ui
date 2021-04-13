import { GitTestkit } from '.';

describe('GitTestkit', () => {
  it('should init repo at a given path', async () => {
    const gitTestkit = new GitTestkit();
    await gitTestkit.init();
    expect(await gitTestkit.gitExists()).toEqual(true);
  });
});
