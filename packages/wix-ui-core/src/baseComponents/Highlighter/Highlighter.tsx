import * as React from 'react';

export const Highlighter: React.SFC = ({children}) => (
  <strong>{children}</strong>
);

Highlighter.displayName = 'Highlighter';
