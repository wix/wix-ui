const path = require('path');
const execa = require('execa');

const outDir = path.join('dist', 'standalone');
const esOutDir = path.join(outDir, 'es');

function buildStandalone() {
  console.log('Creating "standalone" version');
  console.log('running tsc...');

  // https://www.typescriptlang.org/docs/handbook/compiler-options.html
  execa.sync('tsc', ['--outDir', outDir], { stdio: 'inherit' });

  console.log('✔︎');

  console.log('running stc...');

  // https://github.com/wix/stylable/tree/master/packages/cli#usage
  execa.sync(
    'stc',
    [
      `--outDir=${path.join(outDir, 'src')}`,
      '--srcDir=src',
      '--cssFilename=[filename].global.css',
      '--compat',
      '--cjs',
      '--css',
      '--icr',
      '--optimized'
    ],
    { stdio: 'inherit' },
  );

  console.log('✔︎');
}

function buildStandaloneEs() {
  console.log('Creating "standalone/es" version');
  console.log('running tsc...');

  // https://www.typescriptlang.org/docs/handbook/compiler-options.html
  execa.sync('tsc', ['--outDir', esOutDir, '--module', 'ESNext'], {
    stdio: 'inherit',
  });

  console.log('✔︎');

  console.log('running stc...');

  // https://github.com/wix/stylable/tree/master/packages/cli#usage
  execa.sync(
    'stc',
    [
      `--outDir=${path.join(esOutDir, 'src')}`,
      '--srcDir=src',
      '--cssFilename=[filename].global.css',
      '--compat',
      '--cjs',
      '--css',
      '--icr',
      '--optimized'
    ],
    { stdio: 'inherit' },
  );

  console.log('✔︎');
  console.log();

  console.log(`Finish build standalone version under ${esOutDir}`);
}

buildStandalone();
buildStandaloneEs();
