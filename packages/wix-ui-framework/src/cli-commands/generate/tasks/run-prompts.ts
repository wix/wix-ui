import * as prompts from 'prompts';

import { Answers } from '../typings';

import { isPascalCase } from '../utils';
import * as logger from '../../../logger';

export const runPrompts: () => Promise<Answers> = async () => {
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

  const handlers = {
    onCancel: () => {
      promptAborted = true;
    },
  };

  const answers = await prompts(questions, handlers);

  if (promptAborted) {
    logger.divider();
    logger.error('Aborted.');
    process.exit(1);
  }

  return answers;
};
