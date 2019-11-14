declare namespace __WSR {
  namespace FillPreview {
    export interface FillPreviewProps {
      fill?: React.ReactNode;
      selected?: boolean;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
    }

    export class FillPreview extends React.Component<FillPreviewProps> {}
  }
}

declare module "wix-style-react" {
  export import FillPreview = __WSR.FillPreview.FillPreview;
  export import FillPreviewProps = __WSR.FillPreview.FillPreviewProps;
}

declare module "wix-style-react/FillPreview" {
  export interface FillPreviewProps
    extends __WSR.FillPreview.FillPreviewProps {}
  export default __WSR.FillPreview.FillPreview;
}
