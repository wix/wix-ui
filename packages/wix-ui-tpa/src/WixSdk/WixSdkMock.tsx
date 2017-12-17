import {WixSdk as WixSdkType, SiteStyles} from './WixSdk.d';
const STYLE_PARAMS_CHANGE = 'STYLE_PARAMS_CHANGE';
const THEME_CHANGE = 'THEME_CHANGE';

interface EventHandlers {
  STYLE_PARAMS_CHANGE: Array<Function>;
  THEME_CHANGE: Array<Function>;
}

export class WixSdk implements WixSdkType {
  private eventHandlers: EventHandlers;
  private siteStyles: SiteStyles;

  constructor(siteStyles?: SiteStyles) {
    this.siteStyles = siteStyles || {colors: {}, fonts: {}};
    this.eventHandlers = {[STYLE_PARAMS_CHANGE]: [], [THEME_CHANGE]: []};
  }

  Events = {
    STYLE_PARAMS_CHANGE,
    THEME_CHANGE
  };

  Styles = {
    getStyleParams: () => this.siteStyles,
  };

  addEventListener (event, cb) {
    this.eventHandlers[event].push(cb);
  }

  removeEventListener (event, cb) {
    this.eventHandlers[event] = this.eventHandlers[event].filter(handler => handler !== cb);
  }

  getEventHandlers () {
    return this.eventHandlers;
  }

  setColorParam (key, value) {
    this.siteStyles.colors[key] = value;
    this.eventHandlers[STYLE_PARAMS_CHANGE][0]();
  }

  setFontParam (key, value) {
    this.siteStyles.fonts[key] = value;
    this.eventHandlers[STYLE_PARAMS_CHANGE][0]();
  }
}
