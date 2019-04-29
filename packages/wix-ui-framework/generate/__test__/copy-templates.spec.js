const fs = require('fs');
const path = require('path');
const tempy = require('tempy');
const globby = require('globby');
const utils = require('../utils');
const logger = require('../logger');
const copyTemplates = require('../tasks/copy-templates');

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
    const answers = {
      ComponentName: 'MyNewComponent',
      description: "This is a very cool component, ya'll",
      templatesPath: path.join(__dirname, 'templates'),
    };

    await copyTemplates({
      answers,
      cwd: tempDir
    });

    expect(getDirSnapshot(tempDir)).toMatchSnapshot();
  });

  it('should work as expected when description is not provided', async () => {
    const answers = {
      ComponentName: 'MyNewComponent',
      description: undefined,
      templatesPath: path.join(__dirname, 'templates'),
    };

    await copyTemplates({
      answers,
      cwd: tempDir
    });

    expect(getDirSnapshot(tempDir)).toMatchSnapshot();
  });
});
