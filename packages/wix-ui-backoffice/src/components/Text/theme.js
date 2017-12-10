import * as t from './typography';

const createTypography = (fontFamily, fontSize, lineHeight, color) => {
  return {
    fontFamily,
    fontSize,
    lineHeight,
    color
  };
};

const classes = {
  H0: createTypography(t.fontUltraThin, '48px', '54px', t.D10),
  H1: createTypography(t.fontThin, '36px', '48px', t.D10),
  'H1.1': createTypography(t.fontThin, '36px', '48px', t.D80),
  H2: createTypography(t.fontLight, '20px', '36px', t.D10),
  'H2.1': createTypography(t.fontLight, '20px', '36px', t.D80),
  H3: {...createTypography(t.fontLight, '13px', '24px', t.D20), textTransform: 'uppercase', letterSpacing: '2px'},
  H4: {...createTypography(t.fontRoman, '10px', '18px', t.D20), textTransform: 'uppercase', letterSpacing: '1.px'},
  T1: createTypography(t.fontLight, '16px', '24px', t.D10),
  'T1.1': createTypography(t.fontLight, '16px', '24px', t.D20),
  'T1.2': createTypography(t.fontLight, '16px', '24px', t.D80),
  'T1.3': createTypography(t.fontLight, '16px', '24px', t.B10),
  'T1.4': createTypography(t.fontLight, '16px', '24px', t.GR10),
  'T1.5': createTypography(t.fontLight, '16px', '24px', t.R10),
  'T1.6': createTypography(t.fontLight, '16px', '24px', t.P10),
  T2: createTypography(t.fontRoman, '16px', '24px', t.D10),
  'T2.1': createTypography(t.fontRoman, '16px', '24px', t.D50),
  'T2.2': createTypography(t.fontRoman, '16px', '24px', t.D80),
  'T2.3': createTypography(t.fontRoman, '16px', '24px', t.B10),
  T3: createTypography(t.fontLight, '14px', '28px', t.D10),
  'T3.1': createTypography(t.fontLight, '14px', '28px', t.D20),
  'T3.2': createTypography(t.fontLight, '14px', '28px', t.D80),
  'T3.3': createTypography(t.fontLight, '14px', '28px', t.B10),
  T4: createTypography(t.fontRoman, '14px', '28px', t.D10),
  'T4.1': createTypography(t.fontRoman, '14px', '28px', t.D20),
  'T4.2': createTypography(t.fontRoman, '14px', '28px', t.D80),
  'T4.3': createTypography(t.fontRoman, '14px', '28px', t.B10),
  T5: {...createTypography(t.fontMedium, '10px', '12px', t.D20), textTransform: 'uppercase', letterSpacing: '1px'},
  'T5.1': {...createTypography(t.fontMedium, '10px', '12px', t.D80), textTransform: 'uppercase', letterSpacing: '1px'},
  T6: createTypography(t.fontBold, '10px', '12px', t.D20),
  'T6.1': createTypography(t.fontBold, '10px', '12px', t.D80)
};

export const theme = props => {
  return classes[props.appearance];
};
