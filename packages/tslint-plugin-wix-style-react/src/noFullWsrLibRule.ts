import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  static FAILURE_STRING =
    "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';`";
  static LIB_NAME = 'wix-style-react';
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new Walk(sourceFile, this.getOptions()));
  }
}

class Walk extends Lint.RuleWalker {
  visitImportDeclaration(node: ts.ImportDeclaration) {
    if (this.isWSRImport(node)) {
      this.addFailureAt(
        node.getStart(),
        node.getEnd() - node.getStart(),
        Rule.FAILURE_STRING,
        this.fixSelectiveImports(node)
      );
    }
    super.visitImportDeclaration(node);
  }

  visitVariableStatement(node: ts.VariableStatement) {
    // iterate list since we can have more than one variable declared in a single declaration
    node.declarationList.declarations.forEach(variableDeclaration => {
      if (this.isWSRRequireStatement(variableDeclaration)) {
        if (this.isRequireAllLib(variableDeclaration)) {
          this.addFailureAt(
            variableDeclaration.getStart(),
            variableDeclaration.getEnd() - variableDeclaration.getStart(),
            Rule.FAILURE_STRING
          );
        } else if (this.isRequireWithDestructure(variableDeclaration)) {
          this.addFailureAt(
            variableDeclaration.parent.getStart(),
            variableDeclaration.parent.getEnd() - variableDeclaration.parent.getStart(),
            Rule.FAILURE_STRING,
            // fix only if only one variableDeclaration in variableDeclarationList
            node.declarationList.declarations && node.declarationList.declarations.length === 1
              ? this.fixSelectiveRequire(node, variableDeclaration)
              : undefined
          );
        }
      } else if (this.isWSRRequireWithProperty(variableDeclaration)) {
        this.addFailureAt(
          variableDeclaration.parent.getStart(),
          variableDeclaration.parent.getEnd() - variableDeclaration.parent.getStart(),
          Rule.FAILURE_STRING,
          // fix only if only one variableDeclaration in variableDeclarationList
          node.declarationList.declarations && node.declarationList.declarations.length === 1
            ? this.fixPropertyRequire(node, variableDeclaration)
            : undefined
        );
      }
    });
    super.visitVariableStatement(node);
  }

  // const {Button, Panel} = require('wix-style-react');
  private isRequireWithDestructure(variableDeclaration: ts.VariableDeclaration) {
    return ts.isObjectBindingPattern(variableDeclaration.name);
  }

  // const WSR = require('wix-style-react');
  private isRequireAllLib(variableDeclaration: ts.VariableDeclaration) {
    return ts.isIdentifier(variableDeclaration.name);
  }

  // const Button2 = require('wix-style-react').Button;
  private isWSRRequireWithProperty(variableDeclaration: ts.VariableDeclaration) {
    return (
      variableDeclaration.initializer &&
      ts.isPropertyAccessExpression(variableDeclaration.initializer) &&
      ts.isCallExpression(variableDeclaration.initializer.expression) &&
      variableDeclaration.initializer.expression.expression.getText() === 'require' &&
      variableDeclaration.initializer.expression.arguments &&
      variableDeclaration.initializer.expression.arguments.length &&
      (variableDeclaration.initializer.expression.arguments[0] as any).text === Rule.LIB_NAME
    );
  }

  private isWSRImport(node: ts.ImportDeclaration) {
    return (
      node.moduleSpecifier &&
      (node.moduleSpecifier as any).text === Rule.LIB_NAME &&
      node.importClause &&
      (node.importClause.namedBindings as any).elements &&
      (node.importClause.namedBindings as any).elements.length
    );
  }

  private isWSRRequireStatement(variableDeclaration: ts.VariableDeclaration) {
    return (
      variableDeclaration.initializer &&
      ts.isCallExpression(variableDeclaration.initializer) &&
      ts.isIdentifier(variableDeclaration.initializer.expression) &&
      variableDeclaration.initializer.expression.getText() === 'require' &&
      variableDeclaration.initializer.arguments &&
      variableDeclaration.initializer.arguments.length &&
      (variableDeclaration.initializer.arguments[0] as any).text === Rule.LIB_NAME
    );
  }

  private fixSelectiveImports(node: ts.ImportDeclaration): Lint.Fix {
    const specifiers = (node.importClause.namedBindings as any).elements.map(specifier => specifier.name.text);
    const importStatements = specifiers.map(specifier => this.compileImportStatement(specifier));
    return new Lint.Replacement(node.getStart(), node.getWidth(), importStatements.join('\n'));
  }

  private fixSelectiveRequire(
    variableStatementNode: ts.VariableStatement,
    variableDeclarationNode: ts.VariableDeclaration
  ): Lint.Fix {
    if (ts.isObjectBindingPattern(variableDeclarationNode.name)) {
      const specifiers = variableDeclarationNode.name.elements.map(element => element.name.getText());
      const importStatements = specifiers.map(specifier => this.compileImportStatement(specifier));
      return new Lint.Replacement(
        variableStatementNode.getStart(),
        variableStatementNode.getWidth(),
        importStatements.join('\n')
      );
    }
  }

  // const Button2 = require('wix-style-react').Button;
  private fixPropertyRequire(
    variableStatementNode: ts.VariableStatement,
    variableDeclarationNode: ts.VariableDeclaration
  ): Lint.Fix {
    if (
      variableDeclarationNode.initializer &&
      ts.isPropertyAccessExpression(variableDeclarationNode.initializer) &&
      ts.isIdentifier(variableDeclarationNode.initializer.name)
    ) {
      const identifier = variableDeclarationNode.name.getText();
      const specifier = variableDeclarationNode.initializer &&
        variableDeclarationNode.initializer.name.getText();
      return new Lint.Replacement(
        variableStatementNode.getStart(),
        variableStatementNode.getWidth(),
        this.compileImportStatement(identifier, specifier)
      );
    }
  }

  private compileImportStatement(name, source = name) {
    return `import ${name} from '${Rule.LIB_NAME}/${source}';`;
  }
}
