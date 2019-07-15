const path = require('path');
const execa = require('execa');

(async () => {
  const outDir = path.join('dist', 'standalone');

  console.log('running tsc...');

  // https://www.typescriptlang.org/docs/handbook/compiler-options.html
  await execa('tsc', ['--outDir', outDir], { stdio: 'inherit' });

  console.log('✔︎');

  console.log('running stc...');

  // https://github.com/wix/stylable/tree/master/packages/cli#usage
  await execa(
    'stc',
    [
      `--outDir=${outDir}`,
      '--cssFilename=[filename].global.css',
      '--cjs',
      '--css',
      '--icr',
    ],
    { stdio: 'inherit' },
  );

  console.log('✔︎');
  console.log();

  console.log(`Finish build standalone version under ${outDir}`);
})();
