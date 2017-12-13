import {basePalette} from '../../palette';
import {SIZE} from './constants';

const hexToRgba = (hex, opacity) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const createBaseColorSkin = (defaultBg, defaultBc, hoverBg, hoverBc, activeBg, activeBc, disabledBg, disabledBc) => ({
  default: {
    backgroundColor: defaultBg,
    borderColor: defaultBc,
    hover: {
      backgroundColor: hoverBg,
      borderColor: hoverBc
    },
    active: {
      backgroundColor: activeBg,
      borderColor: activeBc
    },
    disabled: {
      backgroundColor: disabledBg,
      borderColor: disabledBc
    }
  }
});

const createFullColorSkin = (defaultColor, hoverColor, activeColor) =>
  createBaseColorSkin(defaultColor, defaultColor, hoverColor, hoverColor, activeColor, activeColor, basePalette.D55, basePalette.D55);

const createEmptyColorSkin = (defaultColor, hoverColor, activeColor) =>
  createBaseColorSkin('transparent', defaultColor, hoverColor, hoverColor, activeColor, activeColor, 'transparent', basePalette.D55);

const defaultSkin = {
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

const transparent = {
  [SIZE.small]: {
    padding: '0 18px'
  },
  [SIZE.medium]: {
    padding: '0 24px'
  },
  [SIZE.large]: {
    padding: '0 30px'
  },
  default: {
    backgroundColor: hexToRgba(basePalette.D10, 0.24),
    border: '0',
    hover: {
      backgroundColor: hexToRgba(basePalette.D10, 0.3)
    },
    active: {
      backgroundColor: hexToRgba(basePalette.D10, 0.36)
    },
    disabled: {
      backgroundColor: basePalette.D55,
      borderColor: basePalette.D55
    }
  }
};

const SKIN = {
  default: defaultSkin,
  transparent,
  fullred: createFullColorSkin(basePalette.R10, basePalette.R20, basePalette.R10),
  fullgreen: createFullColorSkin(basePalette.G10, basePalette.G20, basePalette.G00),
  fullblue: createFullColorSkin(basePalette.B10, basePalette.B20, basePalette.B10),
  fullpurple: createFullColorSkin(basePalette.P10, basePalette.P20, basePalette.P10),
  emptyred: createEmptyColorSkin(basePalette.R00, basePalette.R20, basePalette.R10),
  emptygreen: createEmptyColorSkin(basePalette.G10, basePalette.G20, basePalette.G00),
  emptyblue: createEmptyColorSkin(basePalette.B20, basePalette.B20, basePalette.B10),
  emptypurple: createEmptyColorSkin(basePalette.P10, basePalette.P20, basePalette.P10),
  emptybluesecondary: createEmptyColorSkin('transparent', basePalette.B50, 'transparent'),
  login: 'login',
  emptylogin: 'emptylogin',
  transparentblue: createEmptyColorSkin(basePalette.B10, basePalette.B20, basePalette.B10),
  whiteblue: createBaseColorSkin(basePalette.D80, basePalette.D80, basePalette.B20, basePalette.B20, basePalette.B10, basePalette.B10, 'transparent', basePalette.D55),
  whiteblueprimary: createBaseColorSkin(basePalette.D80, basePalette.D80, basePalette.B50, basePalette.B50, basePalette.B40, basePalette.B40, basePalette.D55, basePalette.D55),
  whitebluesecondary: createBaseColorSkin('transparent', basePalette.D80, basePalette.B50, basePalette.B50, basePalette.B40, basePalette.B40, 'transparent', basePalette.D55),
  closeStandard: 'close-standard',
  closeDark: 'close-dark',
  closeTransparent: 'close-transparent',
  iconGreybackground: 'icon-greybackground',
  iconStandard: 'icon-standard',
  iconStandardsecondary: 'icon-standardsecondary',
  iconWhite: 'icon-white',
  iconWhitesecondary: 'icon-whitesecondary'
};

export const theme = ({size, skin}) => ({
  ...SKIN['default'][size],
  ...SKIN[skin].default,
  ...SKIN[skin][size]
});
