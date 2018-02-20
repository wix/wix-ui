import {palette} from '../../palette';

export type BadgeState = Partial<{
  color: string;
  backgroundColor: string;
  borderColor: string;
}>;

export type BadgeTheme = Partial<BadgeState & {
  display: string;
  minWidth: string;
  width: string;
  height: string;
  lineHeight: string;
  padding: string;
  contentPadding: string;
  borderRadius: string;
  border: string;
  cursor: string;
  textAlign: string;
  verticalAlign: string;
}>;

const stateStyle = {
  color: palette.white,
  backgroundColor: palette.grey,
  borderColor: palette.grey
};

export const core: BadgeTheme = {
  height: '24px',
  lineHeight: '1',
  padding: '4px 12px',
  border: '1px solid',
  borderRadius: '2px',
  cursor: 'default',
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'middle',
  ...stateStyle,
};
