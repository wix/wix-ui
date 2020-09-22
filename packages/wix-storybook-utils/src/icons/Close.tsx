/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CloseProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const Close: React.SFC<CloseProps> = ({size, ...props}) => (
  <svg viewBox="0 0 6 6" fill="currentColor" width={ size || "6" } height={ size || "6" } {...props}>
    <path d="M5.2 0L3 2.2 0.8 0 0 0.8 2.2 3 0 5.3 0.8 6 3 3.8 5.2 6 6 5.3 3.8 3 6 0.8z" />
  </svg>
);
Close.displayName = 'Close';
export default Close;
/* tslint:enable */
/* eslint-enable */
