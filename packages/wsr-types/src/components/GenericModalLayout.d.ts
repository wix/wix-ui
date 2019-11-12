declare namespace __WSR {
  namespace GenericModalLayout {
    export interface GenericModalLayoutProps
      extends BaseComponents.WixComponentProps {
      header?: React.ReactNode;
      content?: React.ReactNode;
      footer?: React.ReactNode;
      fullscreen?: boolean;
    }

    export class GenericModalLayout extends BaseComponents.WixComponent<
      GenericModalLayoutProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import GenericModalLayout = __WSR.GenericModalLayout.GenericModalLayout;
  export import GenericModalLayoutProps = __WSR.GenericModalLayout.GenericModalLayoutProps;
}

declare module 'wix-style-react/GenericModalLayout' {
  export interface GenericModalLayoutProps
    extends __WSR.GenericModalLayout.GenericModalLayoutProps {}
  export default __WSR.GenericModalLayout.GenericModalLayout;
}
