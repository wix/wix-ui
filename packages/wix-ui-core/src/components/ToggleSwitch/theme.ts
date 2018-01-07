import {palette} from '../../palette';

export type ToggleSwitchTheme = Partial<{
  rootWidth: string;
  rootHeight: string;

  transitionSpeed: string;
  borderRadius: string;
  innerLabelBorderRadius: string;
  labelMovementRange: string;

  outerLabelWidth: string;
  outerLabelHeight: string;

  innerLabelWidth: string;
  innerLabelHeight: string;

  innerLabelBackgroundColor: string;
  innerLabelBackgroundColorChecked: string;
  innerLabelBackgroundColorDisabled: string;
  innerLabelBackgroundColorHover: string;
  innerLabelBackgroundColorHoverChecked: string;

  backgroundColor: string;
  backgroundColorChecked: string;
  backgroundColorDisabled: string;
  backgroundColorHover: string;
  backgroundColorHoverChecked: string;
  backgroundColorFocus: string;

  focusOutline: string

  color: string;
  colorChecked: string;
  colorDisabled: string;
  colorCheckedDisabled: string;
  colorHover: string;
  colorHoverChecked: string;
  colorFocus: string;

  toggleIconWidth: string;
  toggleIconHeight: string;
  toggleIconDisplay: string;

  outerLabelBorderSize: string;
  outerLabelBorderSizeChecked: string;
  outerLabelBorderSizeDisabled: string;
  outerLabelBorderSizeHover: string;
  outerLabelBorderSizeHoverChecked: string;

  outerLabelBorderColor: string;
  outerLabelBorderColorChecked: string;
  outerLabelBorderColorDisabled: string;
  outerLabelBorderColorHover: string;
  outerLabelBorderColorHoverChecked: string;

  innerLabelBorderSize: string;
  innerLabelBorderSizeChecked: string;
  innerLabelBorderSizeDisabled: string;
  innerLabelBorderSizeHover: string;
  innerLabelBorderSizeHoverChecked: string;

  innerLabelBorderColor: string;
  innerLabelBorderColorChecked: string;
  innerLabelBorderColorDisabled: string;
  innerLabelBorderColorHover: string;
  innerLabelBorderColorHoverChecked: string;
}>;

export const core: ToggleSwitchTheme = {
  rootWidth: 'initial',
  rootHeight: 'initial',

  transitionSpeed: '.3s',
  borderRadius: '50px',
  innerLabelBorderRadius: '50px',
  labelMovementRange: '23px',

  outerLabelWidth: '45px',
  outerLabelHeight: '24px',

  innerLabelWidth: '21px',
  innerLabelHeight: '22px',

  innerLabelBackgroundColor: palette.white,
  innerLabelBackgroundColorChecked: palette.white,
  innerLabelBackgroundColorDisabled: palette.white,
  innerLabelBackgroundColorHover: palette.white,
  innerLabelBackgroundColorHoverChecked: palette.white,

  backgroundColor: palette.grey,
  backgroundColorChecked: palette.grey,
  backgroundColorDisabled: palette.disabledButton,
  backgroundColorHover: palette.grey,
  backgroundColorHoverChecked: palette.grey,
  backgroundColorFocus: palette.grey,

  focusOutline: 'none',

  color: palette.white,
  colorChecked: palette.white,
  colorDisabled: palette.white,
  colorCheckedDisabled: palette.white,
  colorHover: palette.white,
  colorHoverChecked: palette.white,
  colorFocus: palette.white,

  toggleIconWidth: '8px',
  toggleIconHeight: '6px',
  toggleIconDisplay: 'none',

  outerLabelBorderSize: 'none',
  outerLabelBorderSizeChecked: 'none',
  outerLabelBorderSizeDisabled: 'none',
  outerLabelBorderSizeHover: 'none',
  outerLabelBorderSizeHoverChecked: 'none',

  outerLabelBorderColor: 'none',
  outerLabelBorderColorChecked: 'none',
  outerLabelBorderColorDisabled: 'none',
  outerLabelBorderColorHover: 'none',
  outerLabelBorderColorHoverChecked: 'none',

  innerLabelBorderSize: 'none',
  innerLabelBorderSizeChecked: 'none',
  innerLabelBorderSizeDisabled: 'none',
  innerLabelBorderSizeHover: 'none',
  innerLabelBorderSizeHoverChecked: 'none',

  innerLabelBorderColor: 'none',
  innerLabelBorderColorChecked: 'none',
  innerLabelBorderColorDisabled: 'none',
  innerLabelBorderColorHover: 'none',
  innerLabelBorderColorHoverChecked: 'none'
};
