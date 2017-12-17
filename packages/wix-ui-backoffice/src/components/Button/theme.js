import * as c from '../../colors';
import {SIZE} from './constants';
import {hexToRgba} from '../../utils';

const createBaseColorSkin = (color, bg, border, hoverColor, hoverBg, hoverBc, activeColor, activeBg, activeBc, disabledColor, disabledBg, disabledBc) => ({
  color,
  backgroundColor: bg,
  borderColor: border,
  hover: {
    color: hoverColor,
    backgroundColor: hoverBg,
    borderColor: hoverBc
  },
  active: {
    color: activeColor,
    backgroundColor: activeBg,
    borderColor: activeBc
  },
  disabled: {
    color: disabledColor,
    backgroundColor: disabledBg,
    borderColor: disabledBc
  }
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

const createTransparentColorSkin = (color, hover, active) =>
  createBaseColorSkin(color, c.TRANSPARENT, c.TRANSPARENT, hover, c.TRANSPARENT, c.TRANSPARENT, active, c.TRANSPARENT, c.TRANSPARENT, c.D55, c.TRANSPARENT, c.TRANSPARENT);

const greyscale = hexToRgba(c.D10, 0.24);
const greyscaleHover = hexToRgba(c.D10, 0.3);
const greyscaleActive = hexToRgba(c.D10, 0.36);
const transparentGrey = createBaseColorSkin(c.D80, greyscale, c.TRANSPARENT, c.D80, greyscaleHover, c.TRANSPARENT, c.D80, greyscaleActive, c.TRANSPARENT, c.D80, c.D55, c.D55);
const secondaryGrey = createBaseColorSkin(c.D40, c.TRANSPARENT, c.D40, c.D80, c.D20, c.D20, c.D80, c.D10, c.D10, c.D80, c.D55, c.D55);

const skins = {
  transparentGrey,
  secondaryGrey,
  primaryStandard: createPrimaryColorSkin(c.B10, c.B20),
  primaryError: createPrimaryColorSkin(c.R10, c.R20),
  primaryPremium: createPrimaryColorSkin(c.P10, c.P20),
  primaryWhite: createPrimaryWhiteColorSkin(c.B10, c.B50, c.B40),
  secondaryStandard: createSecondaryColorSkin(c.B10, c.B20),
  secondaryError: createSecondaryColorSkin(c.R10, c.R20),
  secondaryPremium: createSecondaryColorSkin(c.P10, c.P20),
  secondaryWhite: createSecondaryWhiteColorSkin(c.B10, c.B50, c.B40),
  tertiaryStandard: createTertiaryColorSkin(c.B10, c.B20),
  'close-standard': createTransparentColorSkin(c.B10, c.B20, c.B10),
  'close-dark': createTransparentColorSkin(c.D10, c.D10, c.D10),
  'close-white': createTransparentColorSkin(c.B40, c.B50, c.B40),
  'close-lightBlue': createBaseColorSkin(c.B10, c.B30, c.B30, c.B10, c.B40, c.B40, c.B10, c.B30, c.B30, c.D80, c.D55, c.D55),
  'close-transparent': transparentGrey
};

//**************************  deprecated themes (support for wix-react-style) **************************
skins.transparent = skins.transparentGrey;
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
skins['icon-standard'] = skins.primaryStandard;
skins['icon-standardsecondary'] = skins.secondaryStandard;
skins['icon-greybackground'] = skins.tertiaryStandard;
skins['icon-white'] = skins.primaryWhite;
skins['icon-whitesecondary'] = skins.secondaryWhite;

const sizes = {
  [SIZE.tiny]: {
    height: '24px',
    borderRadius: '21px',
    padding: '0',
    contentPadding: '0 12px'
  },
  [SIZE.small]: {
    height: '30px',
    borderRadius: '21px',
    padding: '0',
    contentPadding: '0 18px'
  },
  [SIZE.medium]: {
    height: '36px',
    borderRadius: '21px',
    padding: '0',
    contentPadding: '0 24px'
  },
  [SIZE.large]: {
    height: '42px',
    borderRadius: '21px',
    padding: '0',
    contentPadding: '0 30px'
  }
};

const iconSizes = {
  [SIZE.small]: {
    height: '30px',
    width: '30px',
    borderRadius: '50px',
    padding: 0
  },
  [SIZE.medium]: {
    height: '36px',
    width: '36px',
    borderRadius: '50px',
    padding: 0
  }
};

const closeSizes = {
  [SIZE.medium]: {
    height: '18px',
    width: '18px',
    borderRadius: '50px',
    padding: 0
  },
  [SIZE.large]: {
    height: '24px',
    width: '24px',
    borderRadius: '50px',
    padding: 0
  }
};

const getSizeAttributes = (skin, size, isIcon) => {
  if (skin.startsWith('close')) {
    return closeSizes[size];
  }
  if (skin.startsWith('icon') || isIcon) {
    return iconSizes[size];
  }
  return sizes[size];
};

export const theme = ({skin, size, isIcon}) => {
  const sizeAttributes = getSizeAttributes(skin, size, isIcon);

  if (!sizeAttributes) {
    throw new Error(`Button height "${size}" is not supported for these props: theme - "${skin}", isIcon - ${isIcon}`);
  }

  return {
    ...sizeAttributes,
    ...skins[skin]
  };
};
