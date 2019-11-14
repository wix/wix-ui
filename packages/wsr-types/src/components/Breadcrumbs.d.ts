declare namespace __WSR {
  namespace Breadcrumbs {
    export interface BreadcrumbsProps extends BaseComponents.WixComponentProps {
      items: BreadcrumbsItem[];
      onClick?: (item: BreadcrumbsItem) => void;
      activeId?: string | number;
      size?: BreadcrumbsSize;
      theme?: BreadcrumbsTheme;
    }

    export interface BreadcrumbsItem {
      id: string | number;
      value: React.ReactNode;
      link?: string;
      customElement?: React.ReactNode;
      disabled?: boolean;
    }

    export class Breadcrumbs extends BaseComponents.WixComponent<
      BreadcrumbsProps
    > {}

    export type BreadcrumbsSize = "medium" | "large";
    export type BreadcrumbsTheme =
      | "onWhiteBackground"
      | "onGrayBackground"
      | "onDarkBackground";
  }
}

declare module "wix-style-react" {
  export import Breadcrumbs = __WSR.Breadcrumbs.Breadcrumbs;
  export import BreadcrumbsProps = __WSR.Breadcrumbs.BreadcrumbsProps;
}

declare module "wix-style-react/Breadcrumbs" {
  export interface BreadcrumbsProps
    extends __WSR.Breadcrumbs.BreadcrumbsProps {}
  export default __WSR.Breadcrumbs.Breadcrumbs;
}
