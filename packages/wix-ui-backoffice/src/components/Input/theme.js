import {palette} from '../../palette';

const skinToColor = {
  standard: palette.mainInputText,
  disabled: palette.disabled,
  error: palette.mainInputText
};

const skinToHoverBackgroundColor = {
  standard: palette.dividers,
  disabled: palette.white,
  error: palette.dividers
};

const skinToBorderColor = {
  standard: palette.notifications,
  disabled: palette.disabledDividers,
  error: palette.danger
};

const skinToHoverBorderColor = {
  standard: palette.notifications,
  disabled: palette.disabledFields,
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
    borderColor: skinToFocusBorderColor[skin]
  }
});
