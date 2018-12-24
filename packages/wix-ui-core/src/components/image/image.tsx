import * as React from 'react';
import { EMPTY_PIXEL } from './fixtures';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLElement>{
  errorImage?: string;
  onError?: (event: errorEvent) => void;
  onLoad?: (event: loadEvent) => void;
}
export interface errorEvent extends React.SyntheticEvent<HTMLImageElement> {
}

export interface loadEvent extends React.SyntheticEvent<HTMLImageElement> {
}

export enum ImageStatus { Loaded, Loading, Error }

export interface ImageState {
    src: string;
    status: ImageStatus;
}

export class Image extends React.PureComponent<ImageProps, ImageState> {

  state = {
    src: this.props.src || EMPTY_PIXEL,
    status: ImageStatus.Loading
  };
  

  render() {
    const { errorImage , ...nativeProps} = this.props

    return (
        <img {...nativeProps} src={this.state.src} onError={this.handleOnError}  onLoad={this.handleOnLoad}/> //srcSet={providedSrcSet} 
    );
  }

  private handleOnLoad: React.EventHandler<loadEvent> = e => {
    this.setState({
      status: ImageStatus.Loaded
    });

    this.props.onLoad!(e);
  }

  private handleOnError: React.EventHandler<errorEvent> = e => {
    console.log('errored')
    this.setState({
        src: this.props.errorImage || EMPTY_PIXEL,
        status: ImageStatus.Error
    });

    this.props.onError!(e);
  };




}
