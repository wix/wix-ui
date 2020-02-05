declare namespace __WSR {
  namespace Tabs {
    export interface TabsProps {
      activeId?: string | number;
      dataHook?: string;
      hasDivider?: boolean;
      items: Item[];
      minWidth?: string | number;
      type?: '' | 'compact' | 'compactSide' | 'uniformSide' | 'uniformFull';
      sideContent?: React.ReactNode;
      width?: string | number;
      onClick?: (item: Item) => void;
    }

    export type Item = {
      id: string | number;
      title: React.ReactNode;
      dataHook?: string;
    }

    export class Tabs extends React.PureComponent<TabsProps> {}
  }
}

declare module 'wix-style-react' {
  export import Tabs = __WSR.Tabs.Tabs;
  export import TabsProps = __WSR.Tabs.TabsProps;
}

declare module 'wix-style-react/Tabs' {
  export interface TabsProps extends __WSR.Tabs.TabsProps {}
  export default __WSR.Tabs.Tabs;
}
