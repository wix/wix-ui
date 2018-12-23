import * as React from 'react';
import { EMPTY_PIXEL } from './fixtures';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLElement>{
  errorImage?: string;
  onError?: (event: errorEvent) => void;
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
    return (
        <img {...this.props} src={this.state.src} onError={this.handleOnError}  onLoad={this.handleOnLoad}/> //srcSet={providedSrcSet} 
    );
  }

  private handleOnLoad: React.EventHandler<loadEvent> = e => {
    this.setState({
      status: ImageStatus.Loaded
    })
  }

  private handleOnError: React.EventHandler<errorEvent> = e => {
    this.setState({
        src: this.props.errorImage || EMPTY_PIXEL,
        status: ImageStatus.Error
    });

    this.props.onError!(e);
  };




}
