import * as React from 'react';
import {
  getScaleToFillImageURL,
  getScaleToFitImageURL,
} from 'image-client-api/dist/imageClientSDK';

import { Image } from '../image';

export interface MediaPlatformItem {
  width: number;
  height: number;
  uri: string;
  options?: MediaItemOptions;
}

export enum MediaImageScaling {
  FIT = 'fit',
  FILL = 'fill',
}

export enum MediaImageUpscaleMethod {
  AUTO = 'auto',
  CLASSIC = 'classic',
  SUPER = 'super',
}

export interface FocalPoint {
  x: number;
  y: number;
}

export interface MediaItemFilters {
  blur?: number;
}

export interface UnsharpMaskOptions {
  amount?: number;
  radius?: number;
  threshold?: number;
}

export interface MediaItemOptions {
  quality?: number;
  focalPoint?: FocalPoint;
  filters?: MediaItemFilters;
  unsharpMask?: UnsharpMaskOptions;
  upscaleMethod?: MediaImageUpscaleMethod;
  watermark?: string;
  isSEOBot?: boolean;
  name?: string;
}

export interface MediaProps {
  mediaPlatformItem?: MediaPlatformItem;
  width?: number;
  height?: number;
  errorMediaPlatformItem?: MediaPlatformItem;
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
  alt?: string;
  scale?: MediaImageScaling;
}

export class MediaImage extends React.Component<MediaProps> {
  static displayName = 'MediaImage';
  static defaultProps = {
    scale: MediaImageScaling.FILL,
  };

  private getImageSource(mediaPlatformItem: MediaPlatformItem) {
    if (mediaPlatformItem) {
      const { width, height, scale } = this.props;
      const {
        width: sourceWidth,
        height: sourceHeight,
        uri,
      } = mediaPlatformItem;
      const { options } = mediaPlatformItem;
      const getScaleToImageURL =
        scale === MediaImageScaling.FIT
          ? getScaleToFitImageURL
          : getScaleToFillImageURL;

      return getScaleToImageURL(
        uri,
        sourceWidth,
        sourceHeight,
        width || sourceWidth,
        height || sourceHeight,
        options || {},
      );
    }
  }

  render() {
    const {
      onLoad,
      onError,
      mediaPlatformItem,
      errorMediaPlatformItem,
      alt,
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
