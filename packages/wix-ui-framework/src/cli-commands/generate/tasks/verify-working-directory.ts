import * as logger from '../../../logger';
import * as utils from '../utils';

export const errorMessage =
  'Git working directory is dirty!\nCommit or stash your changes, or run the generator with the --force flag';

export const verifyWorkingDirectory = async ({ cwd }) => {
  if (!(await utils.isGitRepoClean(cwd))) {
    logger.divider();
    logger.divider();
    logger.error(errorMessage);
    logger.divider();
    process.exit(1);
  }
};
