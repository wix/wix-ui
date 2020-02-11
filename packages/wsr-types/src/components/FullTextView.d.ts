declare namespace __WSR {
  namespace FullTextView {
    export interface FullTextViewProps {
      maxWidth?: number | string;
    }

    export class FullTextView extends React.Component<FullTextViewProps> {}
  }
}

declare module "wix-style-react" {
  export import FullTextView = __WSR.FullTextView.FullTextView;
  export import FullTextViewProps = __WSR.FullTextView.FullTextViewProps;
}

declare module "wix-style-react/FullTextView" {
  export interface FullTextViewProps extends __WSR.FullTextView.FullTextViewProps {}
  export default __WSR.FullTextView.FullTextView;
}
