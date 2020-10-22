/* eslint-disable */
/* tslint:disable */
import * as React from 'react';
export interface LinkSmallProps extends React.SVGAttributes<SVGElement> {
size?: string;
}
const LinkSmall: React.SFC<LinkSmallProps> = ({size, ...props}) => (
  <svg viewBox="0 0 18 18" fill="currentColor" width={ size || "18" } height={ size || "18" } {...props}>
    <path d="M10.9968853,7 C11.192078,7.19519277 11.192078,7.51166278 10.9968853,7.70685555 L7.7072324,11.0001257 C7.51188055,11.1953387 7.19528247,11.1952825 7,11 C6.80480723,10.8048072 6.80480723,10.4883372 7,10.2931445 L10.2896529,6.99987434 C10.4850047,6.80466128 10.8016028,6.80471753 10.9968853,7 Z M9.85150157,12.8515213 L8.71466686,13.9753003 C7.41310748,15.2768597 5.30329807,15.2782698 4,13.9784514 C2.69990751,12.6818301 2.69709359,10.5767776 3.99371493,9.27668514 L4,9.27040007 L5.14246612,8.14815731 C5.33897789,7.95512409 5.6547665,7.95794402 5.84779972,8.15445579 L5.84866616,8.15534004 C6.0418287,8.35296227 6.038605,8.66963983 5.8414594,8.86328882 L4.70616093,9.97845144 C3.79514687,10.8918926 3.79711442,12.3637806 4.70616093,13.2704001 C5.6187826,14.1805851 7.09615591,14.1795977 8.00756008,13.2681935 L9.13942606,12.149348 C9.33655453,11.9544872 9.65370533,11.9542942 9.85107073,12.148915 C10.0452076,12.3403522 10.0473961,12.6529216 9.85595897,12.8470585 L9.85150157,12.8515213 Z M8.16075365,5.11400094 L9.28492042,4.01883636 C10.5860139,2.72121674 12.7183859,2.72121674 14.0223187,4.05766742 C15.3092826,5.37672617 15.2868854,7.52338024 13.9543831,8.82046157 L12.8676872,9.85272265 C12.6654006,10.0448762 12.3470668,10.0416175 12.1487563,9.84536306 C11.9582767,9.65685831 11.9566758,9.34963079 12.1451806,9.15915119 C12.1487533,9.15554109 12.1523824,9.1519873 12.1560667,9.14849114 L13.2568645,8.10389494 C14.1940619,7.19161032 14.1268163,5.60421928 13.304646,4.75404805 C12.4939247,3.91571567 10.9011288,3.81927003 9.99108134,4.72688773 L8.82708991,5.86132112 C8.63766141,6.04593933 8.33443665,6.04203982 8.14981845,5.85261132 C8.14487532,5.84753939 8.14004529,5.84235845 8.13533194,5.8370723 C7.94897597,5.62806929 7.96017972,5.30940029 8.16075365,5.11400094 Z"
    />
  </svg>
);
LinkSmall.displayName = 'LinkSmall';
export default LinkSmall;
/* tslint:enable */
/* eslint-enable */