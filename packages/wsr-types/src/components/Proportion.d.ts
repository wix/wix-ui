declare namespace __WSR {
  namespace Proportion {
    export interface ProportionProps {
      dataHook?: string;
      className?: string;
      aspectRatio?: number | string;
      children: React.ReactNode;
    }

    export class Proportion extends React.Component<ProportionProps> {}
  }
}

declare module "wix-style-react" {
  export import Proportion = __WSR.Proportion.Proportion;
  export import ProportionProps = __WSR.Proportion.ProportionProps;
}

declare module "wix-style-react/Proportion" {
  export interface ProportionProps extends __WSR.Proportion.ProportionProps {}
  export default __WSR.Proportion.Proportion;
}
