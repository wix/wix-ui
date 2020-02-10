declare namespace __WSR {
  namespace EndorseContentLayout {
    export interface EndorseContentLayoutProps {
      head?: React.ReactNode,
      content?: React.ReactNode,
      primaryCta?: React.ReactNode,
      secondaryCta?: React.ReactNode
    }

    export const EndorseContentLayout: React.SFC<EndorseContentLayoutProps>;
  }
}

declare module 'wix-style-react' {
  export import EndorseContentLayout = __WSR.EndorseContentLayout.EndorseContentLayout;
  export import EndorseContentLayoutProps = __WSR.EndorseContentLayout.EndorseContentLayoutProps;
}

declare module 'wix-style-react/EndorseContentLayout' {
  export interface EndorseContentLayoutProps extends __WSR.EndorseContentLayout.EndorseContentLayoutProps {}
  export default __WSR.EndorseContentLayout.EndorseContentLayout;
}
