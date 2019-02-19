import * as React from 'react';
import { getScaleToFillImageURL } from '@wix/image-client-api/dist/imageClientSDK';
import { Image } from '../image';

export interface MediaPlatformItem {
  width: number;
  height: number;
  uri: string;
  alt?: string;
}

export interface WixMediaProps {
  mediaPlatformItem?: MediaPlatformItem;
  width?: number;
  height?: number;
  errorMediaPlatformItem?: MediaPlatformItem;
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
}

export interface WixMediaState {
  src: string;
  errorImageSrc: string;
  alternativeText: string;
}

export class WixMedia extends React.PureComponent<
  WixMediaProps,
  WixMediaState
> {
  constructor(props: WixMediaProps) {
    super(props);

    const { mediaPlatformItem, errorMediaPlatformItem } = props;

    let src = '',
      alternativeText = '',
      errorImageSrc = '';

    if (mediaPlatformItem) {
      src = this.getImageSource(mediaPlatformItem);
      alternativeText = mediaPlatformItem.alt;
    }

    if (errorMediaPlatformItem) {
      errorImageSrc = this.getImageSource(errorMediaPlatformItem);
    }

    this.state = {
      src,
      alternativeText,
      errorImageSrc,
    };
  }

  private getImageSource(mediaPlatformItem: MediaPlatformItem) {
    const { width, height } = this.props;
    const { width: sourceWidth, height: sourceHeight, uri } = mediaPlatformItem;

    return getScaleToFillImageURL(
      uri,
      sourceWidth,
      sourceHeight,
      width || sourceWidth,
      height || sourceHeight,
    );
  }

  render() {
    const { onLoad, onError } = this.props;
    const { src, alternativeText, errorImageSrc } = this.state;

    return (
      <Image
        src={src}
        alt={alternativeText}
        onLoad={onLoad}
        onError={onError}
        errorImage={errorImageSrc}
      />
    );
  }
}
