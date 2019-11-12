declare namespace __WSR {
  namespace LinearProgressBar {
    export interface LinearProgressBarProps {
      error?: boolean;
      errorMessage?: string;
      light?: boolean;
      showProgressIndication?: boolean;
      value?: number | string;
      shouldLoadAsync?: boolean;
    }

    export class LinearProgressBar extends React.PureComponent<
      LinearProgressBarProps
    > {}
  }
}

declare module 'wix-style-react' {
  export import LinearProgressBar = __WSR.LinearProgressBar.LinearProgressBar;
  export import LinearProgressBarProps = __WSR.LinearProgressBar.LinearProgressBarProps;
}

declare module 'wix-style-react/LinearProgressBar' {
  export interface LinearProgressBarProps
    extends __WSR.LinearProgressBar.LinearProgressBarProps {}
  export default __WSR.LinearProgressBar.LinearProgressBar;
}
