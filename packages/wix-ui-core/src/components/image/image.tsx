import * as React from 'react';
import { EMPTY_PIXEL } from './fixtures';
import style from './image.st.css';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLElement>{
  errorImage?: string;
  onError?: (event: errorEvent) => void;
  onLoad?: (event: loadEvent) => void;
}
export interface errorEvent extends React.SyntheticEvent<HTMLImageElement> {
}

export interface loadEvent extends React.SyntheticEvent<HTMLImageElement> {
}

export enum ImageStatus { loading, loaded, error }

export interface ImageState {
    src: string;
    status: ImageStatus;
}

export class Image extends React.PureComponent<ImageProps, ImageState> {

  state = {
    src: this.props.src || EMPTY_PIXEL,
    status: ImageStatus.loading
  };
  

  render() {
    const { errorImage , ...nativeProps} = this.props

    return (
        <img 
        {...style('root', {}, this.props)}
        {...nativeProps}
        src={this.state.src} 
        onError={this.handleOnError}  
        onLoad={this.handleOnLoad}
        /> 
    );
  }

  private handleOnLoad: React.EventHandler<loadEvent> = e => {
    this.setState({
      status: ImageStatus.loaded
    });

    this.props.onLoad!(e);
  }

  private handleOnError: React.EventHandler<errorEvent> = e => {
    this.setState({
        status: ImageStatus.error,
        src: this.state.src == this.props.errorImage ? EMPTY_PIXEL : this.srcPathExists(this.props.errorImage) ? this.props.errorImage : EMPTY_PIXEL
    });

    this.props.onError!(e)
  };

  private srcPathExists = (path: string) => 
     !path.length || path == null ? false : true
}
