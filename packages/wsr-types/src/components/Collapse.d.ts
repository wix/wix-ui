declare namespace __WSR {
  namespace Collapse {
    export interface CollapseProps {
      dataHook?: string;
      children?: React.ReactNode;
      open?: boolean;
    }

    export class Collapse extends React.Component<CollapseProps> {}
  }
}

declare module 'wix-style-react' {
  export import Collapse = __WSR.Collapse.Collapse;
  export import CollapseProps = __WSR.Collapse.CollapseProps;
}

declare module 'wix-style-react/Collapse' {
  export interface CollapseProps extends __WSR.Collapse.CollapseProps {}
  export default __WSR.Collapse.Collapse;
}
