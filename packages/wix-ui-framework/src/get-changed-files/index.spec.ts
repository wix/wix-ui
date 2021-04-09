import cista from 'cista';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import promisify from '../utils/promisify';
import { getChangedFiles } from '.';

class GitTestkit {
  cwd: string;
  exec: Function;
  constructor() {
    const fakeFs = cista();
    this.cwd = fakeFs.dir;
    this.exec = promisify(exec);
  }

  async init() {
    this.exec('git init --initial-branch master', { cwd: this.cwd });
    this.commitFile('package.json', '{}', 'initial commit');
  }

  async gitExists() {
    const files = fs.readdirSync(this.cwd, { encoding: 'utf8' });
    return files.includes('.git');
  }

  async getBranches() {
    return this.exec('git branch', { cwd: this.cwd });
  }

  async commitFile(file, content, commitMessage = 'dummy commit') {
    fs.writeFileSync(path.join(this.cwd, file), content, { encoding: 'utf8' });
    await this.exec('git add .');
    await this.exec(`git commit -am "${commitMessage}"`);
  }
}

describe('GitTestkit', () => {
  it('should init repo at a given path', async () => {
    const gitTestkit = new GitTestkit();
    await gitTestkit.init();
    expect(await gitTestkit.gitExists()).toEqual(true);
  });
});

describe.only('getChangedFiles', () => {
  describe('given path with clean git', () => {
    it('should return empty list', async () => {
      const gitTestkit = new GitTestkit();
      await gitTestkit.init();
      expect(await getChangedFiles({ cwd: gitTestkit.cwd })).toEqual([]);
    });
  });
});
