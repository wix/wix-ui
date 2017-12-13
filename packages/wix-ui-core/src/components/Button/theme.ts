import {palette} from '../../palette';

export type ButtonTheme = {
  minWidth?: string;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;

  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontStyle?: string;
  fontWeight?: string;
  textDecoration?: string;

  color?: string;
  backgroundColor?: string;
  borderColor?: string;

  hover?: {
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
  };

  active?: {
    color?: string,
    backgroundColor?: string,
    borderColor?: string
  };

  disabled?: {
    color?: string,
    backgroundColor?: string,
    borderColor?: string
  };
};

export const core: ButtonTheme = {
  height: '36px',
  padding: '0 23px',
  borderRadius: '0',

  fontFamily: `"HelveticaNeueW01-45Ligh", "HelveticaNeueW02-45Ligh", "HelveticaNeueW10-45Ligh", "Helvetica Neue", "Helvetica", "Arial", "メイリオ, meiryo", "ヒラギノ角ゴ pro w3", "hiragino kaku gothic pro", "sans-serif"`,
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',

  color: palette.black,
  backgroundColor: palette.grey,
  borderColor: palette.black,
};
