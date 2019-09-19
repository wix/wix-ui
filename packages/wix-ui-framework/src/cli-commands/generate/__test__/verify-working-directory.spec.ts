import * as cista from 'cista';

import * as logger from '../../../logger';
import * as utils from '../utils';
import {
  verifyWorkingDirectory,
  errorMessage,
} from '../tasks/verify-working-directory';

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
    // @ts-ignore
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

    const fakeFs = cista();
    await verifyWorkingDirectory(fakeFs.dir);

    expect(errorSpy).not.toHaveBeenCalled();
    expect(exitSpy).not.toHaveBeenCalled();
  });

  it('should fail when git repo is dirty', async () => {
    mockGitStatus(false);

    const fakeFs = cista();
    await verifyWorkingDirectory(fakeFs.dir);

    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(errorMessage);
  });
});
