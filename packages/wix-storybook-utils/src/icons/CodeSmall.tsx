/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface CodeSmallProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const CodeSmall: React.SFC<CodeSmallProps> = ({size, ...props}) => (
  <svg viewBox="0 0 18 18" fill="currentColor" width={ size || "18" } height={ size || "18" } {...props}>
    <path d="M10,6.00254473 L11,6.00254473 L8,13 L7,13 L10,6.00254473 Z M6,12 L5.74819324,12 L1.99934428,9.78978657 L2.00158404,9.20893357 L5.74819324,7 L6.00018511,7 L6.00018511,8 L3.50778222,9.5 L6,11 L6,12 Z M11.9995294,12 L11.9995294,11 L14.4917472,9.5 L11.9993443,8 L11.9993443,7 L12.2513362,7 L15.9979454,9.20893357 L16.0001851,9.78978657 L12.2513362,12 L11.9995294,12 Z"
    />
  </svg>
);
CodeSmall.displayName = 'CodeSmall';
export default CodeSmall;
/* tslint:enable */
/* eslint-enable */
