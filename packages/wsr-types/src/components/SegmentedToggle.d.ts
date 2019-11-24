declare namespace __WSR {
  namespace SegmentedToggle {
    export interface SegmentedToggleProps {
      dataHook?: string;
      defaultSelected?: React.ReactNode;
      selected?: React.ReactNode;
      onClick?: (event: React.SyntheticEvent, value: string) => void;
      disabled?: boolean;
      children: any[];
    }

    export class SegmentedToggle extends React.Component<SegmentedToggleProps> {
      static Button: typeof SegmentedToggleButton;
      static Icon: typeof SegmentedToggleIcon;
    }

    export interface SegmentedToggleButtonProps {
      prefixIcon?: BaseComponents.IconElement;
      value?: string;
      selected?: boolean;
      disabled?: boolean;
    }

    export const SegmentedToggleButton: React.SFC<SegmentedToggleButtonProps>;

    export interface SegmentedToggleIconProps {
      selected?: boolean;
      value?: string;
      tooltipText?: string;
      disabled?: boolean;
    }
    export class SegmentedToggleIcon extends React.Component<
      SegmentedToggleIconProps
    > {}
  }
}

declare module "wix-style-react" {
  export import SegmentedToggle = __WSR.SegmentedToggle.SegmentedToggle;
  export import SegmentedToggleProps = __WSR.SegmentedToggle.SegmentedToggleProps;
}

declare module "wix-style-react/SegmentedToggle" {
  export interface SegmentedToggleProps
    extends __WSR.SegmentedToggle.SegmentedToggleProps {}
  export default __WSR.SegmentedToggle.SegmentedToggle;
}
