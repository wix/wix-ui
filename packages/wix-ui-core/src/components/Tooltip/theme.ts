import {palette} from '../../palette';

export type TooltipTheme = {
  backgroundColor: string;

  borderWidth: string;
  borderStyle: string;
  borderColor: string;

  borderRadius: string;

  contentPadding: string;
};

export const core: Partial<TooltipTheme> = {
  backgroundColor: palette.white,

  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: palette.black,

  borderRadius: '10px',

  contentPadding: '5px',
};
