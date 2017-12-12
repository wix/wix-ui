import * as t from '../../typography';
import {palette} from '../../palette';

const createTypography = (fontFamily, fontSize, lineHeight) => {
  return {
    fontFamily,
    fontSize,
    lineHeight
  };
};

const typographies = {
  H0: createTypography(t.fontUltraThin, '48px', '54px'),
  H1: createTypography(t.fontThin, '36px', '48px'),
  H2: createTypography(t.fontLight, '20px', '36px'),
  H3: {...createTypography(t.fontLight, '13px', '24px'), textTransform: 'uppercase', letterSpacing: '2px'}
};

const colors = {
  H0: {dark: palette.heading0Dark, light: palette.heading0Light},
  H1: {dark: palette.heading1Dark, light: palette.heading1Light},
  H2: {dark: palette.heading2Dark, light: palette.heading2Light},
  H3: {dark: palette.heading3Dark, light: palette.heading3Light}
};

const getClass = (appearance, skin) => {
  return {
    ...typographies[appearance],
    color: colors[appearance][skin]
  };
};

export const theme = ({appearance, skin}) => {
  return getClass(appearance, skin);
};
