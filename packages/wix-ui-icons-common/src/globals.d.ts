declare module "*.st.css" {
  const stylesheet: import("@stylable/runtime").RuntimeStylesheet;
  export = stylesheet;
}

interface StateMap {
  [key: string]: boolean | number | string;
}

interface Stylesheet {
  namespace: string;
  root: string;
  get: (localName: string) => string;
  cssStates: (stateMapping: StateMap) => StateMap;
}

interface RuntimeHelpers {
  $get: (localName: string) => string;
  $cssStates: (stateMapping: StateMap) => StateMap;
}

type StylesheetLocals = { [key: string]: string } & {
  $stylesheet: Stylesheet;
} & RuntimeHelpers;
