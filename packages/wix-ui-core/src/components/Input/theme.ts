import {palette} from '../../palette';

export type InputTheme = {
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontStyle?: string;
  fontWeight?: string;
  textDecoration?: string;

  height?: string;
  padding?: string;

  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;

  hover?: {
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

export const core: InputTheme = {
  fontFamily: `"HelveticaNeueW01-45Ligh", "HelveticaNeueW02-45Ligh", "HelveticaNeueW10-45Ligh", "Helvetica Neue", "Helvetica", "Arial", "メイリオ, meiryo", "ヒラギノ角ゴ pro w3", "hiragino kaku gothic pro", "sans-serif"`,
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',

  height: '36px',
  padding: '0 23px',

  color: palette.black,
  backgroundColor: palette.grey,
  borderColor: palette.black,
  borderRadius: '0',

  hover: {
    color: palette.black,
    backgroundColor: palette.grey,
    borderColor: palette.black
  },

  disabled: {
    color: palette.black,
    backgroundColor: palette.grey,
    borderColor: palette.black
  }
};
