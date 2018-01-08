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

  outerLabelBorderSize: number;
  outerLabelBorderSizeChecked: number;
  outerLabelBorderSizeDisabled: number;
  outerLabelBorderSizeHover: number;
  outerLabelBorderSizeHoverChecked: number;

  outerLabelBorderColor: string;
  outerLabelBorderColorChecked: string;
  outerLabelBorderColorDisabled: string;
  outerLabelBorderColorHover: string;
  outerLabelBorderColorHoverChecked: string;

  innerLabelBorderSize: number;
  innerLabelBorderSizeChecked: number;
  innerLabelBorderSizeDisabled: number;
  innerLabelBorderSizeHover: number;
  innerLabelBorderSizeHoverChecked: number;

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

  outerLabelBorderSize: 0,
  outerLabelBorderSizeChecked: 0,
  outerLabelBorderSizeDisabled: 0,
  outerLabelBorderSizeHover: 0,
  outerLabelBorderSizeHoverChecked: 0,

  outerLabelBorderColor: '#ffffff',
  outerLabelBorderColorChecked: '#ffffff',
  outerLabelBorderColorDisabled: '#ffffff',
  outerLabelBorderColorHover: '#ffffff',
  outerLabelBorderColorHoverChecked: '#ffffff',

  innerLabelBorderSize: 0,
  innerLabelBorderSizeChecked: 0,
  innerLabelBorderSizeDisabled: 0,
  innerLabelBorderSizeHover: 0,
  innerLabelBorderSizeHoverChecked: 0,

  innerLabelBorderColor: '#ffffff',
  innerLabelBorderColorChecked: '#ffffff',
  innerLabelBorderColorDisabled: '#ffffff',
  innerLabelBorderColorHover: '#ffffff',
  innerLabelBorderColorHoverChecked: '#ffffff'
};
