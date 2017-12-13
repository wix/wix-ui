import * as t from '../../typography';
import * as colors from '../../colors';

const createTypography = (fontFamily, fontSize, lineHeight, color) => ({
  fontFamily,
  fontSize,
  lineHeight,
  color
});

const classes = {
  T1: createTypography(t.fontLight, '16px', '24px', colors.D10),
  'T1.1': createTypography(t.fontLight, '16px', '24px', colors.D20),
  'T1.2': createTypography(t.fontLight, '16px', '24px', colors.D80),
  'T1.3': createTypography(t.fontLight, '16px', '24px', colors.B10),
  'T1.4': createTypography(t.fontLight, '16px', '24px', colors.GR10),
  'T1.5': createTypography(t.fontLight, '16px', '24px', colors.R10),
  'T1.6': createTypography(t.fontLight, '16px', '24px', colors.P10),
  T2: createTypography(t.fontRoman, '16px', '24px', colors.D10),
  'T2.1': createTypography(t.fontRoman, '16px', '24px', colors.D50),
  'T2.2': createTypography(t.fontRoman, '16px', '24px', colors.D80),
  'T2.3': createTypography(t.fontRoman, '16px', '24px', colors.B10),
  T3: createTypography(t.fontLight, '14px', '28px', colors.D10),
  'T3.1': createTypography(t.fontLight, '14px', '28px', colors.D20),
  'T3.2': createTypography(t.fontLight, '14px', '28px', colors.D80),
  'T3.3': createTypography(t.fontLight, '14px', '28px', colors.B10),
  T4: createTypography(t.fontRoman, '14px', '28px', colors.D10),
  'T4.1': createTypography(t.fontRoman, '14px', '28px', colors.D20),
  'T4.2': createTypography(t.fontRoman, '14px', '28px', colors.D80),
  'T4.3': createTypography(t.fontRoman, '14px', '28px', colors.B10),
  T5: {...createTypography(t.fontMedium, '10px', '12px', colors.D20), textTransform: 'uppercase', letterSpacing: '1px'},
  'T5.1': {...createTypography(t.fontMedium, '10px', '12px', colors.D80), textTransform: 'uppercase', letterSpacing: '1px'},
  T6: createTypography(t.fontBold, '10px', '12px', colors.D20),
  'T6.1': createTypography(t.fontBold, '10px', '12px', colors.D80)
};

export const theme = props => classes[props.appearance];
