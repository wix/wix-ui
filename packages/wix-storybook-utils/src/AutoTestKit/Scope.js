class Scope {
  constructor(scope, parentScope) {
    this.scope = scope;
    this.parentScope = parentScope;
  }

  _getIdentifierValueFromCurrentScope(name) {
    let identifierValue = null;
    const allDeclarations = this.scope.filter(value => {
      return value.type.endsWith('Declaration');
    });
    if (Array.isArray(allDeclarations) && allDeclarations.length) {
      for (let index = 0; index < allDeclarations.length; index++) {
        const declaration = allDeclarations[index];
        identifierValue = this._getIdentifierValueFromDeclaration(name, declaration);
        if (identifierValue) {
          break;
        }
      }
    }
    return identifierValue;
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
      default:
        throw new Error(`Unknown declaration ${type}`);
    }
    return identifierValue;
  }
}

module.exports = Scope;
