export type StateValue = boolean | number | string;

export interface StateMap {
  [stateName: string]: StateValue;
}

export interface CompatStylesheet {
  $cssStates(states: StateMap): { className: string };
}
export interface LegacyStylesheet {
  $cssStates(states: StateMap): { [key: string]: string };
}

export interface StylesheetV2 {
  cssStates(states: StateMap): string;
}

export type CommonStylesheet =
  | CompatStylesheet
  | LegacyStylesheet
  | StylesheetV2;
