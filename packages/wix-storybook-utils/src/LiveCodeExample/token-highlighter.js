import React from 'react';
import { tokenize, languages } from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';

const isString = a => typeof a === 'string';

export const tokenHighlighter = code => {
  const tokens = tokenize(code, languages.jsx);

  const renderToken = (token = {}, key) => {
    if (isString(token)) {
      return token;
    }

    return (
      <span key={key} className={['token', token.type].join(' ')}>
        {isString(token.content)
          ? token.content
          : token.content.map(renderToken)}
      </span>
    );
  };

  return tokens.map(renderToken);
};
