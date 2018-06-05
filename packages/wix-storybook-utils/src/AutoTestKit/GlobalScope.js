const Scope = require('./Scope');
const parse = require('../Parser').parse;

class GlobalScope extends Scope {
  constructor(globalScope, files) {
    super(globalScope);
    this.files = files;
  }

  _getIdentifierValueFromImport(name, declaration) {
    if (declaration.specifiers.some(specifier => specifier.local.name === name)) {
      const fileContents = this.files[declaration.source.value];
      const recastedContent = parse(fileContents);
      const files = Object.assign({}, this.files, {entry: declaration.source.value});
      // We return a new scope because we return a new file contents which has its own scope
      return {
        identifierValue: this._getDefaultExportStatement(recastedContent.program.body).declaration,
        scope: new GlobalScope(recastedContent.program.body, files)
      };
    }
  }

  _getDefaultExportStatement(scope) {
    return scope.find(({type}) => type === 'ExportDefaultDeclaration');
  }

  getDefaultExportStatement() {
    return this._getDefaultExportStatement(this.scope);
  }
}

module.exports = GlobalScope;
