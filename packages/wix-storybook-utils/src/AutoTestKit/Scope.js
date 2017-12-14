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
            identifierValue = identifier.init;
            break;
          }
        }
        break;
      case 'ImportDeclaration':
        break;
      default:
        throw new Error(`Unknown declaration ${type}`);
    }
    return identifierValue;
  }

  getDefaultExportStatement() {
    return this.scope.find(({type}) => type === 'ExportDefaultDeclaration');
  }
}

class FunctionScope extends Scope {
  constructor(functionScope, parentScope) {
    const {body, params} = functionScope;
    const {type: bodyType} = body;
    let blockScope = [];
    switch (bodyType) {
      case 'BlockStatement':
        blockScope = body.body;
        break;
      case 'ObjectExpression':
        blockScope = null;
        break;
      case 'CallExpression':
      case 'MemberExpression':
        // TODO We need to parse this as it can be another object
        blockScope = null;
        break;
      case 'BinaryExpression':
      case 'UnaryExpression':
      case 'Identifier':
      case 'Literal':
        blockScope = null;
        break;
      default:
        throw new Error(`Unknown function body type ${bodyType}`);
    }
    super(blockScope, parentScope);
    this.body = body;
    this.params = params;
  }

  _getPropertyNames(properties) {
    return properties.map(prop => prop.key.name);
  }

  getParams() {
    const params = [];

    this.params.forEach(param => {
      const paramDescriptor = {};
      params.push(paramDescriptor);
      const {type} = param;

      switch (type) {
        case 'ObjectPattern':
          paramDescriptor.type = 'object';
          paramDescriptor.properties = this._getPropertyNames(param.properties);

          break;
        case 'Identifier':
          paramDescriptor.type = 'unknown';
          paramDescriptor.name = param.name;
          break;
        default:
          throw new Error(`Unknown param type: ${type}`);
      }
    });

    return params;
  }

  getReturnValue() {
    const {type} = this.body;
    let returnValue = null;
    switch (type) {
      case 'ObjectExpression':
        returnValue = this.body;
        break;
      case 'BlockStatement':
        const returnStatement = this.body.body.find(statement => statement.type === 'ReturnStatement');
        returnValue = returnStatement && returnStatement.argument;
        break;
      case 'CallExpression':
      case 'MemberExpression':
        // TODO We need to parse this as it can be another object
        returnValue = null;
        break;
      case 'BinaryExpression':
      case 'UnaryExpression':
      case 'Identifier':
      case 'Literal':
        returnValue = null;
        break;
      default:
        throw new Error(`Uknown return type ${type}`);
    }
    return returnValue;
  }

  _getIdentifierValueFromParams(name) {
    const params = this.params;
    const value = undefined;
    (params || []).forEach(param => {
      const {type} = param;
      switch (type) {
        case 'ObjectPattern':
          break;

        default:
          break;
      }
    });

    return value;
  }

  _getIdentifierValueFromCurrentScope(name) {
    return this._getIdentifierValueFromParams(name) || super._getIdentifierValueFromCurrentScope(name);
  }
}

module.exports = {Scope, FunctionScope};
