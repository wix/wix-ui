declare namespace __WSR {
  namespace EmptyState {
    export interface EmptyStateProps {
      theme?: EmptyStateTheme;
      title?: string | React.ReactNode;
      subtitle?: string | React.ReactNode;
      image?: string | JSX.Element;
      classNames?: { imageContainer?: string };
      dataHook?: string;
    }

    export const EmptyState: React.SFC<EmptyStateProps>;

    export type EmptyStateTheme = 'page' | 'page-no-border' | 'section';
  }
}

declare module 'wix-style-react' {
  export import EmptyState = __WSR.EmptyState.EmptyState;
  export import EmptyStateProps = __WSR.EmptyState.EmptyStateProps;
}

declare module 'wix-style-react/EmptyState' {
  export interface EmptyStateProps extends __WSR.EmptyState.EmptyStateProps {}
  export default __WSR.EmptyState.EmptyState;
}
