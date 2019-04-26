const logger = require('../logger');
const utils = require('../utils');

const errorMessage =
  'Git working directory is dirty!\nCommit or stash your changes, or run the generator with the --force flag';

module.exports = async ({ cwd }) => {
  if (!(await utils.isGitRepoClean(cwd))) {
    logger.divider();
    logger.divider();
    logger.error(errorMessage);
    logger.divider();
    process.exit(1);
  }
};

module.exports.errorMessage = errorMessage;
