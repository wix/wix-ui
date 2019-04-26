const program = require('commander');
const path = require('path')
const logger = require('./logger');

const generateComponent = require('../src/generate-component');
const runPrompts = require('../src/tasks/run-prompts');

const defaultTemplatesPath = 'generator/templates'
const defaultDodemodsPath = 'generator/codemods'
const validModules = ['wix-style-react', 'wix-ui-tpa']

module.exports = () => {
  program
    .version('1.0.0')
    .description(`A component generator`)
    .option('-f, --force', 'Skip some pre-run checks')
    .option('--componentName <componentName>', 'Component name')
    .option('--description <description>', 'Component description')
    .option('--templates <templatesPath>', 'Templates location. Default is /generator/templates/')
    .option('--codemods <codemodsPath>', 'Codemods location. Default is /generator/codemods/')
    .parse(process.argv);

  const cwd = process.cwd();

  let packageJson

  try{
    packageJson = require(path.join(cwd, 'package.json'))
  } catch(e) {
    const message = 'No package.json found, `wuf` must be run in the module root'
    logger.error(message);
    return Promise.reject(message)
  }

  if (!validModules.includes(packageJson.name)) {
    const message = `Unknown module: ${name}`
    logger.error(message)
    return Promise.reject(message)
  }

  if (program.componentName) {
    return generateComponent({
      cwd,
      answers: {
        ComponentName: program.componentName, 
        description: program.description,
        templatesPath: path.join(cwd, program.templates || defaultTemplatesPath),
        codemodsPath: path.join(cwd, program.codemods || defaultDodemodsPath),
      },
      force: program.force,
    })
  }

  return runPrompts().then(answers => 
    generateComponent({
      cwd,
      answers: Object.assign(answers, {
        templatesPath: path.join(cwd, defaultTemplatesPath),
        codemodsPath: path.join(cwd, defaultDodemodsPath),
      }),
     force: program.force,
    })
  )
}
