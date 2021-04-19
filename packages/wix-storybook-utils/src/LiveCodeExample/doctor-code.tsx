import prettier from 'prettier/standalone';
import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/standalone';
import { isIdentifier, File } from '@babel/types';
import traverse from '@babel/traverse';

const babelParse: (source: string) => File = source =>
  parse(source, {
    plugins: [
      ['decorators', { decoratorsBeforeExport: true }],
      'jsx',
      'typescript',
      'classProperties',
      'objectRestSpread',
      'dynamicImport',
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-transform-async-to-generator'),
    ],
    sourceType: 'module',
  });

const locStart = (node, opts?) => {
  const { ignoreDecorators } = opts || {};

  if (!ignoreDecorators) {
    const decorators =
      (node.declaration && node.declaration.decorators) || node.decorators;

    if (decorators && decorators.length > 0) {
      return locStart(decorators[0]);
    }
  }

  return node.range ? node.range[0] : node.start;
};

const locEnd = node => {
  const end = node.range ? node.range[1] : node.end;
  return node.typeAnnotation ? Math.max(end, locEnd(node.typeAnnotation)) : end;
};

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
      plugins: [
        {
          parsers: {
            babel: {
              astFormat: 'estree',
              parse: babelParse,
              locStart,
              locEnd,
            },
          },
        },
      ],
      singleQuote: true,
      trailingComma: 'all',
    });
  } catch (e) {
    console.error('Unable to format code', e);
    return code;
  }
};

export const transformCode: (code: string) => string = code => {
  const ast = babelParse(code);

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
      if (isIdentifier(path.node.callee, { name: 'require' })) {
        const parent = path.getStatementParent();
        if (parent.type === 'VariableDeclaration') {
          path.getStatementParent().remove();
        }
      }
    },
  });

  const transformed = transformFromAst(ast, code, {
    plugins: [
      require('@babel/plugin-syntax-jsx'),
      [require('@babel/plugin-proposal-class-properties'), { loose: true }],
    ],
  });

  return transformed.code;
};
