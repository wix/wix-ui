const cwd = process.cwd()
const path = require('path')
const logger = require('./logger');

const runTasks = require('./run-tasks');
const runPrompts = require('./tasks/run-prompts');

const defaultTemplatesPath = 'generator/templates'
const defaultDodemodsPath = 'generator/codemods'

module.exports = ({force, componentName, description, templates, codemods}) => {
  let packageJson

  try {
    packageJson = require(path.join(cwd, 'package.json'))
  } catch (e) {
    const message =
      'No package.json found, `wuf` must be run in the module root'
    logger.error(message)
    return Promise.reject(message)
  }

  if (componentName) {
    return runTasks({
      cwd,
      answers: {
        ComponentName: componentName,
        description,
        templatesPath: path.join(
          cwd,
          templates || defaultTemplatesPath
        ),
        codemodsPath: path.join(cwd, codemods || defaultDodemodsPath)
      },
      force
    })
  }

  return runPrompts().then(answers => 
    runTasks({
      cwd,
      answers: {
        ...answers, 
        templatesPath: path.join(
          cwd,
          templates || defaultTemplatesPath
        ),
        codemodsPath: path.join(cwd, codemods || defaultDodemodsPath)
      },
      force
    })
  )
}
