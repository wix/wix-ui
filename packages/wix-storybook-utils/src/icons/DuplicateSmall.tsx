/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface DuplicateSmallProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const DuplicateSmall: React.SFC<DuplicateSmallProps> = ({size, ...props}) => (
  <svg viewBox="0 0 18 18" fill="currentColor" width={ size || "18" } height={ size || "18" } {...props}>
    <path d="M14,4 C14.5522847,4 15,4.44771525 15,5 L15,12 C15,12.5522847 14.5522847,13 14,13 L13,13 L13,14 C13,14.5522847 12.5522847,15 12,15 L5,15 C4.44771525,15 4,14.5522847 4,14 L4,7 C4,6.44771525 4.44771525,6 5,6 L6,6 L6,5 C6,4.44771525 6.44771525,4 7,4 L14,4 Z M6,7 L5,7 L5,14 L12,14 L12,13 L7,13 C6.44771525,13 6,12.5522847 6,12 L6,7 Z M14,5 L7,5 L7,12 L14,12 L14,5 Z"
    />
  </svg>
);
DuplicateSmall.displayName = 'DuplicateSmall';
export default DuplicateSmall;
/* tslint:enable */
/* eslint-enable */
