import * as React from "react";
import {Omit} from 'type-zoo';

import { BaseProps } from "../../types/BaseProps";
import style from "./avatar.st.css";
import {ContentType} from './types';

export interface AvatarProps
  extends BaseProps {
    /* The name of the avatar user. Initials will be generated from the name. And it will be used as default value for html `title` and `aria-label` attributes. */
    name?: string;
    /* Text to render as content.*/
    initials?: string;
    /* A node with an icon to be rendered as content. */
    icon?: React.ReactElement<any>;
    /* A node with an icon to be rendered as content. */
    imgProps?: Omit<React.ImgHTMLAttributes<HTMLImageElement>,'alt'>;
}

/**
 * Avatar is a type of element that visually represents a user, either as an image, icon or initials.
 * 
 * <p>There are 3 props for corresponding content types: `initials`, `icon` and `imgProps`.
 * If more than one of these props is supplied (with `name` prop giving default value to the `initials` prop),
 * then the priority for display is : image -> icon -> initials.
 */
export const Avatar : React.SFC<AvatarProps> = props =>  {
  const { name, initials, icon, imgProps, ...rest } = props;
  
  const contentType: ContentType = 
    imgProps ? 'image' :
    icon ? 'icon' :
    initials || name ? 'initials' :
    undefined;
  
  return (
      <div {...rest} {...style("root", {}, props)}>
        {getContent(contentType, props)}
      </div>
    );
}

function getContent(contentType: ContentType, props: AvatarProps): React.ReactElement<any> {
  
  switch (contentType) {
    case 'initials': {
      const { name, initials } = props;
      // TODO: Make initials logic more robust and tested.
      const text = initials || name.split(' ').map(s=>s[0]).join('');
      return (
        <div className={style.contentText} data-hook="content-initials">
          {text}
        </div>
      );
    }

    case 'icon': {
      return React.cloneElement(props.icon, {['data-hook']: 'content-icon'});
    }

    case 'image': {
      return (
        <img data-hook="content-image" {...props.imgProps}/>
      );
    }
  }
}

Avatar.displayName = "Avatar";
