import {BoxSpacing, BoxCrossAxisAlignment} from './Box';

export type BoxTheme = {
  spacing?: BoxSpacing
  crossAxisAlignment?: BoxCrossAxisAlignment
};

export const vCore: BoxTheme = {
  spacing: '20px',
  crossAxisAlignment: 'start'
};

export const hCore: BoxTheme = {
  spacing: '0px',
  crossAxisAlignment: 'end'
};
