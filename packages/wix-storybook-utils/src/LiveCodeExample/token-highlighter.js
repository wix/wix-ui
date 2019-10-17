import React from 'react';
import { highlight, languages } from 'prismjs/components/prism-core';

export const tokenHighlighter = code => {
  const tokens = highlight(code, languages.jsx);

  const renderToken = (token = {}, key) => {
    if (token.type === 'text') {
      return token.value;
    }

    return (
      <span
        key={key}
        {...token.properties}
        className={token.properties.className.join(' ')}
      >
        {token.children.map(renderToken)}
      </span>
    );
  };

  return tokens.map(renderToken);
};
