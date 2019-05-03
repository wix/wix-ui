import * as prompts from 'prompts';

import { isPascalCase } from '../utils';
const logger = require('../logger');

export const runPrompts = async () => {
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

        if (!isPascalCase(value)) {
          return 'Component name must be in PascalCase';
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
