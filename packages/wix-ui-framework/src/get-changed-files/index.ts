import { execSync } from 'child_process';

export const getChangedFiles = async ({ cwd }) => {
  const output = execSync('git diff master --name-only', {
    encoding: 'utf8',
    cwd,
  });
  const files = output.trim().split('\n').filter(Boolean);
  return files;
};
