#!/usr/bin/env node
const path = require('path')
const replaceInFiles = require('replace-in-files')
const getNewIcon = require('../lib/replace-icons.mapping')

const NAMESPACE = 'wix-ui-icons'
const EXTENSIONS = 'js,jsx,ts,tsx'
const PATH = '.'
const IGNORE = '**/node_modules/**'

const REPLACEMENTS = [
  {
    from: /import (\w+) from (['"])wix-style-react(\/dist)?\/src\/Icons\/dist\/components\/(\w+)\2/g,
    to: (match, $1, $2, $3, $4) =>
      `import ${$1} from ${$2}${NAMESPACE}/${getNewIcon($4)}${$2}`,
  },
  {
    from: /import {(.+)} from (['"])wix-style-react(\/dist)?\/src\/Icons\2/g,
    to: (match, $1, $2) => $1.split(',').map(i => i.trim()).map(entry =>
      `import ${entry} from ${$2}${NAMESPACE}/${getNewIcon(entry)}${$2}`
    ).join('\n'),
  },
]

function logFiles({ countOfMatchesByPaths }) {
  const allFiles = new Set(countOfMatchesByPaths.reduce((agg, item) =>
    [...agg, ...Object.keys(item)], []))

  return Array.from(allFiles).sort().map(f => `\t${f}`).join('\n')
}

async function main() {
  try {
    const options = Object.assign({
      files: path.join(PATH, '**', `*.{${EXTENSIONS}}`),
      optionsForFiles: {
        ignore: IGNORE.split(','),
      },
    }, REPLACEMENTS[0])

    const stats = await replaceInFiles(options).pipe(REPLACEMENTS[1])
    console.log('Updated files:\n', logFiles(stats))
  } catch (error) {
    console.log('Error occurred:', error)
  }
}

main()
