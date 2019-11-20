import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';

import { noop } from '../../utils';

import style from './Tag.st.css';

export interface TagProps {
  className?: string;
  checked?: boolean;
  value: string;
  label?: string;
  onChange?: React.FormEventHandler<HTMLInputElement>;
  children: string;
}

export const Tag: React.FunctionComponent<TagProps> = ({
  children,
  className,
  checked,
  value,
  label,
  onChange = noop,
  ...rest
}) => (
  <label
    data-hook={DataHooks.Tag}
    className={classNames(style.tag, className)}
    title={children}
    htmlFor={value}
    {...rest}
  >
    <input
      data-hook={DataHooks.TagInput}
      className={style.tagInput}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      value={value}
      name={label}
      id={value}
    />
    {children}
  </label>
);

Tag.displayName = DisplayNames.Tag;
Tag.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};
