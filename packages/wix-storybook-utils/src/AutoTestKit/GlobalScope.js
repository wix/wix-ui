const Scope = require('./Scope');
const parse = require('recast').parse;

class GlobalScope extends Scope {
  constructor(globalScope, files) {
    super(globalScope);
    this.files = files;
  }

  _getIdentifierValueFromImport(name, declaration) {
    if (declaration.specifiers.some(specifier => specifier.local.name === name)) {
      const fileContents = this.files[declaration.source.value];
      const recastedContent = parse(fileContents);
      return {identifierValue: this._getDefaultExportStatement(recastedContent.program.body).declaration, scope: new GlobalScope(recastedContent.program.body, this.files)};
    }
  }

  _getDefaultExportStatement(scope) {
    return scope.find(({type}) => type === 'ExportDefaultDeclaration');
  }

  getDefaultExportStatement() {
    return this._getDefaultExportStatement(this.scope)
  }
}

module.exports = GlobalScope;

