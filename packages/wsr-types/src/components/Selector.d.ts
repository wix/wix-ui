declare namespace __WSR {
  namespace Selector {
    export interface SelectorProps extends BaseComponents.WixComponentProps {
      id: string | number;
      title: string;
      image?: React.ReactNode;
      imageSize?: SelectorImageSize;
      imageShape?: SelectorImageShape;
      isSelected?: boolean;
      isDisabled?: boolean;
      subtitle?: string;
      extraNode?: React.ReactNode;
      onToggle?: (id: SelectorProps['id']) => void;
      toggleType?: SelectorToggleType;
    }

    export class Selector extends BaseComponents.WixComponent<SelectorProps> {
      static ExtraText: typeof SelectorExtraText;
      static ProgressBar: typeof SelectorProgressBar;
    }

    export interface SelectorExtraTextProps
      extends BaseComponents.WixComponentProps {
      text: string;
    }
    export class SelectorExtraText extends BaseComponents.WixComponent<
      SelectorExtraTextProps
    > {}

    export interface SelectorProgressBarProps
      extends BaseComponents.WixComponentProps {
      progress: number;
    }
    export class SelectorProgressBar extends BaseComponents.WixComponent<
      SelectorProgressBarProps
    > {}

    export type SelectorImageSize =
      | 'tiny'
      | 'small'
      | 'portrait'
      | 'large'
      | 'cinema';
    export type SelectorImageShape = 'rectangular' | 'circle';
    export type SelectorToggleType = 'checkbox' | 'radio';
  }
}

declare module 'wix-style-react' {
  export import Selector = __WSR.Selector.Selector;
  export import SelectorProps = __WSR.Selector.SelectorProps;
}

declare module 'wix-style-react/Selector' {
  export interface SelectorProps extends __WSR.Selector.SelectorProps {}
  export default __WSR.Selector.Selector;
}
