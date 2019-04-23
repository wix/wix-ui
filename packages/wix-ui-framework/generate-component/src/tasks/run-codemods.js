const path = require('path')
const { exec } = require('child_process')

const utils = require('../utils')
const logger = require('../logger')
const createValuesMap = require('../create-values-map')

const runCodemod = ({
  codemod,
  dist,
  description,
  options: { ComponentName, componentName }
}) =>
  new Promise((resolve, reject) => {
    const codemodPath = path.join(process.cwd(), 'generator/codemods', codemod)

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
          ${path.join(process.cwd(), dist)} \
          -t ${codemodPath} \
          --ComponentName=${ComponentName} \
          --componentName=${componentName} \
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

module.exports = ({ answers }) => {
  try {
    const codemods = require(path.join(
      process.cwd(),
      'generator/codemods/index.js'
    ))
    return Promise.all(
      codemods.map(
        codemod => runCodemod({ ...codemod, options: createValuesMap(answers) })
      )
    )
  } catch(e) {
    console.log('\nNo codemods found!')
    return Promise.resolve()
  }
}
