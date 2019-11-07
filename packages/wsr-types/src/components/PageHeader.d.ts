declare namespace __WSR {
  namespace PageHeader {
    export interface PageHeaderProps extends BaseComponents.WixComponentProps {
      minimized?: boolean;
      hasBackgroundImage?: boolean;
      className?: string;
      breadcrumbs?: React.ReactNode;
      title?: React.ReactNode | TitleRenderFn;
      subtitle?: React.ReactNode;
      showBackButton?: boolean;
      onBackClicked?: React.MouseEventHandler<HTMLButtonElement>;
      actionsBar?: React.ReactNode | ActionsBarRenderFn;
    }

    export class PageHeader extends BaseComponents.WixComponent<
      PageHeaderProps
    > {}

    type TitleRenderFn = (minimized: boolean) => React.ReactNode;

    type ActionsBarRenderFn = (data: {
      minimized: boolean;
      hasBackgroundImage: boolean;
    }) => React.ReactNode;
  }
}

declare module 'wix-style-react' {
  export import PageHeader = __WSR.PageHeader.PageHeader;
  export import PageHeaderProps = __WSR.PageHeader.PageHeaderProps;
}

declare module 'wix-style-react/PageHeader' {
  export interface PageHeaderProps extends __WSR.PageHeader.PageHeaderProps {}
  export default __WSR.PageHeader.PageHeader;
}
