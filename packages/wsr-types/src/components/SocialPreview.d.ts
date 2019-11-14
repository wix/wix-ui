declare namespace __WSR {
  namespace SocialPreview {
    export interface SocialPreviewProps {
      dataHook?: string,
      title?: string,
      description?: string,
      previewUrl?: string,
      media?: React.ReactNode,
    }

    export class SocialPreview extends React.Component<
      SocialPreviewProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import SocialPreview = __WSR.SocialPreview.SocialPreview;
  export import SocialPreviewProps = __WSR.SocialPreview.SocialPreviewProps;
}

declare module 'wix-style-react/SocialPreview' {
  export interface SocialPreviewProps
    extends __WSR.SocialPreview.SocialPreviewProps {}
  export default __WSR.SocialPreview.SocialPreview;
}
