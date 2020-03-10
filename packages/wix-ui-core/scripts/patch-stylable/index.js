/* eslint no-console: 0 */
const ProgressBar = require('progress');

const tasks = [
  {
    task: () => require('./tasks/transpile-patch-export'),
    folder: 'components',
    entryFile: 'index',
    description: 'stylable - components',
  },
  {
    task: () => require('./tasks/transpile-patch-export'),
    folder: 'hocs',
    entryFile: 'hocs',
    description: 'stylable - hocs',
  },
  {
    task: () => require('./tasks/transpile-patch-export'),
    folder: 'mixins',
    description: 'stylable - mixins',
  },
  {
    task: () => require('./tasks/transpile-patch-export'),
    folder: 'themes',
    description: 'stylable - themes',
  },
  {
    task: () => require('./tasks/transpile-patch-export'),
    folder: 'common',
    description: 'stylable - common',
  },
];

const STEPS = tasks.length;
const TOTAL_STEPS_WIDTH = 20;
const START_TIME = new Date();
const STEP_WIDTH = TOTAL_STEPS_WIDTH / STEPS;

const progress = new ProgressBar(
  'Patching stylable files: :bar :percent :dir',
  {
    total: STEP_WIDTH * STEPS,
  },
);

tasks
  .reduce(
    (promise, { task, description, folder, entryFile}) =>
      promise
        .then(() => task()({ folder, entryFile }))
        .then(() => progress.tick(STEP_WIDTH, { dir: description }))
        .catch(e => {
          progress.interrupt('Error');
          console.error(e);
        }),
    Promise.resolve(),
  )
  .then(() =>
    console.log(`🚀 Done in ${Math.round(new Date() - START_TIME) / 1000}s`),
  );
