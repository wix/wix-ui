declare namespace __WSR {
  namespace Skeleton {
    export interface SkeletonProps extends BaseComponents.WixComponentProps {
      content: SkeletonContent[];
      alignment?: SkeletonAlignment;
      spacing?: SkeletonSpacing;
    }

    export class Skeleton extends BaseComponents.WixComponent<SkeletonProps> {}

    export type SkeletonContent = {
      type: SkeletonContentType;
      size: SkeletonContentSize;
    };
    export type SkeletonContentType = 'line';
    export type SkeletonContentSize = 'small' | 'medium' | 'large' | 'full';
    export type SkeletonAlignment = 'start' | 'middle';
    export type SkeletonSpacing = 'small' | 'medium' | 'large';
  }
}

declare module 'wix-style-react' {
  export import Skeleton = __WSR.Skeleton.Skeleton;
  export import SkeletonProps = __WSR.Skeleton.SkeletonProps;
}

declare module 'wix-style-react/Skeleton' {
  export interface SkeletonProps extends __WSR.Skeleton.SkeletonProps {}
  export default __WSR.Skeleton.Skeleton;
}
