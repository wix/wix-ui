
import {palette} from '../../palette';
export type DropdownContentTheme = {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
};

export const core: DropdownContentTheme = {
  backgroundColor: palette.grey,
  borderColor: palette.black,
  borderRadius: '6px',
};
