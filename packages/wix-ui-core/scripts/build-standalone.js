#!/usr/bin/env node

const path = require('path');
const execa = require('execa');

(async () => {
  const outDir = path.join('dist', 'standalone');

  console.log('running tsc...');

  await execa('tsc', ['--outDir', outDir], {stdio: 'inherit'});

  console.log('✔︎');

  console.log('running stc...');

  await execa('stc', [`--outDir=${outDir}`, '--cssFilename=[filename].global.css', '--cjs', '--css', '--icr'], {stdio: 'inherit'});
  
  console.log('✔︎');
  console.log();

  console.log(`Finish build standalone version under ${outDir}`);
})();