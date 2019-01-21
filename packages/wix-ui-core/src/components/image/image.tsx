import * as React from 'react';
import style from './image.st.css';

export enum ImageStatus { loading, loaded, error }
const EMPTY_PIXEL: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
export interface ImageProps {
  src?: string;
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
  !!this.props.src ? this.props.src : EMPTY_PIXEL

  private errorImageExists = () :string =>
  !!this.props.errorImage ? this.props.errorImage : EMPTY_PIXEL

  private setErrorImage = () => 
    this.state.src === this.props.errorImage ? EMPTY_PIXEL : this.errorImageExists()

  private resized = () =>
    this.props.resizeMode === 'contain' || this.props.resizeMode === 'cover'
  
  state = {
    src: this.setSrc(),
    status: ImageStatus.loading
  };
  
  render() {
    const { errorImage, resizeMode, ...props} = this.props;

    if (this.resized()) {
        const imageWrapper = {
          backgroundImage: `url("${this.state.src}")`,
          backgroundSize: resizeMode
      };
      return (
        <div className={style.imageWrapper} style={imageWrapper}>
            <img
                {...style('root hiddenImage', {resizeMode, loadState: this.state.status}, this.props)}
                {...props}
                src={this.state.src}
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
        onLoad={this.handleOnLoad}
        onError={this.handleOnError}
      /> 
    );
  };

  private handleOnLoad: React.EventHandler<React.SyntheticEvent<HTMLImageElement>> = e => {
    this.setState({
      status: ImageStatus.loaded
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

  // private srcSetExists = () :string =>
  //   !!this.props.srcSet ? this.props.src : EMPTY_PIXEL // The image element natively uses the srcSet instead of src.
}
