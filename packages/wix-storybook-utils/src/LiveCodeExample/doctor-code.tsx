import prettier from 'prettier/standalone';
import babylonParser from 'prettier/parser-babylon';
import { parse } from '@babel/parser';
import { transformFromAstSync } from '@babel/core';
import * as types from '@babel/types';
import traverse from '@babel/traverse';

export const formatCode = (code: string) => {
  try {
    const filteredCode = code
      .split('\n')
      .filter(
        line =>
          !/\/(\*|\/)+.*((t|e)slint[-|:](dis|en)able|prettier-ignore)/.test(
            line,
          ),
      )
      .join('\n');

    return prettier.format(filteredCode, {
      parser: 'babel',
      plugins: [babylonParser],
      singleQuote: true,
      trailingComma: 'all',
    });
  } catch (e) {
    console.error('Unable to format code', e);
    return code;
  }
};

export const transformCode: (code: string) => string = code => {
  try {
    const ast = parse(code, {
      plugins: [
        ['decorators', { decoratorsBeforeExport: true }],
        'jsx',
        'typescript',
        'classProperties',
        'objectRestSpread',
        'dynamicImport',
        require('@babel/plugin-proposal-class-properties'),
      ],
      sourceType: 'module',
    });

    traverse(ast, {
      ImportDeclaration(path) {
        path.remove();
      },
      ExportDefaultDeclaration(path) {
        path.remove();
      },
      ExportNamedDeclaration(path) {
        path.remove();
      },
      CallExpression(path) {
        if (types.isIdentifier(path.node.callee, { name: 'require' })) {
          const parent = path.getStatementParent();
          if (parent.type === 'VariableDeclaration') {
            path.getStatementParent().remove();
          }
        }
      },
    });

    const transformed = transformFromAstSync(ast, code, {
      plugins: [
        require('@babel/plugin-syntax-jsx'),
        [require('@babel/plugin-proposal-class-properties'), { loose: true }],
      ],
    });

    return transformed.code;
  } catch (error) {
    console.error('Error in <LiveCodeEditor/>:', error);
    return code;
  }
};
