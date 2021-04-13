import cista from 'cista';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';

import promisify from './promisify';
export class GitTestkit {
  cwd: string;
  exec: Function;
  constructor({ cwd = '' } = {}) {
    if (cwd) {
      this.cwd = cwd;
    } else {
      const fakeFs = cista();
      this.cwd = fakeFs.dir;
    }
    this.exec = (cmd: string) => promisify(exec)(cmd, { cwd: this.cwd });
  }

  async init() {
    await this.exec('git init --initial-branch master');
    await this.commitFile('package.json', '{}', 'initial commit');
  }

  async gitExists() {
    const files = await fs.readdir(this.cwd, { encoding: 'utf8' });
    return files.includes('.git');
  }

  async getBranches() {
    return this.exec('git branch');
  }

  async createBranch(name: string) {
    return this.exec(`git checkout -b ${name}`);
  }

  async checkout(name: string) {
    return this.exec(`git checkout ${name}`);
  }

  async commitFile(
    filePath: string,
    content: string,
    commitMessage = 'dummy commit',
  ) {
    await fs.writeFile(path.join(this.cwd, filePath), content, {
      encoding: 'utf8',
    });
    await this.exec('git add .');
    await this.exec(`git commit -m "${commitMessage}"`);
  }
}
