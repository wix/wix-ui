import {palette} from '../../palette';

export type ToggleSwitchTheme = Partial<{
  rootWidth: string;
  rootHeight: string;

  transitionSpeed: string;
  borderRadius: string;
  labelMovementRange: string;

  outerLabelWidth: string;
  outerLabelHeight: string;

  innerLabelWidth: string;
  innerLabelHeight: string;
  innerLabelBackgroundColor: string;

  backgroundColor: string;
  backgroundColorChecked: string;
  backgroundColorDisabled: string;
  backgroundColorHover: string;
  backgroundColorFocus: string;

  focusOutline: string

  color: string;
  colorChecked: string;
  colorDisabled: string;
  colorCheckedDisabled: string;
  colorHover: string;
  colorFocus: string;

  toggleIconWidth: string;
  toggleIconHeight: string;
  toggleIconDisplay: string;

  outerLabelBorder: string;
  outerLabelBorderChecked: string;
  outerLabelBorderDisabled: string;
  outerLabelBorderHover: string;
  outerLabelBorderHoverChecked: string;

  innerLabelBorder: string;
  innerLabelBorderChecked: string;
  innerLabelBorderDisabled: string;
  innerLabelBorderHover: string;
  innerLabelBorderHoverChecked: string;
}>;

export const core: ToggleSwitchTheme = {
  rootWidth: 'initial',
  rootHeight: 'initial',

  transitionSpeed: '.3s',
  borderRadius: '50px',
  labelMovementRange: '23px',

  outerLabelWidth: '45px',
  outerLabelHeight: '24px',

  innerLabelWidth: '21px',
  innerLabelHeight: '22px',
  innerLabelBackgroundColor: palette.white,

  backgroundColor: palette.grey,
  backgroundColorChecked: palette.grey,
  backgroundColorDisabled: palette.disabledButton,
  backgroundColorHover: palette.grey,
  backgroundColorFocus: palette.grey,

  focusOutline: 'none',

  color: palette.white,
  colorChecked: palette.white,
  colorDisabled: palette.white,
  colorCheckedDisabled: palette.white,
  colorHover: palette.white,
  colorFocus: palette.white,

  toggleIconWidth: '8px',
  toggleIconHeight: '6px',
  toggleIconDisplay: 'none',

  outerLabelBorder: 'none',
  outerLabelBorderChecked: 'none',
  outerLabelBorderDisabled: 'none',
  outerLabelBorderHover: 'none',
  outerLabelBorderHoverChecked: 'none',

  innerLabelBorder: 'none',
  innerLabelBorderChecked: 'none',
  innerLabelBorderDisabled: 'none',
  innerLabelBorderHover: 'none',
  innerLabelBorderHoverChecked: 'none'
};
