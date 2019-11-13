declare namespace __WSR {
  namespace FillButton {
    export interface FillButtonProps
      extends React.ButtonHTMLAttributes<HTMLButtonElement> {
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      iconSize?: FillButtonIconSize;
      disabled?: boolean;
      tooltipContent?: React.ReactNode;
      fill?: string;
      tooltipProps?: any; // TODO: replace with TooltipProps once merged to WSR
    }

    export class FillButton extends React.PureComponent<FillButtonProps> {}
    export type FillButtonIconSize = 'small' | 'medium';
  }
}

declare module 'wix-style-react' {
  export import FillButton = __WSR.FillButton.FillButton;
  export import FillButtonProps = __WSR.FillButton.FillButtonProps;
}

declare module 'wix-style-react/FillButton' {
  export interface FillButtonProps extends __WSR.FillButton.FillButtonProps {}
  export default __WSR.FillButton.FillButton;
}
