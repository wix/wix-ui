import * as React from 'react';
import style from './ImageStyle.st.css';

export interface ImageEvent extends React.SyntheticEvent<HTMLImageElement> {
  src: string;
}

export interface ImageProps extends React.HTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  title?: string;
  resizeMode?: 'fill' | 'cover' | 'contain';

  onLoad?: (event: ImageEvent) => void;
  onError?: (event: ImageEvent) => void;
  defaultImage?: string;
  errorImage?: string;
}

export enum ImageStatus { Loaded, Loading, Error }

export interface ImageState {
  src: string;
  status: ImageStatus;
}

export class Image extends React.PureComponent<ImageProps, ImageState> {
  public static defaultProps: Partial<ImageProps> = {
    onLoad: () => {},
    onError: () => {}
  };

  public render() {
    const {resizeMode, alt, title} = this.props;

    // 'fill' is the default image behavior, so no need to put it on background
    if (resizeMode === 'contain' || resizeMode === 'cover') {
      const wrapperStyle = {
        backgroundImage: `url("${this.state.src}")`,
        backgroundSize: resizeMode,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };

      return (
        <div {...style('root', {}, this.props)} style={wrapperStyle}>
          <img
            alt={alt}
            title={title}
            data-hook="NATIVE_IMAGE"
            className={style.hiddenImage}
            src={this.state.src}
            onLoad={this.onLoad}
            onError={this.onError}
          />
        </div>
      );
    }

    return (
      <img
        {...style('root', {}, this.props)}
        alt={alt}
        title={title}
        data-hook="NATIVE_IMAGE"
        src={this.state.src}
        onLoad={this.onLoad}
        onError={this.onError}
      />
    );
  }
  public componentWillMount() {
    this.setState({
      src: this.props.src || this.props.defaultImage!,
      status: ImageStatus.Loading
    });
  }

  public componentWillReceiveProps(newProps: ImageProps) {
    this.setState({
      src: newProps.src || this.props.defaultImage!,
      status: ImageStatus.Loading
    });
  }

  private onError: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
    this.setState({
      src: this.getFallbackSrc(),
      status: ImageStatus.Error
    });
    this.props.onError!({...e, src: this.state.src});
  };

  private onLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
    if (this.state.status !== ImageStatus.Error) {
      this.setState({status: ImageStatus.Loaded});
      this.props.onLoad!({...e, src: this.state.src});
    }
  };

  private getFallbackSrc(): string {
    return this.props.errorImage;
  }
}
