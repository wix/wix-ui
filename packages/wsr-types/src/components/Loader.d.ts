declare namespace __WSR {
  namespace Loader {
    export interface LoaderProps
      extends __WSR.BaseComponents.WixComponentProps {
      size?: LoaderSize;
      color?: LoaderColor;
      text?: React.ReactNode;
      status?: LoaderStatus;
      statusMessage?: string;
      shouldLoadAsync?: boolean;
    }

    export class Loader extends __WSR.BaseComponents.WixComponent<
      LoaderProps
    > {}

    export type LoaderSize = 'tiny' | 'small' | 'medium' | 'large';

    export type LoaderColor = 'blue' | 'white';

    export type LoaderStatus = 'loading' | 'success' | 'error';
  }
}

declare module 'wix-style-react' {
  export import Loader = __WSR.Loader.Loader;
  export import LoaderProps = __WSR.Loader.LoaderProps;
}

declare module 'wix-style-react/Loader' {
  export interface LoaderProps extends __WSR.Loader.LoaderProps {}
  export default __WSR.Loader.Loader;
}
