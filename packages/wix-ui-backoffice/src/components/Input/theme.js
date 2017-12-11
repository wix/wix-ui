import {palette} from '../../palette';

const skinToColor = {
  standard: palette.mainInputText,
  disabled: palette.disabled,
  error: palette.mainInputText
};

const skinToBackgroundColor = {
  standard: palette.white,
  disabled: palette.disabledButton,
  error: palette.white
};

const skinToBorderColor = {
  standard: palette.notifications,
  disabled: palette.disabledDividers,
  error: palette.danger
};

export const theme = ({size, skin}) => ({

  color: skinToColor[skin],
  backgroundColor: skinToBackgroundColor[skin],
  borderColor: skinToBorderColor[skin],

  hover: {
    color: palette.mainInputText,
    borderColor: palette.notifications,
    backgroundColor: palette.dividers
  },

  focus: {
    borderColor: palette.mainHover
  }
});
