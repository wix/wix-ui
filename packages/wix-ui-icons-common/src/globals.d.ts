declare module '*.st.css' {
  const stylesheet: RuntimeStylesheet;
  export default stylesheet;
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

type StylesheetLocals = { [key: string]: string } & { $stylesheet: Stylesheet } & RuntimeHelpers;
type RuntimeStylesheet = StylesheetLocals & (
  (
    className: string,
    states?: StateMap,
    props?: { className?: string, [key: string]: any }
  ) => { [key: string]: string }
);
