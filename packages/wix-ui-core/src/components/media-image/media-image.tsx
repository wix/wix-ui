import * as React from 'react';
import { getScaleToFillImageURL } from '@wix/image-client-api/dist/imageClientSDK';
import { Image } from '../image';

export interface MediaPlatformItem {
  width: number;
  height: number;
  uri: string;
}

export interface MediaProps {
  mediaPlatformItem?: MediaPlatformItem;
  width?: number;
  height?: number;
  errorMediaPlatformItem?: MediaPlatformItem;
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
  alt?: string;
}

export class MediaImage extends React.Component<MediaProps> {
  static displayName = 'MediaImage';

  private getImageSource(mediaPlatformItem: MediaPlatformItem) {
    if (mediaPlatformItem) {
      const { width, height } = this.props;
      const {
        width: sourceWidth,
        height: sourceHeight,
        uri,
      } = mediaPlatformItem;

      return getScaleToFillImageURL(
        uri,
        sourceWidth,
        sourceHeight,
        width || sourceWidth,
        height || sourceHeight,
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
