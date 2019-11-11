declare namespace __WSRTests {
  interface SkeletonDriver extends BaseDriver {
    getNumLines: () => number;
    hasSpacing: (spacing: __WSR.Skeleton.SkeletonSpacing) => boolean;
    hasSizes: (sizes: __WSR.Skeleton.SkeletonContentSize) => boolean;
    hasAlignment: (alignment: __WSR.Skeleton.SkeletonAlignment) => boolean;
  }
}
