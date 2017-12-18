import {palette} from '../../palette';

type BadgeState = {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export type BadgeTheme = BadgeState & {
  minWidth?: string;
  width?: string;
  height?: string;
  padding?: string;
  contentPadding?: string;
  borderRadius?: string;

  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontStyle?: string;
  fontWeight?: string;
  textDecoration?: string;

  hover?: BadgeState
  active?: BadgeState
  disabled?: BadgeState
};

const stateStyle = {
  color: palette.white,
  backgroundColor: palette.defaultBadge,
  borderColor: palette.defaultBadge
};

export const core: BadgeTheme = {
  height: '24px',
  padding: '6px 12px',
  borderRadius: '2px',

  fontFamily: `“HelveticaNeueW01-65Medi”, “HelveticaNeueW02-65Medi”, “HelveticaNeueW10-65Medi”, "sans-serif"`,
  fontSize: '10px',
  lineHeight: '12px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',

  ...stateStyle,

  hover: stateStyle,
  disabled: stateStyle,
  active: stateStyle
};
