let siteStyles;

let eventHandlers = {
  STYLE_PARAMS_CHANGE: [],
  THEME_CHANGE: []
};

const WixSdk = {
  Styles: {
    getStyleParams: () => siteStyles
  },
  Events: ['STYLE_PARAMS_CHANGE', 'THEME_CHANGE'],
  addEventListener: (event, cb) => eventHandlers[event].push(cb),
  removeEventListener: (event, cb) => 
    eventHandlers[event] = eventHandlers[event].filter(handler => handler !== event)
};

export const WixSdkTestkit = {
  init: (styles = {colors: {}, fonts: {}}) => {
    siteStyles = styles
    eventHandlers = {
      STYLE_PARAMS_CHANGE: [],
      THEME_CHANGE: []
    };
  },
  reset: () => {
    siteStyles = {colors: {}, fonts: {}};
    eventHandlers = {
      STYLE_PARAMS_CHANGE: [],
      THEME_CHANGE: []
    };
  },
  get: () => WixSdk,
  changeColorParam: (key, value) => {
    siteStyles.colors[key] = value;
    eventHandlers['STYLE_PARAMS_CHANGE'][0]();
  },
  changeFontParam: (key, value) => {siteStyles.fonts[key] = value
    siteStyles.fonts[key] = value;
    eventHandlers['STYLE_PARAMS_CHANGE'][0]();    
  },
  getStyles: () => WixSdk.Styles.getStyleParams(),
  getEventHandlers: () => eventHandlers,
};
