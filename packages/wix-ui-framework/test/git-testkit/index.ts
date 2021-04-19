import cista from 'cista';
import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

import { fsToJson } from '../../src/fs-to-json';
import { jsonToFs } from '../../src/json-to-fs';

interface Config {
  cwd?: string;
}

export class GitTestkit {
  cwd: string;
  files: object;
  exec: Function;

  constructor({ cwd = '' }: Config = {}) {
    if (cwd) {
      this.cwd = cwd;
    } else {
      const tmpFs = cista();
      this.cwd = tmpFs.dir;
    }

    this.exec = async (cmd: string) =>
      (await promisify(exec)(cmd, { cwd: this.cwd })).stdout;
  }

  async init({ files = {}, branches = {} } = {}) {
    await this.exec('git init --quiet');

    if (Object.keys(files).length) {
      await jsonToFs({ tree: files, cwd: this.cwd });
      try {
        await this.exec('git add .');
        await this.exec('git commit -m "initial commit"');
      } catch (e) {
        console.log(e);
      }
    } else {
      await this.commitFile({
        name: 'package.json',
        content: '{}',
        message: 'initial commit',
      });
    }

    for await (const [branch, files] of Object.entries(branches)) {
      await this.createBranch(branch);
      await this.checkout(branch);
      await jsonToFs({ tree: files, cwd: this.cwd });
      await this.exec('git add .');
      await this.exec(`git commit -m "init branch '${branch}'"`);
      await this.checkout('master');
    }
  }

  async gitExists() {
    const files = await fs.readdir(this.cwd, { encoding: 'utf8' });
    return files.includes('.git');
  }

  async getBranches() {
    const branchesRaw = await this.exec(
      'git for-each-ref refs/heads --format="%(refname:short)"',
    );
    return branchesRaw.trim().split('\n');
  }

  async getActiveBranch() {
    return this.exec('git rev-parse --abbrev-ref HEAD');
  }

  async getTree() {
    return fsToJson({
      cwd: this.cwd,
      path: '.',
      exclude: ['.git'],
      withContent: true,
    });
  }

  async createBranch(name: string) {
    if ((await this.getBranches()).includes(name)) {
      return;
    }
    return this.exec(`git checkout -b ${name}`);
  }

  async checkout(name: string) {
    return this.exec(`git checkout ${name}`);
  }

  async commitFile({
    name,
    content = '',
    message = 'dummy commit',
  }: {
    name: string;
    content?: string;
    message?: string;
  }) {
    await fs.writeFile(path.join(this.cwd, name), content, {
      encoding: 'utf8',
    });
    await this.exec('git add .');
    await this.exec(`git commit -m "${message}"`);
  }
}
