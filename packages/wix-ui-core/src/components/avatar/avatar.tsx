import * as React from 'react';
import * as classNames from 'classnames';

import { withFocusable } from '../../hocs/Focusable/FocusableHOC';
import { style, classes, cssStates } from './avatar.st.css';
import { ContentType } from './types';
import { nameToInitials } from './util';

interface FocusableHOCProps {
  focusableOnFocus?(): void;
  focusableOnBlur?(): void;
}

export interface AvatarProps {
  /** Hook for testing purposes. */
  'data-hook'?: string;
  /** Css class name to be applied to the root element */
  className?: string;
  /** The name of the avatar user. Text initials will be generated from the name. And it will be used as default value for html `title` and `aria-label` attributes. */
  name?: string;
  /** Text to render as content. */
  text?: string;
  /** A node with a placeholder to be rendered as content. Will be displayed if no `text`, `name` or `imgProps` are provided. */
  placeholder?: React.ReactElement;
  /** Props for an <img> tag to be rendered as content. */
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement> & {
    ['data-hook']?: string;
  };
  /** Limit the number of letters in the generated initials (from name). May be 1 2 or 3 only. */
  initialsLimit?: 1 | 2 | 3;
  /** HTML aria-label attribute value. To be applied on the root element */
  ariaLabel?: string;
  /** HTML title attribute value. To be applied on the root element */
  title?: string;
  /** onClick event callback. */
  onClick?(): void;
}

interface AvatarState {
  imgLoaded: boolean;
}

const DEFAULT_CONTENT_TYPE: ContentType = 'placeholder';
/**
 * Avatar is a type of element that visually represents a user, either as an image, placeholder or text.
 *
 * <p>There are 3 props for corresponding content types: `text`, `placeholder` and `imgProps`.
 * If more than one of these props is supplied (with `name` prop giving default value to the `text` prop),
 * then the resolved content type for display goes according to this priority: image -> text -> placeholder.
 */
export class AvatarComponent extends React.Component<
  AvatarProps & FocusableHOCProps,
  AvatarState
> {
  static displayName = 'Avatar';

  static defaultProps = {
    placeholder: null,
  };
  state: AvatarState = { imgLoaded: false };

  img: HTMLImageElement;

  /** This is the resolved content type the consumer wants to display */
  getRequestedContentType(props): ContentType {
    const { name, text, placeholder, imgProps } = props;

    return imgProps
      ? 'image'
      : text || name
      ? 'text'
      : placeholder
      ? 'placeholder'
      : DEFAULT_CONTENT_TYPE;
  }

  /** This is content type that will be displayed. (If img is loading then this will be the fallback) */
  getCurrentContentType(): ContentType {
    const requestedType = this.getRequestedContentType(this.props);

    if (requestedType === 'image' && !this.state.imgLoaded) {
      const { name, text, placeholder } = this.props;
      return text || name
        ? 'text'
        : placeholder
        ? 'placeholder'
        : DEFAULT_CONTENT_TYPE;
    }
    return requestedType;
  }

  componentDidMount() {
    this.getRequestedContentType(this.props) === 'image' &&
      !this.state.imgLoaded &&
      this.loadImg();
  }

  UNSAFE_componentWillReceiveProps(nextProps: AvatarProps) {
    if (
      !nextProps.imgProps ||
      !this.props.imgProps ||
      nextProps.imgProps.src !== this.props.imgProps.src
    ) {
      this.setState({ imgLoaded: false });
      this.img && this.unloadImg();
    }
  }

  componentDidUpdate() {
    this.getRequestedContentType(this.props) === 'image' &&
      !this.img &&
      !this.state.imgLoaded &&
      this.loadImg();
  }

  componentWillUnmount() {
    this.img && this.unloadImg();
  }

  loadImg = () => {
    this.img = new Image();
    this.img.onload = () => {
      this.setState({ imgLoaded: true });
    };
    this.img.src = this.props.imgProps.src;
  };

  unloadImg = () => {
    // TODO: Is this necessary? It is taken from https://github.com/mbrevda/react-image/blob/c402ed3f5d54b88e51eca3326a1e81d964995795/src/index.js#L146
    delete this.img.onload;
    try {
      delete this.img.src;
    } catch (e) {
      // On Safari in Strict mode this will throw an exception,
      //  - https://github.com/mbrevda/react-image/issues/187
      // We don't need to do anything about it.
    }
    delete this.img;
  };

  _handleKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
    if (event.key === ' ' || event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      this.props.onClick();
    }
  };

  render() {
    const {
      name,
      title,
      ariaLabel,
      onClick,
      focusableOnFocus,
      focusableOnBlur,
      'data-hook': dataHook,
    } = this.props;
    const contentType = this.getCurrentContentType();
    const focusProps = !!onClick && {
      role: 'button',
      onFocus: focusableOnFocus,
      onBlur: focusableOnBlur,
      onKeyDown: this._handleKeyDown,
      tabIndex: 0,
    };

    return (
      <div
        data-hook={dataHook}
        data-content-type={contentType} // for testing
        data-img-loaded={this.state.imgLoaded} // for testing
        title={title || name}
        aria-label={ariaLabel || name}
        onClick={onClick}
        {...focusProps}
        className={style(
          classes.root,
          {
            imgLoaded: this.state.imgLoaded,
            contentType,
          },
          this.props.className,
        )}
      >
        {this.getContent(contentType)}
      </div>
    );
  }

  getContent(contentType: ContentType): React.ReactElement {
    switch (contentType) {
      case 'text': {
        const { name, text } = this.props;
        const textContent =
          text || nameToInitials(name, this.props.initialsLimit);
        return (
          <div className={classes.content} data-hook="text-container">
            {textContent}
          </div>
        );
      }

      case 'placeholder': {
        const { placeholder } = this.props;
        return placeholder === null
          ? null
          : React.cloneElement(placeholder, {
              className: classNames(placeholder.props.className, style.content),
            });
      }

      case 'image': {
        const { alt, className, ...rest } = this.props.imgProps;

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

export const Avatar: typeof AvatarComponent = withFocusable(AvatarComponent);
