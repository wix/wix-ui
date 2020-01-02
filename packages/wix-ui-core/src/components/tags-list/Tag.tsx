import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';

import { noop } from '../../utils';

import style from './Tag.st.css';

const SPACE_KEY = 32;

export interface TagProps {
  className?: string;
  checked?: boolean;
  value?: string;
  label?: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
  disabled?: boolean;
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
  };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  handleKeyDown = (ev: React.KeyboardEvent<HTMLLabelElement>) => {
    /**
     * By default, label can't be selected by Space button, so we calling click
     * on input.
     * Also, keyCode is 100% cross-browser - number 32 is everywhere
     */

    // tslint:disable-next-line: deprecation
    if (ev.keyCode === SPACE_KEY) {
      ev.preventDefault();
      this.inputRef.current.click();
    }
  };

  render() {
    const {
      children,
      className,
      checked,
      value = '',
      label = '',
      disabled,
      onChange = noop,
      ...rest
    } = this.props;

    return (
      <label
        data-hook={DataHooks.Tag}
        className={classNames(style.tag, className)}
        title={label}
        htmlFor={value}
        onKeyDown={this.handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        {...rest}
      >
        <input
          ref={this.inputRef}
          data-hook={DataHooks.TagInput}
          className={style.tagInput}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          value={value}
          name={label}
          id={value}
          disabled={disabled}
        />
        {children}
      </label>
    );
  }
}
