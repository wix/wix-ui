import {palette} from '../../palette';

const sizeToOuterLabelWidth = {
  'x-small': '28px',
  small: '36px',
  large: '45px'
};

const sizeToOuterLabelHeight = {
  'x-small': '15px',
  small: '20px',
  large: '24px'
};

const sizeToInnerLabelWidth = {
  'x-small': '13px',
  small: '18px',
  large: '21px'
};

const sizeToInnerLabelHeight = {
  'x-small': '13px',
  small: '18px',
  large: '22px'
};

const sizeTolabelMovementRange = {
  'x-small': '14px',
  small: '17px',
  large: '23px'
};

const sizeTotoggleIconDisplay = {
  'x-small': 'none !important',
  small: 'block',
  large: 'block'
};

const skinToBackgroundColor = {
  standard: palette.tableSelected,
  success: palette.successNotifications,
  error: palette.dangerNotifications
};

const skinToBackgroundColorChecked = {
  standard: palette.main,
  success: palette.ctaHover,
  error: palette.danger
};

const skinToColor = {
  standard: palette.tableSelected,
  success: palette.successNotifications,
  error: palette.dangerNotifications
};

const skinToColorChecked = {
  standard: palette.main,
  success: palette.ctaHover,
  error: palette.danger
};

const skinToHoverBackgroundColor = {
  standard: palette.mainHover,
  success: palette.successHover,
  error: palette.dangerHover
};

const skinToHoverColor = {
  standard: palette.mainHover,
  success: palette.successHover,
  error: palette.dangerHover
};

export const theme = ({size, skin}) => ({
  outerLabelWidth: sizeToOuterLabelWidth[size],
  outerLabelHeight: sizeToOuterLabelHeight[size],

  innerLabelWidth: sizeToInnerLabelWidth[size],
  innerLabelHeight: sizeToInnerLabelHeight[size],
  innerLabelBackgroundColor: palette.white,

  labelMovementRange: sizeTolabelMovementRange[size],
  toggleIconDisplay: sizeTotoggleIconDisplay[size],

  backgroundColor: skinToBackgroundColor[skin],
  backgroundColorChecked: skinToBackgroundColorChecked[skin],
  backgroundColorDisabled: palette.disabledButton,
  backgroundColorHover: skinToHoverBackgroundColor[skin],

  color: skinToColor[skin],
  colorChecked: skinToColorChecked[skin],
  colorDisabled: palette.disabledDividers,
  colorCheckedDisabled: palette.disabledButton,
  colorHover: skinToHoverColor[skin]
});
