import * as React from 'react';
import classNames from 'classnames';

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
  
  img : HTMLImageElement;

  /** This is the resolved content type the the consumer wants to display */
  getRequestedContentType(props) : ContentType {
    const { name, text, icon, imgProps} = props;

    return (
      imgProps ? 'image' :
      icon ? 'icon' :
      text || name ? 'text' :
      DEFAULT_CONTENT_TYPE
    );
  }

  /** This is content type that will be displayed. (If img is loading then this will be the fallback) */
  getCurrentContentType() : ContentType {
    const requestedType = this.getRequestedContentType(this.props);

    if (requestedType === 'image' && !this.state.imgLoaded) {
      const { name, text, icon} = this.props;
      return (
          icon ? 'icon' :
          text || name ? 'text' :
          DEFAULT_CONTENT_TYPE
      );
    } else {
      return requestedType;
    }
  }

  componentDidMount() {
    this.getRequestedContentType(this.props) === 'image' && !this.state.imgLoaded && this.loadImg();
  }

  componentWillReceiveProps(nextProps: AvatarProps) {
    if (!nextProps.imgProps ||
      (!this.props.imgProps || nextProps.imgProps.src !== this.props.imgProps.src)
      ) {
      this.setState({ imgLoaded: false });
      this.img && this.unloadImg();
    }
  }

  componentDidUpdate() {
    this.getRequestedContentType(this.props) === 'image' && !this.img && !this.state.imgLoaded && this.loadImg();
  }

  componentWillUnmount() {
    this.img && this.unloadImg();
  }

  loadImg = () => {
    this.img = new Image();
    this.img.onload = () => {
      this.setState({ imgLoaded: true })
    };
    this.img.src = this.props.imgProps.src;
  }

  unloadImg = () => {
    // TODO: Is this necessary? It is taken from https://github.com/mbrevda/react-image/blob/c402ed3f5d54b88e51eca3326a1e81d964995795/src/index.js#L146
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

  render() {
    const { name, text, icon, imgProps, ...rest} = this.props;

    const contentType = this.getCurrentContentType();
    return (
      <div 
        data-content-type={ contentType } // for testing
        data-img-loaded={ this.state.imgLoaded } // for testing
        {...rest}
        {...style('root',
          {
           imgLoaded: this.state.imgLoaded,
           contentType
          },
          this.props)}
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
          <div className={style.content} data-hook="text-container">
            {textContent}
          </div>
        );
      }
  
      case 'icon': {
        const icon = this.props.icon;
        return React.cloneElement(icon,
            { className:classNames(icon.props.className, style.content) }
          );
      }
  
      case 'image': {
        const {alt, className, ...rest} = this.props.imgProps;

        return (
          <img
            className={classNames(style.content, className)} 
            alt={alt ? alt : this.props.name}
            {...rest}
          />
        );
      }
  
      default: {
        return null;
      }
    }
  }
}

