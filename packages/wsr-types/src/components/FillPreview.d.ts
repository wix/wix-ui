declare namespace __WSR {
  namespace FillPreview {
    export type FillPreviewProps = Button.ButtonWithAsProp<{
      fill?: React.ReactNode;
      selected?: boolean;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      disabled?: boolean;
      tabIndex?: number;
      aspectRatio?: string | number;
    }>

    export class FillPreview extends React.Component<FillPreviewProps> {}
  }
}

declare module "wix-style-react" {
  export import FillPreview = __WSR.FillPreview.FillPreview;
  export import FillPreviewProps = __WSR.FillPreview.FillPreviewProps;
}

declare module "wix-style-react/FillPreview" {
  export type FillPreviewProps =__WSR.FillPreview.FillPreviewProps;
  export default __WSR.FillPreview.FillPreview;
}
