import {palette} from '../../palette';

const skinToColor = {
  standard: palette.mainInputText,
  error: palette.mainInputText
};

const skinToHoverBackgroundColor = {
  standard: palette.dividers,
  error: palette.dividers
};

const skinToBorderColor = {
  standard: palette.notifications,
  error: palette.danger
};

const skinToHoverBorderColor = {
  standard: palette.notifications,
  error: palette.danger
};

const skinToFocusBorderColor = {
  standard: palette.mainHover,
  error: palette.danger
};

export const theme = ({size, skin}) => ({

  color: skinToColor[skin],
  backgroundColor: palette.white,
  borderColor: skinToBorderColor[skin],

  hover: {
    color: skinToColor[skin],
    borderColor: skinToHoverBorderColor[skin],
    backgroundColor: skinToHoverBackgroundColor[skin]
  },

  focus: {
    color: skinToColor[skin],
    borderColor: skinToFocusBorderColor[skin],
    backgroundColor: palette.white
  },

  disabled: {
    color: palette.disabled,
    backgroundColor: palette.white,
    borderColor: palette.disabledDividers,
    hoverBorderColor: palette.disabledFields
  }
});
