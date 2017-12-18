import {palette} from '../../palette';

type BadgeState = Partial<{
  color: string;
  backgroundColor: string;
  borderColor: string;
}>;

export type BadgeTheme = Partial<BadgeState & {
  minWidth: string;
  width: string;
  height: string;
  padding: string;
  contentPadding: string;
  borderRadius: string;
  border: string;
  outline: string;
  boxSizing: string;

  fontFamily: string;
  fontSize: string;
  lineHeight: string;
  fontStyle: string;
  fontWeight: string;
  textDecoration: string;
  textAlign: string;

  cursor: string;
  '-webkit-font-smoothing': string;

  hover: BadgeState;
}>;

const stateStyle = {
  color: palette.white,
  backgroundColor: palette.defaultBadge,
  borderColor: palette.defaultBadge
};

export const core: BadgeTheme = {
  height: '24px',
  padding: '6px 12px',
  borderRadius: '2px',
  border: '1px solid',
  outline: 'none',
  boxSizing: 'border-box',

  fontFamily: `“HelveticaNeueW01-65Medi”, “HelveticaNeueW02-65Medi”, “HelveticaNeueW10-65Medi”, "sans-serif"`,
  fontSize: '10px',
  lineHeight: '12px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',
  textAlign: 'center',

  cursor: 'pointer',
  '-webkit-font-smoothing': 'antialiased',

  ...stateStyle,
  hover: stateStyle
};
