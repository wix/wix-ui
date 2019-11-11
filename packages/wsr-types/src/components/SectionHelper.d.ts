declare namespace __WSR {
  namespace SectionHelper {
    export interface SectionHelperProps
      extends BaseComponents.WixComponentProps {
      appearance?: SectionHelperAppearance;
      title?: React.ReactNode;
      showCloseButton?: boolean;
      onClose?: React.MouseEventHandler<HTMLElement>;
      onAction?: React.MouseEventHandler<HTMLElement>;
      actionText?: string;
      fullWidth?: boolean;
    }

    export class SectionHelper extends BaseComponents.WixComponent<
      SectionHelperProps
    > {}

    export type SectionHelperAppearance =
      | 'warning'
      | 'standard'
      | 'danger'
      | 'success'
      | 'premium'
      | 'preview'
      | 'experimentalDark';
  }
}

declare module 'wix-style-react' {
  export import SectionHelper = __WSR.SectionHelper.SectionHelper;
  export import SectionHelperProps = __WSR.SectionHelper.SectionHelperProps;
}

declare module 'wix-style-react/SectionHelper' {
  export interface SectionHelperProps
    extends __WSR.SectionHelper.SectionHelperProps {}
  export default __WSR.SectionHelper.SectionHelper;
}
