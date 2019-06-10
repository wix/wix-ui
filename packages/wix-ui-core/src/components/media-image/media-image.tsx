import * as React from 'react';
import { getScaleToFillImageURL, getScaleToFitImageURL } from 'image-client-api/dist/imageClientSDK';

import { Image } from '../image';

export interface MediaPlatformItem {
  width: number;
  height: number;
  uri: string;
}

export enum MediaImageResizing {
  FIT = 'fit',
  FILL = 'fill',
}

export interface FocalPointCoordinates {
  x: number,
  y: number,
}

export interface MediaImageOptions {
  focalPoint?: FocalPointCoordinates,
  quality?: number,
}

export interface MediaProps {
  mediaPlatformItem?: MediaPlatformItem;
  width?: number;
  height?: number;
  errorMediaPlatformItem?: MediaPlatformItem;
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
  alt?: string;
  resize?: MediaImageResizing;
  options?: MediaImageOptions;
}

export class MediaImage extends React.Component<MediaProps> {
  static displayName = 'MediaImage';
  static defaultProps = {
    resize: MediaImageResizing.FILL,
    options: {},
  };

  private getImageSource(mediaPlatformItem: MediaPlatformItem) {
    if (mediaPlatformItem) {
      const { width, height, resize, options } = this.props;
      const {
        width: sourceWidth,
        height: sourceHeight,
        uri,
      } = mediaPlatformItem;
      const getScaleToImageURL = resize === MediaImageResizing.FIT ? getScaleToFitImageURL : getScaleToFillImageURL;

      return getScaleToImageURL(
        uri,
        sourceWidth,
        sourceHeight,
        width || sourceWidth,
        height || sourceHeight,
        options,
      );
    }
  }


  render() {
    const {
      onLoad,
      onError,
      mediaPlatformItem,
      errorMediaPlatformItem,
      alt
    } = this.props;

    return (
      <Image
        src={this.getImageSource(mediaPlatformItem)}
        alt={alt}
        errorImage={this.getImageSource(errorMediaPlatformItem)}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
}
