import * as React from 'react';
import classNames from 'classnames';

import {Img} from './img';
import { BaseProps } from '../../types/BaseProps';
import style from './avatar.st.css';
import {ContentType} from './types';

export interface AvatarProps extends BaseProps {
  /* Css class name to be applied to the root element */
  className?: string;
  /* The name of the avatar user. Text initials will be generated from the name. And it will be used as default value for html `title` and `aria-label` attributes. */
  name?: string;
  /* Text to render as content. */
  text?: string;
  /* A node with an icon to be rendered as content. */
  icon?: React.ReactElement<any>;
  /* Props for an <img> tag to be rendered as content. */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {['data-hook']?: string};
}

interface AvatarState {
  imgLoaded: boolean;  
}

const DEFAULT_CONTENT_TYPE : ContentType= 'text' ;
/**
 * Avatar is a type of element that visually represents a user, either as an image, icon or text.
 * 
 * <p>There are 3 props for corresponding content types: `text`, `icon` and `imgProps`.
 * If more than one of these props is supplied (with `name` prop giving default value to the `text` prop),
 * then the resolved content type for display goes according to this priority: image -> icon -> text.
 */
export class Avatar extends React.Component<AvatarProps, AvatarState> {
  static displayName = 'Avatar';
  
  state: AvatarState = { imgLoaded: false }
  
  componentWillReceiveProps(nextProps: AvatarProps) {
    if (nextProps && nextProps.imgProps && 
      (!this.props.imgProps || nextProps.imgProps.src !== this.props.imgProps.src)
      ) {
      this.setState({ imgLoaded: false });
    }
  }

  render() {
    const { name, text, icon, imgProps, ...rest } = this.props;
    
    const contentType: ContentType = 
      imgProps ? 'image' :
      icon ? 'icon' :
      text || name ? 'text' :
      DEFAULT_CONTENT_TYPE;
    
    return (
      <div 
        data-content-type={ contentType } // for testing
        data-img-loaded={ this.state.imgLoaded } // for testing
        {...rest}
        {...style('root', { imgLoaded: this.state.imgLoaded }, this.props)}
      >
        {this.getContent(contentType)}
      </div>
    );
  }

  getContent(contentType: ContentType): React.ReactElement<any> {
    switch (contentType) {
      case 'text': {
        const { name, text } = this.props;
        // TODO: Make initials logic more robust and tested.
        const textContent = text || (name && name.split(' ').map(s=>s[0]).join('')) || '';
        return (
          <div className={style.text} data-hook="text-container">
            {textContent}
          </div>
        );
      }
  
      case 'icon': {
        const icon = this.props.icon;
        return React.cloneElement(icon,
            { className:classNames(icon.props.className, style.icon) }
          );
      }
  
      case 'image': {
        const {icon, text, name} = this.props;
        const {alt, className, ...rest} = this.props.imgProps;

        const fallbackType: ContentType = 
          icon ? 'icon' :
          text || name ? 'text' :
          DEFAULT_CONTENT_TYPE;

        const fallbackContent = this.getContent(fallbackType);
        return (
          <Img
            className={classNames(style.image, className)} 
            alt={alt ? alt : this.props.name}
            {...rest}
            loader={fallbackContent}
            isLoaded={this.state.imgLoaded}
            onLoadedChange={isLoaded => this.setState({ imgLoaded: isLoaded })}
          />
        );
      }
  
      default: {
        return null;
      }
    }
  }
}

