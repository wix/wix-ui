import { basePalette as c } from '../../palette';
import {SIZE} from './constants';

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const createBaseColorSkin = (color, bg, border, hoverColor, hoverBg, hoverBc, activeColor, activeBg, activeBc, disabledColor, disabledBg, disabledBc) => ({
  color,
  backgroundColor: bg,
  borderColor: border,
  hover: {
    color: hoverColor,
    backgroundColor: hoverBg,
    borderColor: hoverBc,
  },
  active: {
    color: activeColor,
    backgroundColor: activeBg,
    borderColor: activeBc,
  },
  disabled: {
    color: disabledColor,
    backgroundColor: disabledBg,
    borderColor: disabledBc,
  },
});

const createPrimaryColorSkin = (color, hoverColor) =>
  createBaseColorSkin(c.D80, color, color, c.D80, hoverColor, hoverColor, c.D80, color, color, c.D80, c.D55, c.D55);

const createSecondaryColorSkin = (color, hoverColor) =>
  createBaseColorSkin(color, c.TRANSPARENT, color, c.D80, hoverColor, hoverColor, c.D80, color, color, c.D55, c.TRANSPARENT, c.D55);

const createTertiaryColorSkin = (color, hoverColor) =>
  createBaseColorSkin(color, c.D80, c.D80, c.D80, hoverColor, hoverColor, c.D80, color, color, c.D55, c.TRANSPARENT, c.D55);

const createPrimaryWhiteColorSkin = (color, hoverColor, activeColor) =>
  createBaseColorSkin(color, c.D80, c.D80, color, hoverColor, hoverColor, color, activeColor, activeColor, c.D80, c.D55, c.D55);

const createSecondaryWhiteColorSkin = (color, hoverColor, activeColor) =>
  createBaseColorSkin(c.D80, c.TRANSPARENT, c.D80, color, hoverColor, hoverColor, color, activeColor, activeColor, c.D55, c.TRANSPARENT, c.D55);

const greyscale = hexToRgba(c.D10, 0.24);
const greyscaleHover = hexToRgba(c.D10, 0.3);
const greyscaleActive = hexToRgba(c.D10, 0.36);
const transparentGreyscale = createBaseColorSkin(c.D80, greyscale, c.TRANSPARENT, c.D80, greyscaleHover, c.TRANSPARENT, c.D80, greyscaleActive, c.TRANSPARENT, c.D80, c.D55, c.D55);

const skins = {
  greyscale: transparentGreyscale,
  primaryStandard: createPrimaryColorSkin(c.B10, c.B20),
  primaryError: createPrimaryColorSkin(c.R10, c.R20),
  primaryPremium: createPrimaryColorSkin(c.P10, c.P20),
  primaryWhite: createPrimaryWhiteColorSkin(c.B10, c.B50, c.B40),
  secondaryStandard: createSecondaryColorSkin(c.B10, c.B20),
  secondaryError: createSecondaryColorSkin(c.R10, c.R20),
  secondaryPremium: createSecondaryColorSkin(c.P10, c.P20),
  secondaryWhite: createSecondaryWhiteColorSkin(c.B10, c.B50, c.B40),
  tertiaryStandard: createTertiaryColorSkin(c.B10, c.B20),
};
skins.primaryStandardIcon = skins.primaryStandard;
skins.secondaryStandardIcon = skins.secondaryStandard;

//**************  deprecated themes  *************
skins.fullred = skins.primaryError;
skins.fullgreen = createPrimaryColorSkin(c.G10, c.G20);
skins.fullblue = skins.primaryStandard;
skins.fullpurple = skins.primaryPremium;
skins.emptyred = skins.secondaryError;
skins.emptygreen = createSecondaryColorSkin(c.G10, c.G20);
skins.emptyblue = skins.transparentblue = skins.secondaryStandard;
skins.emptypurple = skins.secondaryPremium;
skins.emptybluesecondary = skins.primaryWhite;
skins.whiteblue = skins.tertiaryStandard;
skins.whiteblueprimary = skins.primaryWhite;
skins.whitebluesecondary = skins.secondaryWhite;
// skins.closeStandard = skins.
// skins.closeDark = skins.
// skins.closeTransparent = skins.
// skins.iconGreybackground = skins.
// skins.iconStandard = skins.
// skins.iconStandardsecondary = skins.
// skins.iconWhite = skins.
// skins.iconWhitesecondary = skins.

const sizes = {
  [SIZE.tiny]: {
    height: '24px',
    borderRadius: '21px',
    padding: '0 12px'
  },
  [SIZE.small]: {
    height: '30px',
    borderRadius: '21px',
    padding: '0 18px'
  },
  [SIZE.medium]: {
    height: '36px',
    borderRadius: '21px',
    padding: '0 24px'
  },
  [SIZE.large]: {
    height: '42px',
    borderRadius: '21px',
    padding: '0 30px'
  }
};

export const theme = ({ size, skin }) => ({
  ...sizes[size],
  ...skins[skin],
});
