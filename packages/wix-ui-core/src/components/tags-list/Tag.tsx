import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';

import style from './Tag.st.css';

export interface TagProps {
  className?: string;
  checked?: boolean;
  value: string;
  label?: string;
  children: React.ReactNode;
}

export const Tag: React.FunctionComponent<TagProps> = ({
  children,
  className,
  checked,
  value,
  label,
}) => (
  <div data-hook={DataHooks.Tag}>
    <input
      data-hook={DataHooks.TagInput}
      className={style.tagInput}
      type="checkbox"
      defaultChecked={checked}
      value={value}
      name={label}
      id={value}
    />
    <label htmlFor={value} className={classNames(style.tag, className)}>
      {children}
    </label>
  </div>
);

Tag.displayName = DisplayNames.Tag;
Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
};
