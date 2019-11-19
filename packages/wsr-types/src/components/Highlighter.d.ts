declare namespace __WSR {
  namespace Highlighter {
    export interface HighlighterProps extends BaseComponents.WixComponentProps {
      match?: string;
    }

    export class Highlighter extends BaseComponents.WixComponent<
      HighlighterProps
    > {}
  }
}

declare module "wix-style-react" {
  export import Highlighter = __WSR.Highlighter.Highlighter;
  export import HighlighterProps = __WSR.Highlighter.HighlighterProps;
}

declare module "wix-style-react/Highlighter" {
  export interface HighlighterProps
    extends __WSR.Highlighter.HighlighterProps {}
  export default __WSR.Highlighter.Highlighter;
}
