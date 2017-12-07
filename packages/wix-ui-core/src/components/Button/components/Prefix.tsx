import * as React from 'react';

interface PrefixProps {
  children: React.ReactNode;
}

export const Prefix: React.SFC<PrefixProps> = ({children}) =>
  <span style={{paddingRight: '10px'}}>{children}</span>;

Prefix.displayName = 'Button.Prefix';
