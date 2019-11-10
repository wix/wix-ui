declare namespace __WSR {
  namespace ToggleButton {
    export interface ToggleButtonProps {
      as?: any;
      skin?: ToggleButtonSkin;
      onClick?: React.MouseEventHandler<HTMLElement>;
      selected?: boolean;
      disabled?: boolean;
      dataHook?: string;
      tooltipContent?: React.ReactNode;
      // TODO: replace with TooltipProps once merged into WSR
      tooltipProps?: object;
    }

    export class ToggleButton extends React.Component<ToggleButtonProps> {}

    export type ToggleButtonSkin = 'standard' | 'dark';
  }
}

declare module 'wix-style-react' {
  export import ToggleButton = __WSR.ToggleButton.ToggleButton;
  export import ToggleButtonProps = __WSR.ToggleButton.ToggleButtonProps;
}

declare module 'wix-style-react/ToggleButton' {
  export interface ToggleButtonProps
    extends __WSR.ToggleButton.ToggleButtonProps {}
  export default __WSR.ToggleButton.ToggleButton;
}
