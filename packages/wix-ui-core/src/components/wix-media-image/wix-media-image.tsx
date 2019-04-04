import * as React from 'react';
import { getScaleToFillImageURL } from 'image-client-api/dist/imageClientSDK';
import { Image } from '../image';

export interface MediaPlatformItem {
  width: number;
  height: number;
  uri: string;
}

export interface WixMediaProps {
  mediaPlatformItem?: MediaPlatformItem;
  width?: number;
  height?: number;
  errorMediaPlatformItem?: MediaPlatformItem;
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
  alt?: string;
}

export class WixMediaImage extends React.PureComponent<WixMediaProps> {
  static displayName = 'WixMediaImage';

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

  private getKey() {
    const { mediaPlatformItem, errorMediaPlatformItem } = this.props;
    return `${(mediaPlatformItem && mediaPlatformItem.uri) ||
      ''}${(errorMediaPlatformItem && errorMediaPlatformItem.uri) || ''}`;
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
        key={this.getKey()}
        src={this.getImageSource(mediaPlatformItem)}
        alt={alt || ''}
        errorImage={this.getImageSource(errorMediaPlatformItem)}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
}
