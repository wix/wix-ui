/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface RevertSmallProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const RevertSmall: React.SFC<RevertSmallProps> = ({size, ...props}) => (
  <svg viewBox="0 0 18 18" fill="currentColor" width={ size || "18" } height={ size || "18" } {...props}>
    <path d="M5.66068933,7 L8,7 L8,8 L4,8 L4,4 L5,4 L5,6.19671552 C5.99446314,4.81810848 7.3482222,4 9,4 C11.7761424,4 14,6.22385763 14,9 C14,11.7761424 11.7761424,14 9,14 C6.60535937,14 4.57013149,12.2787547 4.10144231,10 L5.12823762,10 C5.57823343,11.7209986 7.15817062,13 9,13 C11.2238576,13 13,11.2238576 13,9 C13,6.77614237 11.2238576,5 9,5 C7.62914079,5 6.49760488,5.7301661 5.66068933,7 Z"
    />
  </svg>
);
RevertSmall.displayName = 'RevertSmall';
export default RevertSmall;
/* tslint:enable */
/* eslint-enable */
