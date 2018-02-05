import * as React from 'react';

export const Highlighter: React.SFC = ({children}) => (
  <b>{children}</b>
);

Highlighter.displayName = 'Highlighter';
