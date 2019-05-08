import * as fs from 'fs';
import * as path from 'path';
import * as tempy from 'tempy';
import globby from 'globby';
import * as logger from '../logger';
import { copyTemplates } from '../tasks/copy-templates';

// Extracted from
// https://github.com/wix/yoshi/blob/master/packages/create-yoshi-app/src/getFilesInDir.js
const getDirSnapshot = absoluteDirPath => {
  const filesPaths = globby.sync(['**/*', '!node_modules'], {
    cwd: absoluteDirPath,
    dot: true,
    gitignore: true,
  });

  const files = {};

  filesPaths.forEach(filePath => {
    const content = fs.readFileSync(
      path.join(absoluteDirPath, filePath),
      'utf-8',
    );

    files[filePath] = content;
  });

  return files;
};

describe('copyTemplates', () => {
  let succesSpy;
  let tempDir;

  beforeEach(() => {
    tempDir = tempy.directory();

    // Silent logs
    succesSpy = jest.spyOn(logger, 'success').mockImplementation(() => {});
  });

  afterEach(() => {
    succesSpy.mockRestore();
  });

  it('should work as expected when description is provided', async () => {
    await copyTemplates({
      ComponentName: 'MyNewComponent',
      description: 'This is a very cool component, yall',
      templates: path.join(__dirname, 'templates'),
      cwd: tempDir,
    });

    expect(getDirSnapshot(tempDir)).toMatchSnapshot();
  });

  it('should work as expected when description is not provided', async () => {
    await copyTemplates({
      ComponentName: 'MyNewComponent',
      description: undefined,
      templates: path.join(__dirname, 'templates'),
      cwd: tempDir,
    });

    expect(getDirSnapshot(tempDir)).toMatchSnapshot();
  });
});
