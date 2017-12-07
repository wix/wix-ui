import * as React from 'react';

interface SuffixProps {
  children: React.ReactNode;
}

export const Suffix: React.SFC<SuffixProps> = ({children}) =>
  <span style={{paddingLeft: '10px'}}>{children}</span>;

Suffix.displayName = 'Button.Suffix';
