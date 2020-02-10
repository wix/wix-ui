declare namespace __WSR {
  namespace ComposerHeader {
    export interface ComposerHeaderProps {
      dataHook?: string;
      backButtonValue?: React.ReactNode,
      onBackClick?: React.MouseEventHandler<HTMLElement>,
      size?: 'small' | 'medium',
      dropShadow?: boolean
    }

    export class ComposerHeader extends React.Component<ComposerHeaderProps> {
      static SaveStatus: typeof ComposerHeaderSaveStatus;
      static Actions: typeof ComposerHeaderActions;
      static MainActions: typeof ComposerHeaderMainActions;
    }

    const ComposerHeaderSaveStatus: React.SFC<ComposerHeaderSaveStatusProps>;
    interface ComposerHeaderSaveStatusProps {
      saveStatusValue: string,
      saveStatusError?: string,
      dataHook?: string,
      size?: 'small' | 'medium',
    }

    const ComposerHeaderActions: React.SFC;
    const ComposerHeaderMainActions: React.SFC;
  }
}

declare module "wix-style-react" {
  export import ComposerHeader = __WSR.ComposerHeader.ComposerHeader;
  export import ComposerHeaderProps = __WSR.ComposerHeader.ComposerHeaderProps;
}

declare module "wix-style-react/ComposerHeader" {
  export interface ComposerHeaderProps extends __WSR.ComposerHeader.ComposerHeaderProps {}
  export default __WSR.ComposerHeader.ComposerHeader;
}
