/** This implementation is a subset of https://github.com/mbrevda/react-image/blob/master/src/index.js */
import * as React from 'react'

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Shown while the image is loading. (rendered as the root element) */
  loader?: React.ReactNode;
  /** Is the img loaded. When false, Img will loaded the img, and call onLoad when done */
  isLoaded: boolean;
  /** Called when the img loading state has changed */
  onLoadedChange: (isLoaded: boolean, e?: React.SyntheticEvent<HTMLImageElement>) => void; 
}

/**
 * Image with loader.
 * (Controlled)
 */
export class Img extends React.Component<ImgProps> {

  img : HTMLImageElement;

  handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    this.props.onLoadedChange && this.props.onLoadedChange(true, e);
  }

  loadImg = () => {
    this.img = new Image();
    this.img.onload = this.handleLoad as (HTMLImageElement)=>void //TODO: figure out if this is propper
    this.img.src = this.props.src;
  }

  unloadImg = () => {
    // TODO: Is this necessary?
    delete this.img.onload
    try {
      delete this.img.src
    } catch (e) {
      // On Safari in Strict mode this will throw an exception,
      //  - https://github.com/mbrevda/react-image/issues/187
      // We don't need to do anything about it.
    }
    delete this.img
  }

  componentDidMount() {
    !this.props.isLoaded && this.loadImg();
  }

  componentWillUnmount() {
    this.img && this.unloadImg();
  }

  componentWillReceiveProps(nextProps: ImgProps) {
    if (nextProps && nextProps.src !== this.props.src) {
      this.img && this.unloadImg();
      if (nextProps.isLoaded) {
        throw new Error('img src has changed, so isLoaded should be false');
      }
    }
  }

  componentDidUpdate() {
    !this.props.isLoaded && this.loadImg()
  }

  render() {
    const {loader, isLoaded, onLoadedChange, ...imgProps} = this.props;

    if (isLoaded) {
      return <img {...imgProps} />;
    } else {
      return loader ? loader : null
    }
  }
}