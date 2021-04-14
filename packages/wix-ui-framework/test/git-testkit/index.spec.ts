import { GitTestkit } from '.';

describe('GitTestkit', () => {
  it('should init repo at a given path', async () => {
    const gitTestkit = new GitTestkit();
    await gitTestkit.init();
    expect(await gitTestkit.gitExists()).toEqual(true);
  });

  it('should support initial file tree', async () => {
    const files = {
      a: '1',
      b: '2',
    };
    const gitTestkit = new GitTestkit();
    await gitTestkit.init({ files });
    expect(await gitTestkit.gitExists()).toEqual(true);
    expect(await gitTestkit.getTree()).toEqual(files);
  });

  it('should support initial branches', async () => {
    const files = {
      a: '1',
      b: '2',
    };

    const branches = {
      master: {
        a: '3', // should override content from initial `files`
      },
      test: {
        c: '4',
      },
      test2: {
        a: 'hello',
      },
    };

    const gitTestkit = new GitTestkit();
    await gitTestkit.init({ files, branches });

    expect(await gitTestkit.gitExists()).toEqual(true);
    expect(await gitTestkit.getBranches()).toEqual(['master', 'test', 'test2']);

    // on master branch by default
    expect(await gitTestkit.getTree()).toEqual({ a: '3', b: '2' });

    await gitTestkit.checkout('test');
    expect(await gitTestkit.getTree()).toEqual({ a: '3', b: '2', c: '4' });

    await gitTestkit.checkout('test2');
    expect(await gitTestkit.getTree()).toEqual({ a: 'hello', b: '2' });
  });
});
