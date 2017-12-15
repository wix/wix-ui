const FunctionScope = require('./FunctionScope');
const GlobalScope = require('./GlobalScope');
const parse = require('recast').parse;

class DriverParser {
  /**
   * @param {Object} files - This is an object that contains all of the external file content that this parser may need.
   * For example:
   * {
   *    './Badge/Badge.driver.js': '[content of this file as text]'
   * }
   * This Object also has a special property called 'entry' which is what the parser should start with
   */
  constructor(files) {
    this.files = files;
    const fileContents = files[files.entry];
    this.recastedDriver = parse(fileContents);
  }

  parse() {
    const topParentScope = new GlobalScope(this.recastedDriver.program.body, this.files);

    // We only case about what this file exports..
    //TODO: Parse non-default exports
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
        {
          const returnData = scope.getIdentifierValue(declaration.name);
          returnValue = this._parseDeclaration(returnData.scope, returnData.identifierValue);
        }
        break;
      case 'UnaryExpression':
      case 'LogicalExpression':
        // TODO: Do something smart if possible
        return null;
      default:
        throw new Error(`Unknown declaration type ${type}`);
    }

    if (comments) {
      returnValue.description = this._commentsToDescription(comments);
    }

    return returnValue;
  }

  _commentsToDescription(comments) {
    /*
     * Comments may contain some valueble data regarding the thing they are describing.
     * For instance: variable types / return types etc..
     * Maybe we should parse it in the future and add them to the result of the parse output
     */
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

module.exports.DriverParser = DriverParser;
