export interface WixSdk {
  Events: object;
  addEventListener: Function;
  removeEventListener: Function;
  Styles: {getStyleParams: () => SiteStyles};
}

export interface SiteStyles {
  colors: object;
  fonts: object;
  [x: string]: any;
}
