class Scope {
  constructor(scope, parentScope) {
    this.scope = scope;
    this.parentScope = parentScope;
  }

  _getIdentifierValueFromCurrentScope(name) {
    const identifierValues = this.scope.filter(value => value.type.endsWith('Declaration'))
      .map(declaration => this._getIdentifierValueFromDeclaration(name, declaration))
      .filter(identifierValue => !!identifierValue);
    return identifierValues.length > 0 ? identifierValues[0] : null;
  }

  getIdentifierValue(name) {
    return this._getIdentifierValueFromCurrentScope(name) || (this.parentScope && this.parentScope.getIdentifierValue(name));
  }

  _getIdentifierFromDeclarator(declarationName, declarator) {
    const {id: {name}} = declarator;
    return declarationName === name && declarator;
  }

  _getIdentifierValueFromDeclaration(name, declaration) {
    const {type, declarations} = declaration;
    let identifierValue = null;
    switch (type) {
      case 'VariableDeclaration':
        for (let index = 0; index < declarations.length; index++) {
          const declarator = declarations[index];
          const identifier = this._getIdentifierFromDeclarator(name, declarator);
          if (identifier) {
            identifierValue = {identifierValue: identifier.init, scope: this};
            break;
          }
        }
        break;
      case 'ImportDeclaration':
        identifierValue = this._getIdentifierValueFromImport(name, declaration);
        break;
      case 'ExportDefaultDeclaration':
        break;
      default:
        throw new Error(`Unknown declaration ${type}`);
    }
    return identifierValue;
  }
}

module.exports = Scope;
