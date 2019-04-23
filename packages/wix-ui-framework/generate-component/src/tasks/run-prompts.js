const prompts = require('prompts');

const utils = require('../utils');
const logger = require('../logger');

module.exports = async () => {
  let promptAborted = false;

  const questions = [
    {
      type: 'text',
      name: 'ComponentName',
      message: 'Component name (PascalCase)',
      validate: value => {
        if (!value.length) {
          return 'Please supply a component name';
        }

        if (!utils.isPascalCase(value)) {
          return 'Component name must be in PascalCase';
        }

        if (utils.isComponentExists(value)) {
          return `Component <${value}/> already exists`;
        }

        return true;
      },
    },
    {
      type: 'text',
      name: 'description',
      message: 'Description',
    },
  ];

  const answers = await prompts(questions, {
    onCancel: () => {
      promptAborted = true;
    },
  });

  if (promptAborted) {
    logger.divider();
    logger.error('Aborted.');
    process.exit(1);
  }

  return answers;
};
