import * as React from "react";

import { BaseProps } from "../../types/BaseProps";
import style from "./avatar.st.css";
import {ContentType} from './types';

export interface AvatarProps extends BaseProps {
  /* Css class name to be applied to the root element */
  className: string;
  /* The name of the avatar user. Text initials will be generated from the name. And it will be used as default value for html `title` and `aria-label` attributes. */
  name?: string;
  /* Text to render as content.*/
  text?: string;
  /* A node with an icon to be rendered as content. */
  icon?: React.ReactElement<any>;
  /* Props for an <img> tag to be rendered as content. */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const DEFAULT_CONTENT_TYPE : ContentType= 'text' ;
/**
 * Avatar is a type of element that visually represents a user, either as an image, icon or text.
 * 
 * <p>There are 3 props for corresponding content types: `text`, `icon` and `imgProps`.
 * If more than one of these props is supplied (with `name` prop giving default value to the `text` prop),
 * then the priority for display is : image -> icon -> text.
 */
export const Avatar : React.SFC<AvatarProps> = props =>  {
  const { name, text, icon, imgProps, ...rest } = props;
  
  const contentType: ContentType = 
    imgProps ? 'image' :
    icon ? 'icon' :
    text || name ? 'text' :
    DEFAULT_CONTENT_TYPE;
  
  return (
      <div 
        {...rest}
        {...style('root', {}, props)}
      >
        {getContent(contentType, props)}
      </div>
    );
}

function getContent(contentType: ContentType, props: AvatarProps): React.ReactElement<any> {
  
  switch (contentType) {
    case 'text': {
      const { name, text } = props;
      // TODO: Make initials logic more robust and tested.
      const textContent = text || (name && name.split(' ').map(s=>s[0]).join('')) || '';
      return (
        <div className={style.text} data-hook="content-text">
          {textContent}
        </div>
      );
    }

    case 'icon': {
      return (
        <div className={style.icon} data-hook="content-icon">
          {props.icon}
        </div>
      );
    }

    case 'image': {
      const {alt, ...rest} = props.imgProps;
      return (
        <div className={style.image} data-hook="content-image">
          <img 
            {...props.imgProps}
            alt={alt ? alt : props.name}
          />
        </div>
      );
    }
  }
}

Avatar.displayName = "Avatar";
