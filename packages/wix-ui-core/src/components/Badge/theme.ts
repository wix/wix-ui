import {palette} from '../../palette';

export type BadgeState = Partial<{
  color: string;
  backgroundColor: string;
  borderColor: string;
}>;

export type BadgeTheme = Partial<BadgeState & {
  display: string;
  justifyContent: string;
  flexDirection: string;
  minWidth: string;
  width: string;
  height: string;
  padding: string;
  contentPadding: string;
  borderRadius: string;
  border: string;
  opacity: string;
  cursor: string;
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
  border: '1px solid',
  borderRadius: '2px',
  cursor: 'default',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  ...stateStyle,
  hover: stateStyle
};
