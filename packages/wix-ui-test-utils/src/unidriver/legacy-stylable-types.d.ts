export type StateValue = boolean | number | string;

export interface StateMap {
  [stateName: string]: StateValue;
}

export interface CompatStylesheet {
  $cssStates(states?: StateMap | null): { className: string };
}
export interface LegacyStylesheet {
  $cssStates(states?: StateMap | null): StateMap;
}

export interface StylesheetV2 {
  cssStates(states?: StateMap | null): string;
}

export type CommonStylesheet =
  | LegacyStylesheet
  | CompatStylesheet
  | StylesheetV2;

// export type CommonStylesheet<T extends any = any> = T extends LegacyStylesheet
//   ? LegacyStylesheet
//   : T extends CompatStylesheet
//   ? CompatStylesheet
//   : StylesheetV2;
