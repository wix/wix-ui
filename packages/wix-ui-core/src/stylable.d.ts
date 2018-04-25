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

type StylesheetLocals = {[key: string]: string} & {$stylesheet: Stylesheet} & RuntimeHelpers;
type RuntimeStylesheet = StylesheetLocals & (
  (
      className: string,
      states?: StateMap,
      props?: RuntimeStylesheetProps
  ) => {[key: string]: string}
);
type RuntimeStylesheetBaseProps = {
  className?: string;
};
type RuntimeStylesheetProps = RuntimeStylesheetBaseProps & { [key: string]: any};
