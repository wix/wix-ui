const program = require('commander');
const path = require('path')
const logger = require('./logger');

const generateComponent = require('../src/generate-component');
const runPrompts = require('../src/tasks/run-prompts');

module.exports = () => {
  program
    .version('1.0.0')
    .description(`A component generator`)
    .option('-f, --force', 'Skip some pre-run checks')
    .option('-c, --componentName [componentName]', 'Component name')
    .option('-d, --description', 'Component description')
    .parse(process.argv);

  const cwd = process.cwd();

  try{
    const { name } = require(path.join(cwd, 'package.json'))

    if (name === 'wix-style-react' || name ===  'wix-ui-tpa') {
      return program.componentName
        ? generateComponent({
          cwd,
          answers: {ComponentName: program.componentName, description: program.description},
          force: program.force,
        }) : runPrompts().then(answers => 
          generateComponent({
           cwd,
           answers,
           force: program.force,
          })
        )
      }
        
    } else {
      const message = `Unknown module: ${name}`
      logger.error(message)
      return Promise.reject(message)
    }
  } catch(e) {
    const message = 'No package.json found, wuf must be run in the module root'
    logger.error(message);
    return Promise.reject(message)
  }
}
