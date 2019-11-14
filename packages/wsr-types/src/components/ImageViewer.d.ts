declare namespace __WSR {
  namespace ImageViewer {
    export interface ImageViewerProps {
      imageUrl?: string;
      error?: boolean;
      errorMessage?: string;
      /** Error tooltp placement
       * @deprecated
       * @see tooltipProps
       */
      tooltipPlacement?: any; // TODO: replace with TooltipProps["placement"];
      tooltipProps?: any; // TODO: replace with Omit<TooltipProps, "content">;
      showUpdateButton?: boolean;
      showRemoveButton?: boolean;
      onAddImage?: React.MouseEventHandler<HTMLElement>;
      onUpdateImage?: React.MouseEventHandler<HTMLElement>;
      onRemoveImage?: React.MouseEventHandler<HTMLElement>;
      onImageLoad?: React.ReactEventHandler<HTMLImageElement>;
      addImageInfo?: string;
      updateImageInfo?: string;
      removeImageInfo?: string;
      removeRoundedBorders?: boolean;
      width?: number | string;
      height?: number | string;
      disabled?: boolean;
    }

    export class ImageViewer extends React.Component<ImageViewerProps> {}
  }
}

declare module "wix-style-react" {
  export import ImageViewer = __WSR.ImageViewer.ImageViewer;
  export import ImageViewerProps = __WSR.ImageViewer.ImageViewerProps;
}

declare module "wix-style-react/ImageViewer" {
  export interface ImageViewerProps
    extends __WSR.ImageViewer.ImageViewerProps {}
  export default __WSR.ImageViewer.ImageViewer;
}
