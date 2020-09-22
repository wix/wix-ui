/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DropDownArrowProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const DropDownArrow: React.SFC<DropDownArrowProps> = ({size, ...props}) => (
  <svg viewBox="0 0 10 6" fill="currentColor" width={ size || "10" } height={ size || "6" } {...props}>
    <path d="M5 4.1L0.7 0 0 0.7 5 5.6 10 0.7 9.3 0z" />
  </svg>
);
DropDownArrow.displayName = 'DropDownArrow';
export default DropDownArrow;
/* tslint:enable */
/* eslint-enable */
