declare namespace __WSR {
  namespace VerticalTabsItem {
    export interface VerticalTabsItemProps {
      type?: VerticalTabsItemType,
      dataHook?: string,
      prefixIcon?: BaseComponents.IconElement,
      suffixIcon?: BaseComponents.IconElement,
      disabled?: boolean,
      id?: number,
    }

    export class VerticalTabsItem extends React.PureComponent<VerticalTabsItemProps> {}
    export type VerticalTabsItemType = 'tab' | 'action' | 'title';
  }
}

declare module "wix-style-react" {
  export import VerticalTabsItem = __WSR.VerticalTabsItem.VerticalTabsItem;
  export import VerticalTabsItemProps = __WSR.VerticalTabsItem.VerticalTabsItemProps;
}

declare module "wix-style-react/VerticalTabsItem" {
  export type VerticalTabsItemProps = __WSR.VerticalTabsItem.VerticalTabsItemProps;
  export default __WSR.VerticalTabsItem.VerticalTabsItem;
}
