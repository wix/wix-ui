/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ToggleOnProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const ToggleOn: React.SFC<ToggleOnProps> = ({size, ...props}) => (
  <svg viewBox="0 0 10 8" fill="currentColor" width={ size || "10" } height={ size || "8" } {...props}>
    <path d="M3.8 5L1.2 2.5 0 3.7 3.8 7.5 10 1.2 8.8 0z" />
  </svg>
);
ToggleOn.displayName = 'ToggleOn';
export default ToggleOn;
/* tslint:enable */
/* eslint-enable */
