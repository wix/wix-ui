import {pallete} from '../../pallete';

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
  standard: pallete.tableSelected,
  success: pallete.successNotifications,
  error: pallete.dangerNotifications
};

const skinToBackgroundColorChecked = {
  standard: pallete.main,
  success: pallete.ctaHover,
  error: pallete.danger
};

const skinToColor = {
  standard: pallete.tableSelected,
  success: pallete.successNotifications,
  error: pallete.dangerNotifications
};

const skinToColorChecked = {
  standard: pallete.main,
  success: pallete.ctaHover,
  error: pallete.danger
};

const skinToHoverBackgroundColor = {
  standard: pallete.mainHover,
  success: pallete.successHover,
  error: pallete.dangerHover
};

const skinToHoverColor = {
  standard: pallete.mainHover,
  success: pallete.successHover,
  error: pallete.dangerHover
};

export const themeCreator = ({size, skin}) => ({
  outerLabelWidth: sizeToOuterLabelWidth[size],
  outerLabelHeight: sizeToOuterLabelHeight[size],

  innerLabelWidth: sizeToInnerLabelWidth[size],
  innerLabelHeight: sizeToInnerLabelHeight[size],
  innerLabelBackgroundColor: pallete.white,

  labelMovementRange: sizeTolabelMovementRange[size],
  toggleIconDisplay: sizeTotoggleIconDisplay[size],

  backgroundColor: skinToBackgroundColor[skin],
  backgroundColorChecked: skinToBackgroundColorChecked[skin],
  backgroundColorDisabled: pallete.disabledButton,
  backgroundColorHover: skinToHoverBackgroundColor[skin],

  color: skinToColor[skin],
  colorChecked: skinToColorChecked[skin],
  colorDisabled: pallete.disabledDividers,
  colorCheckedDisabled: pallete.disabledButton,
  colorHover: skinToHoverColor[skin]
});
