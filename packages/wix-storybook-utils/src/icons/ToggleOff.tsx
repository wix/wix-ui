/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface ToggleOffProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const ToggleOff: React.SFC<ToggleOffProps> = ({size, ...props}) => (
  <svg viewBox="0 0 10 2" fill="currentColor" width={ size || "10" } height={ size || "2" } {...props}>
    <path d="M0 0H10V2H0z" />
  </svg>
);
ToggleOff.displayName = 'ToggleOff';
export default ToggleOff;
/* tslint:enable */
/* eslint-enable */
