import path from 'path';
import { execSync } from 'child_process';

export const getChangedFiles = async ({ cwd }) => {
  const exec = (cmd: string) => execSync(cmd, { encoding: 'utf8', cwd });

  let isGitRepo = false;
  try {
    isGitRepo =
      exec('git rev-parse --is-inside-work-tree 2> /dev/null').trim() ===
      'true';
  } catch (e) {}

  if (!isGitRepo) {
    throw new Error('wuf must be used inside a git repository');
  }

  const output = execSync('git diff master --name-only', {
    encoding: 'utf8',
    cwd,
  });
  const files = output
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((p) => path.join(cwd, p));
  return files;
};
