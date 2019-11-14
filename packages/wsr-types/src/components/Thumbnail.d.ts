declare namespace __WSR {
  namespace Thumbnail {
    export interface ThumbnailProps {
      dataHook?: string;
      title?: React.ReactNode;
      description?: React.ReactNode;
      image?: React.ReactNode;
      size?: ThumbnailSize;
      selected?: boolean;
      disabled?: boolean;
      hideSelectedIcon?: boolean;
      backgroundImage?: React.ReactNode;
      onClick?: (
        event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
      ) => void;
      width?: string | number;
      height?: string | number;
    }

    export class Thumbnail extends React.PureComponent<ThumbnailProps> {}

    export type ThumbnailSize = "tiny" | "small" | "medium";
  }
}

declare module "wix-style-react" {
  export import Thumbnail = __WSR.Thumbnail.Thumbnail;
  export import ThumbnailProps = __WSR.Thumbnail.ThumbnailProps;
}

declare module "wix-style-react/Thumbnail" {
  export type ThumbnailProps = __WSR.Thumbnail.ThumbnailProps;
  export default __WSR.Thumbnail.Thumbnail;
}
