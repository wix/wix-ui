import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';

import { noop } from '../../utils';

import { classes } from './Tag.st.css';

const SPACE_KEY = 32;

export interface TagProps {
  tagIndex?: number;
  className?: string;
  checked?: boolean;
  value?: string;
  label?: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  disabled?: boolean;
  link?: string;
  rel?: string;
  compId?: string;
}

export class Tag extends React.Component<TagProps> {
  static displayName = DisplayNames.Tag;
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    className: PropTypes.string,
    checked: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    link: PropTypes.string,
    rel: PropTypes.string,
    compId: PropTypes.string,
    tagIndex: PropTypes.number,
  };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();
  labelRef: React.RefObject<HTMLLabelElement> = React.createRef();
  anchorRef: React.RefObject<HTMLAnchorElement> = React.createRef();

  handleKeyDown = (ev: React.KeyboardEvent<HTMLAnchorElement>) => {
    const { link } = this.props;
    /**
     * By default, list item can't be selected by Space button,
     * so we call click on input.
     * Also, keyCode is 100% cross-browser - number 32 is everywhere
     */

    // tslint:disable-next-line: deprecation
    if (ev.keyCode === SPACE_KEY) {
      ev.preventDefault();
      this.inputRef.current.click();

      /**
       * We need to preserve focus on selected-deselected element,
       * so we need to set focus on wrapper, when chain of events
       * click -> change -> blur will be fired
       */

      const PAUSE_FOR_BLUR_EVENT = 10;

      setTimeout(() => {
        if (link) {
          this.anchorRef.current.focus();
        } else {
          this.labelRef.current.focus();
        }
      }, PAUSE_FOR_BLUR_EVENT);
    }
  };

  handleTagClick = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    ev.preventDefault();
    /**
     * Label wrapped in anchor, so we simulate click on input
     * to fire change event and onChange listener.
     */

    this.inputRef.current.click();
  };

  render() {
    const {
      children,
      className,
      value = '',
      label = '',
      disabled,
      checked,
      onChange = noop,
      link,
      rel,
      compId,
      tagIndex,
      ...rest
    } = this.props;

    const wrapperProps = {
      className: classNames(classes.tag, className),
      ...rest,
    };

    const LabeledInput = (props: any) => {
      // in case with link, we should focus anchor wrapper
      const isDisabledFocus = disabled || link;
      const uniqId =
        tagIndex !== undefined
          ? `${value}-${compId}-${tagIndex}`
          : `${value}-${compId}`;

      return (
        <label
          ref={this.labelRef}
          data-hook={DataHooks.Tag}
          title={label}
          htmlFor={uniqId}
          tabIndex={isDisabledFocus ? -1 : 0}
          {...props}
        >
          <input
            ref={this.inputRef}
            data-hook={DataHooks.TagInput}
            className={classes.tagInput}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            value={value}
            name={compId || label}
            id={uniqId}
            disabled={disabled}
          />
          {children}
        </label>
      );
    };

    return link ? (
      <a
        ref={this.anchorRef}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        href={link}
        rel={rel}
        tabIndex={disabled ? -1 : 0}
        onClick={this.handleTagClick}
        onKeyDown={this.handleKeyDown}
        {...wrapperProps}
      >
        <LabeledInput />
      </a>
    ) : (
      <LabeledInput {...wrapperProps} onKeyDown={this.handleKeyDown} />
    );
  }
}
