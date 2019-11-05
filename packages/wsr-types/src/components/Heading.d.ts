declare namespace __WSR {
  namespace Heading {
    export interface HeadingProps
      extends React.HTMLAttributes<HTMLHeadingElement>,
        BaseComponents.EllipsisHOCProps {
      dataHook?: string;
      light?: boolean;
      appearance?: HeadingAppearance;
    }

    export const Heading: React.SFC<HeadingProps>;

    export type HeadingAppearance = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
  }
}

declare module 'wix-style-react' {
  export import Heading = __WSR.Heading.Heading;
  export import HeadingProps = __WSR.Heading.HeadingProps;
}

declare module 'wix-style-react/Heading' {
  export interface HeadingProps extends __WSR.Heading.HeadingProps {}
  export default __WSR.Heading.Heading;
}
