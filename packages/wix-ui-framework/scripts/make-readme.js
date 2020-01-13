#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let allCommands = execSync('npm run wuf -- --help', { encoding: 'utf8' });
allCommands = removeUntil({ string: allCommands, match: /^Commands/ });
allCommands = allCommands
  .split('\n')
  .filter(i => i)
  .map(command => command.match(/[a-zA-Z0-9-]+/)[0]);

const commandsDocs = allCommands
  .map(command => {
    const output = execSync(`npm run wuf -- ${command} --help `, {
      encoding: 'utf8',
    });

    return {
      name: command,
      doc: removeUntil({
        string: output,
        match: /^Usage:/,
        inclusive: true,
      }),
    };
  })
  .map(({ name, doc }) => `## \`wuf ${name}\`\n \`\`\`md\n${doc}\`\`\``);

const readmeTemplate = fs.readFileSync(
  path.resolve(__dirname, 'README.template.md'),
  'utf8',
);
const output = readmeTemplate.replace(
  /\$\{commands\}/,
  commandsDocs.join('\n---\n\n'),
);

process.stdout.write(output)

function removeUntil({ string, match, inclusive = false }) {
  const lines = string.split('\n');
  const output = [];
  let matched = false;

  while (lines.length) {
    const line = lines.shift();

    if (matched) {
      output.push(line);
    } else {
      matched = match.test(line);

      if (inclusive && matched) {
        output.push(line);
      }
    }
  }

  return output.join('\n');
}
