declare namespace __WSR {
  namespace Tag {
    export interface TagProps {
      children: string;
      disabled?: boolean;
      id: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      onRemove?: (id: string) => void;
      removable?: boolean;
      size?: TagSize;
      theme?: TagTheme;
      thumb?: React.ReactElement;
      maxWidth?: number;
      className?: string;
      dataHook?: string;
    }

    export class Tag extends React.PureComponent<TagProps> {}

    export type TagIconSize = 'small' | 'medium';
    export type TagSize = 'tiny' | 'small' | 'medium' | 'large';
    export type TagTheme =
      | 'standard'
      | 'error'
      | 'warning'
      | 'dark'
      | 'neutral'
      | 'light';
  }
}

declare module 'wix-style-react' {
  export import Tag = __WSR.Tag.Tag;
  export import TagProps = __WSR.Tag.TagProps;
}

declare module 'wix-style-react/Tag' {
  export interface TagProps extends __WSR.Tag.TagProps {}
  export default __WSR.Tag.Tag;
}
