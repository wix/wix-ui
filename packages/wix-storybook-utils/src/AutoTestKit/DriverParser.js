const FunctionScope = require('./FunctionScope');
const GlobalScope = require('./GlobalScope');
const parse = require('../Parser').parse;

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
  }

  parse() {
    const fileContents = this.files[this.files.entry];
    this.ast = parse(fileContents);
    this.topParentScope = new GlobalScope(this.ast.program.body, this.files);
    return this.parseDefaultExport(this.topParentScope);
  }

  _parseDeclaration(scope, declaration, comments) {
    if (!declaration) {
      throw new Error('There is no declaration');
    }
    const {type} = declaration;
    let returnValue = null;
    switch (type) {
      case 'CallExpression':
        {
          const returnData = scope.getIdentifierValue(declaration.callee.name);
          returnValue = this._parseDeclaration(returnData.scope, returnData.identifierValue);
        }
        break;
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
      case 'FunctionExpression':
        // TODO: support non-arrow function syntax (e.g. DropDownLayout.driver, see optionById method)
        return null;
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
      return comment.type === 'CommentBlock' && comment.value.indexOf('*') === 0;
    };

    const parseCommentValue = commentValue => {
      return commentValue.substring(1);
    };

    return comments.reduce((description, comment) => {
      return isValidComment(comment) ? description + parseCommentValue(comment.value) : description;
    }, '');
  }

  _getGlobalScope(scope) {
    if (scope.files) {
      return scope;
    } else if (scope.parentScope) {
      return this._getGlobalScope(scope.parentScope);
    }
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

    const globalScope = this._getGlobalScope(scope);
    if (globalScope && globalScope.files.entry !== globalScope.files.origin) {
      returnValue.origin = globalScope.files.entry;
    }

    if (functionReturnValue) {
      returnValue.returns = this._parseDeclaration(functionScope, functionReturnValue);
    }
    return returnValue;
  }

  _parseObjectExpression(scope, declaration) {
    const {properties} = declaration;
    const returnObject = {};

    properties.forEach(property => {
      switch (property.type) {
        case 'Property':
          returnObject[property.key.name] =
            this._parseDeclaration(scope, property.value, property.leadingComments);
          break;
        case 'SpreadProperty':
          {
            const propertyToSpread = this._parseDeclaration(scope, property.argument);

            // Flaten imported methods
            if (propertyToSpread && propertyToSpread.returns) {
              Object.keys(propertyToSpread.returns).forEach(methodName => {
                returnObject[methodName] = propertyToSpread.returns[methodName];
              });
            }
            // TODO: also flaten locally defined method container?
          }
          break;
        default: break;
      }
    });

    return returnObject;
  }

  parseDefaultExport(scope) {
    const exportDeclaration = scope.getDefaultExportStatement();
    return exportDeclaration ?
      this._parseDeclaration(scope, exportDeclaration.declaration) : null;
  }
}

module.exports.DriverParser = DriverParser;
