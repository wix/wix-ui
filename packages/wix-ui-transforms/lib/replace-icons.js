const getNewIcon = require('./replace-icons.mapping')

const DEFAULT_OPTIONS = {
  namespace: 'wix-ui-icons',
}

const IMPORTS = {
  default: /^wix-style-react(\/dist)?\/src\/Icons\/dist\/components\/(\w+)$/,
  spread: /^wix-style-react(\/dist)?\/src\/Icons$/,
}

function isIconImport(re) {
  return node => (
    node.type === 'ImportDeclaration' &&
    node.source.value.match(re)
  )
}

function transformDefaultImport(j, re) {
  return ast => {
    const path = ast.value.source.value
    const newName = getNewIcon(path.replace(re, `$2`))
    const identifier = ast.value.specifiers[0].local.name
    j(ast).replaceWith(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(identifier))],
        j.literal(path.replace(re, `${DEFAULT_OPTIONS.namespace}/${newName}`))
      )
    )
  }
}

function transformSpreadImport(j) {
  return ast => {
    j(ast).replaceWith(
      ast.value.specifiers.map(specifier => {
        const identifier = specifier.local.name
        return j.importDeclaration(
            [j.importDefaultSpecifier(j.identifier(identifier))],
            j.literal(`${DEFAULT_OPTIONS.namespace}/${getNewIcon(identifier)}`),
          )
        }
      )
    )
  }
}

module.exports = function (fileInfo, { jscodeshift: j }) {
  const ast = j(fileInfo.source)
  // Cache opening comments/position
  const { comments, loc } = ast.find(j.Program).get('body', 0).node

  ast // import Name from 'wix-style-react/src/Icons/dist/components/Name'
    .find(j.ImportDeclaration, isIconImport(IMPORTS.default))
    .forEach(transformDefaultImport(j, IMPORTS.default))

  ast // import {Name} from 'wix-style-react/src/Icons'
    .find(j.ImportDeclaration, isIconImport(IMPORTS.spread))
    .forEach(transformSpreadImport(j))

  // Restore opening comments/position
  Object.assign(ast.find(j.Program).get('body', 0).node, { comments, loc })

  return ast.toSource({
    quote: 'single',
  })
}
