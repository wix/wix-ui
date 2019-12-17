declare namespace __WSR {
  namespace GooglePreview {
    export interface GooglePreviewProps {
      dataHook?: string;
      title?: string;
      previewUrl?: string;
      description?: string;
    }

    export class GooglePreview extends React.PureComponent<
      GooglePreviewProps
    > {}
  }
}

declare module "wix-style-react" {
  export import GooglePreview = __WSR.GooglePreview.GooglePreview;
  export import GooglePreviewProps = __WSR.GooglePreview.GooglePreviewProps;
}

declare module "wix-style-react/GooglePreview" {
  export interface GooglePreviewProps
    extends __WSR.GooglePreview.GooglePreviewProps {}
  export default __WSR.GooglePreview.GooglePreview;
}
