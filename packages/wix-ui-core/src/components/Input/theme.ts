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

  focus?: {
    color?: string,
    backgroundColor?: string,
    hoverBackgroundColor?: string,
    borderColor?: string
  };

  disabled?: {
    color?: string,
    backgroundColor?: string,
    borderColor?: string,
    hoverBorderColor?: string
  };

  placeholder?: {
    color?: string
  }
};

export const core: InputTheme = {
  fontFamily: `"HelveticaNeueW01-45Ligh", "HelveticaNeueW02-45Ligh", "HelveticaNeueW10-45Ligh", "Helvetica Neue", "Helvetica", "Arial", "メイリオ, meiryo", "ヒラギノ角ゴ pro w3", "hiragino kaku gothic pro", "sans-serif"`,
  fontSize: '16px',
  lineHeight: '24px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  textDecoration: 'none',

  height: '36px',
  padding: '0 12px',

  color: palette.black,
  backgroundColor: palette.grey,
  borderColor: palette.black,
  borderRadius: '6px',

  hover: {
    color: palette.black,
    backgroundColor: palette.grey,
    borderColor: palette.black
  },

  focus: {
    color: palette.black,
    backgroundColor: palette.grey,
    borderColor: palette.black
  },

  disabled: {
    color: palette.black,
    backgroundColor: palette.grey,
    borderColor: palette.black,
    hoverBorderColor: palette.black
  },

  placeholder: {
    color: palette.white
  }
};
