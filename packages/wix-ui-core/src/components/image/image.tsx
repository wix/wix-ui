import * as React from 'react';
import { style, classes } from './image.st.css';
import { ImageStatus, FALLBACK_IMAGE } from './consts';

export interface ImageProps {
  nativeProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  src?: string;
  srcSet?: string;
  alt?: string;
  errorImage?: string;
  resizeMode?: 'fill' | 'contain' | 'cover';
  onError?(event: React.SyntheticEvent<HTMLImageElement>): void;
  onLoad?(event: React.SyntheticEvent<HTMLImageElement>): void;
}
export interface ImageState {
  src?: string;
  status: ImageStatus;
}
export class Image extends React.PureComponent<ImageProps, ImageState> {
  private readonly getSrc = (): string =>
    this.props.src ? this.props.src : this.getSrcSet();

  private readonly getSrcSet = (): string =>
    this.props.srcSet ? this.getErrorImage() : FALLBACK_IMAGE;

  private readonly getErrorImage = (): string =>
    this.props.errorImage ? this.props.errorImage : FALLBACK_IMAGE;

  private readonly getErrorSrc = (): string =>
    this.state.src === this.props.errorImage
      ? FALLBACK_IMAGE
      : this.getErrorImage();

  private readonly isErrorState = (): boolean =>
    this.state.status === ImageStatus.error;

  private readonly isResized = (): boolean =>
    this.props.resizeMode === 'contain' || this.props.resizeMode === 'cover';

  private getImageProps() {
    const {
      errorImage,
      resizeMode,
      srcSet,
      nativeProps,
      ...additionalProps
    } = this.props;
    const ret = {
      ...additionalProps,
      ...nativeProps,
      src: this.state.src,
      srcSet: this.isErrorState() ? null : srcSet,
      onLoad: this.handleOnLoad,
      onError: this.handleOnError,
    };

    return ret;
  }

  state = {
    src: this.getSrc(),
    status: ImageStatus.loading,
  };

  render() {
    const { resizeMode } = this.props;

    const commonProps = {
      className: style(
        classes.root,
        { resizeMode: this.props.resizeMode, loadState: this.state.status },
        this.isResized() ? ' wrapper' : '',
      ),
      'data-load-state': this.state.status,
    };

    if (this.isResized()) {
      const imageWrapper = {
        backgroundImage: `url("${this.state.src}")`,
        backgroundSize: resizeMode,
      };
      return (
        <div {...commonProps} style={imageWrapper}>
          <img {...this.getImageProps()} />
        </div>
      );
    }

    return <img {...commonProps} {...this.getImageProps()} />;
  }

  private readonly handleOnLoad: React.EventHandler<
    React.SyntheticEvent<HTMLImageElement>
  > = e => {
    if (!this.isErrorState()) {
      this.setState({
        status:
          this.state.status === 'error'
            ? ImageStatus.error
            : ImageStatus.loaded,
      });
      this.props.onLoad && this.props.onLoad(e);
    }
  };

  private readonly handleOnError: React.EventHandler<
    React.SyntheticEvent<HTMLImageElement>
  > = e => {
    if (!this.isErrorState()) {
      this.setState({
        status: ImageStatus.error,
        src: this.getErrorSrc(),
      });
      this.props.onError && this.props.onError(e);
    }
  };
}
