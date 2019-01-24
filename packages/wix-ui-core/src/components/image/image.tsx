import * as React from 'react';
import style from './image.st.css';

export enum ImageStatus { loading = 'loading', loaded = 'loaded', error = 'error'}

// FALLBACK_IMAGE - an empty 1x1 pixel we provide as an alternative for the native browser broken pixel image
export const FALLBACK_IMAGE: string = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
export interface ImageProps {
  nativeProps?: React.ImgHTMLAttributes<HTMLImageElement>
  src?: string;
  srcSet?: string;
  alt?: string;
  errorImage?: string;
  resizeMode?: 'fill' | 'contain' | 'cover';
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};
export interface ImageState {
    src?: string;
    status: ImageStatus;
}
 export class Image extends React.PureComponent<ImageProps, ImageState> {
  private getSrc = () :string => 
  !!this.props.src ? this.props.src : this.getSrcSet() 

  private getSrcSet = () :string =>
    !!this.props.srcSet ? this.getErrorImage() : FALLBACK_IMAGE

  private getErrorImage = () :string =>
  !!this.props.errorImage ? this.props.errorImage : FALLBACK_IMAGE

  private getErrorSrc = () :string=> 
    this.state.src === this.props.errorImage ? FALLBACK_IMAGE : this.getErrorImage()

  state = {
    src: this.getSrc(),
    status: ImageStatus.loading
  };
  
  render() {
    const { errorImage, resizeMode, srcSet, nativeProps, ...additionalProps} = this.props;

    if (this.props.resizeMode === 'contain' || this.props.resizeMode === 'cover') {
        const imageWrapper = {
          backgroundImage: `url("${this.state.src}")`,
          backgroundSize: resizeMode
      };
      return (
        <div 
          {...style('root wrapper', {resizeMode, loadState: this.state.status}, this.props)}
          style={imageWrapper}
        >
            <img
                {...additionalProps}
                {...nativeProps}
                className={style.hiddenImage}
                src={this.state.src}
                srcSet = {this.state.status === ImageStatus.error ? null : srcSet}
                onLoad={this.handleOnLoad}
                onError={this.handleOnError}
            />
        </div>
      );
    };

    return (
      <img 
        {...style('root', {resizeMode, loadState: this.state.status}, this.props)}
        {...additionalProps}
        {...nativeProps}
        src={this.state.src} 
        srcSet={this.state.status === ImageStatus.error ? null : srcSet}
        onLoad={this.handleOnLoad}
        onError={this.handleOnError}
      /> 
    );
  };

  private handleOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
    this.setState({
      status: this.state.status === 'error' ? ImageStatus.error : ImageStatus.loaded
    });
    this.props.onLoad && this.props.onLoad(e);
  };

  private handleOnError: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
    this.setState({
        status: ImageStatus.error,
        src: this.getErrorSrc() 
    });
    this.props.onError && this.props.onError(e);
  };
};