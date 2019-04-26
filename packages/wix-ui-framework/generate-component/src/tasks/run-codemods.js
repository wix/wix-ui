const path = require('path')
const { exec } = require('child_process')

const utils = require('../utils')
const logger = require('../logger')
const createValuesMap = require('../create-values-map')

const runCodemod = ({
  codemod,
  dist,
  description,
  options,
  cwd
}) => {
  return new Promise((resolve, reject) => {
    const codemodPath = path.join(options.codemodsPath, codemod)

    const pathToExecutable = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'node_modules',
      '.bin',
      'jscodeshift'
    )

    const command = `${pathToExecutable} \
          ${path.join(cwd, dist)} \
          -t ${codemodPath} \
          --ComponentName=${options.ComponentName} \
          --componentName=${options.componentName} \
          --verbose=2`

    const execProc = exec(command)

    execProc.stderr.on('data', data => {
      logger.error(`Error while running codemod ${codemod}: ${data.toString()}`)
      reject(data.toString())
    })

    execProc.on('exit', () => {
      logger.success(description)
      resolve()
    })
  })
}

module.exports = ({ answers, cwd }) => {
  try {
    const codemods = require(path.join(answers.codemodsPath, 'index.js'))
    return Promise.all(
      codemods.map(
        codemod => runCodemod({ ...codemod, options: createValuesMap(answers), cwd })
      )
    )
  } catch(e) {
    return Promise.reject(e)
  }
}
