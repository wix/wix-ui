import * as React from 'react';
import { EMPTY_PIXEL } from './fixtures';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLElement>{
}
export class Image extends React.PureComponent<ImageProps> {
  providedSrc = this.props.src ? this.props.src : EMPTY_PIXEL; 

  render() {
    return (
        <img {...this.props} src={this.providedSrc}/>
    );
  }
}
