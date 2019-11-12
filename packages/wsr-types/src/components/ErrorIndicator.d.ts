declare namespace __WSR {
  namespace ErrorIndicator {
    export interface ErrorIndicatorProps
      extends React.HTMLAttributes<HTMLElement> {
      dataHook?: string;
      errorMessage?: string;
      tooltipPlacement?: ErrorIndicatorTooltipPlacement;
    }

    export const ErrorIndicator: React.SFC<ErrorIndicatorProps>;
    export type ErrorIndicatorTooltipPlacement =
      | 'right'
      | 'left'
      | 'top'
      | 'bottom';
  }
}

declare module 'wix-style-react' {
  export import ErrorIndicator = __WSR.ErrorIndicator.ErrorIndicator;
  export import ErrorIndicatorProps = __WSR.ErrorIndicator.ErrorIndicatorProps;
}

declare module 'wix-style-react/ErrorIndicator' {
  export interface ErrorIndicatorProps
    extends __WSR.ErrorIndicator.ErrorIndicatorProps {}
  export default __WSR.ErrorIndicator.ErrorIndicator;
}
