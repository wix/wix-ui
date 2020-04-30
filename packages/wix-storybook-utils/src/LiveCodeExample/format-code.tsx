import prettier from 'prettier/standalone';
import babylonParser from 'prettier/parser-babylon';

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
