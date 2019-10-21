import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';
import style from './TagsList.st.css';

import { noop } from '../../utils';
export interface TagsListProps {
  className?: string;
  onChange?(e: React.FormEvent<HTMLDivElement>): void;
  children?: React.ReactNode;
}

export const TagsList: React.FunctionComponent<TagsListProps> = ({
  children,
  className,
  onChange = noop,
  ...rest
} = {}) => (
  <div
    className={classNames(style.root, className)}
    data-hook={DataHooks.TagsList}
    onChange={onChange}
    role="group"
    {...rest}>
    {children}
  </div>
);

TagsList.displayName = DisplayNames.TagsList;
TagsList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
