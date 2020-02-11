declare namespace __WSR {
  namespace VerticalTabs {
    export interface VerticalTabsProps {
        size?: VerticalTabsSize,
        activeTabId?: number,
        onChange?: (id: number) => void,
        dataHook?: string,
    }

    export class VerticalTabs extends React.Component<VerticalTabsProps> {
      static Footer: typeof Footer;
      static TabsGroup: typeof TabsGroup;
      static TabItem: typeof VerticalTabsItem.VerticalTabsItem;
    }

    export type VerticalTabsSize = 'small' | 'medium';

    const Footer: React.SFC;

    const TabsGroup: React.SFC<TabsGroup>;
    export interface TabsGroup {
      title?: string
    }
  }
}

declare module "wix-style-react" {
  export import VerticalTabs = __WSR.VerticalTabs.VerticalTabs;
  export import VerticalTabsProps = __WSR.VerticalTabs.VerticalTabsProps;
}

declare module "wix-style-react/VerticalTabs" {
  export type VerticalTabsProps = __WSR.VerticalTabs.VerticalTabsProps;
  export default __WSR.VerticalTabs.VerticalTabs;
}
