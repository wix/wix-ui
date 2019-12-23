declare namespace __WSR {
  namespace ToggleSwitch {
    export interface ToggleSwitchProps {
      dataHook?: string;
      skin?: ToggleSwitchSkin;
      size?: ToggleSwitchSize;
      checked?: boolean;
      disabled?: boolean;
      id?: string;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      tabIndex?: number;
    }

    export class ToggleSwitch extends React.PureComponent<ToggleSwitchProps> {}
    export type ToggleSwitchSkin = "standard" | "success" | "error";
    export type ToggleSwitchSize = "small" | "medium" | "large";
  }
}

declare module "wix-style-react" {
  export import ToggleSwitch = __WSR.ToggleSwitch.ToggleSwitch;
  export import ToggleSwitchProps = __WSR.ToggleSwitch.ToggleSwitchProps;
}

declare module "wix-style-react/ToggleSwitch" {
  export interface ToggleSwitchProps
    extends __WSR.ToggleSwitch.ToggleSwitchProps {}
  export default __WSR.ToggleSwitch.ToggleSwitch;
}
