import * as React from 'react';
import style from './Highlighter.st.css';

export const Highlighter: React.SFC = props => (
  <span
    {...style('root', {}, props)}
  >
  {props.children}
  </span>
);

Highlighter.displayName = 'Highlighter';
