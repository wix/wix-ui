const tempy = require('tempy');

const logger = require('../src/logger');
const utils = require('../src/utils');
const verifyWorkingDirectory = require('../src/tasks/verify-working-directory');

let isGitRepoCleanSpy;

const mockGitStatus = isClean => {
  isGitRepoCleanSpy = jest
    .spyOn(utils, 'isGitRepoClean')
    .mockImplementation(() => Promise.resolve(isClean));
};

describe('verifyWorkingDirectory', () => {
  let errorSpy;
  let exitSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {});
    exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => {});
    jest.spyOn(logger, 'divider').mockImplementation(() => {});
  });

  afterEach(() => {
    if (isGitRepoCleanSpy) {
      isGitRepoCleanSpy.mockRestore();
    }

    errorSpy.mockRestore();
    exitSpy.mockRestore();
  });

  it('should not fail when git repo is clean', async () => {
    mockGitStatus(true);

    await verifyWorkingDirectory(tempy.directory());

    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('should fail when git repo is dirty', async () => {
    mockGitStatus(false);

    await verifyWorkingDirectory(tempy.directory());

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(verifyWorkingDirectory.errorMessage);
  });
});
