const Scope = require('./Scope').Scope;
const FunctionScope = require('./Scope').FunctionScope;
const parse = require('recast').parse;

class DriverParser {
  constructor(driverFileContent) {
    this.recastedDriver = parse(driverFileContent);
  }

  parse() {
    const topParentScope = new Scope(this.recastedDriver.program.body, null);

    return this.parseDefaultExport(topParentScope);
  }

  _parseDeclaration(scope, declaration, comments) {
    if (!declaration) {
      throw new Error('There is no declaration');
    }
    const {type} = declaration;
    let returnValue = null;
    switch (type) {
      case 'ArrowFunctionExpression':
        returnValue = this._parseArrowFunctionExpression(declaration, scope);
        break;
      case 'ObjectExpression':
        returnValue = this._parseObjectExpression(scope, declaration);
        break;
      case 'Identifier':
        returnValue = this._parseDeclaration(scope, scope.getIdentifierValue(declaration.name));
        break;
      default:
        throw new Error(`Unknown declaration type ${type}`);
    }

    if (comments) {
      returnValue.description = this._commentsToDescription(comments);
    }

    return returnValue;
  }

  _commentsToDescription(comments) {
    const isValidComment = comment => {
      return comment.type === 'Block' && comment.value.indexOf('*') === 0;
    };

    const parseCommentValue = commentValue => {
      return commentValue.substring(1);
    };

    return comments.reduce((description, comment) => {
      return isValidComment(comment) ? description + parseCommentValue(comment.value) : description;
    }, '');
  }

  _parseArrowFunctionExpression(declaration, scope) {
    const functionScope = new FunctionScope(declaration, scope);
    const arrParams = functionScope.getParams();
    const functionReturnValue = functionScope.getReturnValue();
    const returnValue = {
      type: 'function',
      name: 'Anonymous',
      description: declaration.description,
      params: arrParams
    };
    if (functionReturnValue) {
      returnValue.returns = this._parseDeclaration(functionScope, functionReturnValue);
    }
    return returnValue;
  }

  _parseObjectExpression(scope, declaration) {
    const {properties} = declaration;
    const returnObject = {};

    properties.forEach(property => {
      const {key: {name}, value, comments} = property;
      returnObject[name] = this._parseDeclaration(scope, value, comments);
    });

    return returnObject;
  }

  parseDefaultExport(scope) {
    const exportDeclaration = scope.getDefaultExportStatement();
    return this._parseDeclaration(scope, exportDeclaration.declaration);
  }
}

module.exports = DriverParser;
