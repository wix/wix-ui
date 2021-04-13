import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const getChangedFiles = async ({ cwd }) => {
  const folder = fs.readdirSync(cwd);
  if (!folder.includes('.git')) {
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
