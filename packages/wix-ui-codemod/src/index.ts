import program from 'commander';
import { execFileSync } from 'child_process';

program
  .arguments('<transform> [path]')
  .option('-p, --print', 'print modified files to stdout')
  .option('-d, --dry', 'run in dry mode (will not modify any files on disk)');

program.parse(process.argv);

if (program.args.length < 2) {
  program.help();
}

let transformPath: string;
try {
  transformPath = require.resolve(`./${program.args[0]}`);
} catch {
  console.error(`Error: Transform "${program.args[0]}" not found.`);
  process.exit(1);
}

const args: string[] = [];

if (program.dry) {
  args.push('--dry');
}

if (program.print) {
  args.push('--print');
}

args.push('--ignore-pattern=**/node_modules/**');
args.push('--parser', 'tsx');
args.push('--extensions', 'tsx,ts,jsx,js');
args.push('--transform', transformPath);
args.push('--verbose', '2');
args.push(program.args[1]);

try {
  execFileSync(require.resolve('.bin/jscodeshift'), args, { stdio: 'inherit' });
} catch {
  process.exit(1);
}
