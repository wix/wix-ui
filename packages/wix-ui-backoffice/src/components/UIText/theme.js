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
  'T1.4': createTypography(t.fontLight, '16px', '24px', colors.D55),
  'T1.5': createTypography(t.fontLight, '16px', '24px', colors.R10),
  'T1.6': createTypography(t.fontLight, '16px', '24px', colors.P10),
  'T1.7': createTypography(t.fontLight, '16px', '24px', colors.G10),
  T2: createTypography(t.fontRoman, '16px', '24px', colors.D10),
  'T2.1': createTypography(t.fontRoman, '16px', '24px', colors.D40),
  'T2.2': createTypography(t.fontRoman, '16px', '24px', colors.D80),
  'T2.3': createTypography(t.fontRoman, '16px', '24px', colors.B10),
  'T2.4': createTypography(t.fontRoman, '16px', '24px', colors.D55),
  T3: createTypography(t.fontLight, '14px', '18px', colors.D10),
  'T3.1': createTypography(t.fontLight, '14px', '18px', colors.D20),
  'T3.2': createTypography(t.fontLight, '14px', '18px', colors.D80),
  'T3.3': createTypography(t.fontLight, '14px', '18px', colors.B10),
  'T3.4': createTypography(t.fontLight, '14px', '18px', colors.D55),
  'T3.5': createTypography(t.fontLight, '14px', '18px', colors.R10),
  'T3.6': createTypography(t.fontLight, '14px', '18px', colors.P10),
  'T3.7': createTypography(t.fontLight, '14px', '18px', colors.G10),
  T4: createTypography(t.fontRoman, '14px', '18px', colors.D10),
  'T4.1': createTypography(t.fontRoman, '14px', '18px', colors.D20),
  'T4.2': createTypography(t.fontRoman, '14px', '18px', colors.D80),
  'T4.3': createTypography(t.fontRoman, '14px', '18px', colors.B10),
  'T4.4': createTypography(t.fontRoman, '14px', '18px', colors.D40),
  'T4.5': createTypography(t.fontRoman, '14px', '18px', colors.D55),
  'T4.6': createTypography(t.fontRoman, '14px', '18px', colors.R10),
  'T4.7': createTypography(t.fontRoman, '14px', '18px', colors.G10),
  T5: {...createTypography(t.fontMedium, '10px', '12px', colors.D20), textTransform: 'uppercase', letterSpacing: '1px'},
  'T5.1': {...createTypography(t.fontMedium, '10px', '12px', colors.D80), textTransform: 'uppercase', letterSpacing: '1px'}
};

export const theme = props => classes[props.appearance];
