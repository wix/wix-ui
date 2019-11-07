declare namespace __WSR {
  namespace Page {
    export type PagePropsNew = BaseComponents.WixComponentProps & {
      upgrade: true;
      backgroundImageUrl?: string;
      maxWidth?: number;
      minWidth?: number;
      height?: string;
      sidePadding?: number;
      className?: string;
      gradientClassName?: string;
      scrollableContentRef?: (ref: HTMLElement) => void;
      zIndex?: number;
    };

    export type PagePropsOld = BaseComponents.WixComponentProps & {
      upgrade?: false;
      backgroundImageUrl?: string;
      maxWidth?: number;
      minWidth?: number;
      sidePadding?: number;
      className?: string;
      gradientClassName?: string;
      gradientCoverTail?: boolean;
      scrollableContentRef?: (ref: HTMLElement) => void;
    };

    export type PageProps = PagePropsOld | PagePropsNew;

    export class Page extends BaseComponents.WixComponent<PageProps> {
      static Header: typeof PageHeader.PageHeader;
      static Content: typeof Content;
      static FixedContent: typeof FixedContent;
      static Tail: typeof Tail;
      static Sticky: typeof Sticky;
    }

    export interface ContentProps {
      children: React.ReactNode;
      fullScreen?: boolean;
    }
    const Content: React.SFC<ContentProps>;

    export interface FixedContentProps {
      children: React.ReactElement;
    }
    const FixedContent: React.SFC<FixedContentProps>;

    export interface TailProps {
      children: React.ReactElement;
      minimized?: boolean;
    }
    const Tail: React.SFC<TailProps>;

    export interface StickyProps {
      children: React.ReactElement | StickyChildrenRenderFn;
    }
    type StickyChildrenRenderFn = (data: {
      style: string;
      className: string;
    }) => React.ReactElement;
    const Sticky: React.SFC<StickyProps>;
  }
}

declare module 'wix-style-react' {
  export import Page = __WSR.Page.Page;
  export import PageProps = __WSR.Page.PageProps;
}

declare module 'wix-style-react/Page' {
  export type PageProps = __WSR.Page.PageProps;
  export default __WSR.Page.Page;
}
