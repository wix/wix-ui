import * as colors from './colors';

export const basePalette = {
  D10: '#162d3d',   // Main input text, titles
  D20: '#32536a',   // Titles, texts
  D30: '#577083',   // Texts
  D40: '#7a92a5',   // Dividers, texts
  D50: '#b6c1cd',   // Dividers, texts
  D55: '#cbd3dc',   // Disabled button - new version - naming not final
  D60: '#dfe5eb',   // Dividers
  D70: '#f0f4f7',   // Page background, dividers
  D80: '#ffffff',   // Content box background

  B00: '#2b81cb',   // Buttons
  B05: '#308ddd',   // CTA
  B10: '#3899ec',   // Main action color, active, buttons
  B20: '#4eb7f5',   // Hover for elements with B10, buttons
  B30: '#c1e4fe',   // Notifications
  B40: '#daeffe',   // Dividers, table selected
  B50: '#eaf7ff',   // Dividers
  B60: '#f4fafe',   // Table hover

  P00: '#8e21b1',
  P10: '#aa4dc8',   // Wix premium
  P20: '#cd68ed',
  P30: '#e5c9ee',
  P40: '#eedbf4',
  P50: '#faeeff',
  P60: '#faf7fc',

  O00: '#ea5f0e',
  O10: '#fb7d33',
  O20: '#ff9a48',

  R00: '#d6453d',
  R05: '#d8504c',   // CTA
  R10: '#ee5951',   // Errors, CTA hover
  R20: '#ff6666',   // Notifications
  R30: '#ffd7d7',   // Notifications
  R40: '#ffe1e1',
  R50: '#ffebeb',
  R60: '#fff5f5',

  G00: '#44823f',
  G05: '#61ad5a',   // CTA
  G10: '#60bc57',   // CTA hover
  G20: '#80c979',   // Notifications
  G30: '#c9eebc',   // Notifications
  G40: '#def4d4',
  G50: '#edf9e5',
  G60: '#f2fbef',

  Y00: '#c68801',
  Y05: '#eda200',   // CTA
  Y10: '#fdb10c',   // CTA hover
  Y20: '#fac249',   // Notifications
  Y30: '#fef0ba',   // Notifications
  Y40: '#fef4cd',
  Y50: '#fdf7df',
  Y60: '#fffcf0'
};

export const palette = {
  heading0Dark: colors.D10,
  heading0Light: colors.D80,
  heading1Dark: colors.D10,
  heading1Light: colors.D80,
  heading2Dark: colors.D10,
  heading2Light: colors.D80,
  heading3Dark: colors.D20,
  heading3Light: colors.D50,

  main: colors.B10,
  mainHover: colors.B20,
  notifications: colors.B30,
  tableSelected: colors.B40,
  dividers: colors.B50,

  ctaHover: colors.G10,
  successHover: colors.G20,
  successNotifications: colors.G30,

  disabledButton: colors.GR40,
  disabledFields: colors.GR20,

  danger: colors.R10,
  dangerHover: colors.R20,
  dangerNotifications: colors.R30,

  mainInputText: colors.D10,
  disabled: colors.D55,
  disabledDividers: colors.D60,
  white: colors.D80
};
