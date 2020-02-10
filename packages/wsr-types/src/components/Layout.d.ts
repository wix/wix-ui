declare namespace __WSR {
  namespace Layout {
    export interface LayoutProps {
      dataHook?: string;
      children?: React.ReactNode;
      gap?: string | number;
      cols?: number;
      justifyItems?: string;
      alignItems?: string;
    }

    export class Layout extends React.Component<LayoutProps> {}
  }
}

declare module 'wix-style-react' {
  export import Layout = __WSR.Layout.Layout;
  export import LayoutProps = __WSR.Layout.LayoutProps;
}

declare module 'wix-style-react/Layout' {
  export interface LayoutProps extends __WSR.Layout.LayoutProps {}
  export default __WSR.Layout.Layout;
}
