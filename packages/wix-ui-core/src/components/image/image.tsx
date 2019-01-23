import * as React from 'react';
import style from './image.st.css';

export enum ImageStatus { loading = 'loading', loaded = 'loaded', error = 'error'}
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
  private setSrc = () :string => 
  !!this.props.src ? this.props.src : this.srcSetExists() 

  private srcSetExists = () :string =>
    !!this.props.srcSet ? this.errorImageExists() : FALLBACK_IMAGE

  private errorImageExists = () :string =>
  !!this.props.errorImage ? this.props.errorImage : FALLBACK_IMAGE

  private setErrorImage = () => 
    this.state.src === this.props.errorImage ? FALLBACK_IMAGE : this.errorImageExists()

  private resized = () =>
    this.props.resizeMode === 'contain' || this.props.resizeMode === 'cover'

  state = {
    src: this.setSrc(),
    status: ImageStatus.loading
  };
  
  render() {
    const { errorImage, resizeMode, srcSet, ...props} = this.props;

    if (this.resized()) {
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
                {...props}
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
        {...props}
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
        src: this.setErrorImage() 
    });
    this.props.onError && this.props.onError(e);
  };
}
