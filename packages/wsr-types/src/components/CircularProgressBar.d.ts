declare namespace __WSR {
  namespace CircularProgressBar {
    export interface CircularProgressBarProps {
      error?: boolean;
      errorLabel?: string;
      errorMessage?: string;
      light?: boolean;
      showProgressIndication?: boolean;
      size?: CircularProgressBarSize;
      value?: number | string;
      dataHook?: string;
      shouldLoadAsync?: boolean;
    }

    export class CircularProgressBar extends React.PureComponent<
      CircularProgressBarProps
    > {}

    export type CircularProgressBarSize = "small" | "medium" | "large";
  }
}

declare module "wix-style-react" {
  export import CircularProgressBar = __WSR.CircularProgressBar.CircularProgressBar;
  export import CircularProgressBarProps = __WSR.CircularProgressBar.CircularProgressBarProps;
}

declare module "wix-style-react/CircularProgressBar" {
  export interface CircularProgressBarProps
    extends __WSR.CircularProgressBar.CircularProgressBarProps {}
  export default __WSR.CircularProgressBar.CircularProgressBar;
}
