import * as React from 'react';
import * as classNames from 'classnames';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';
import style from './TagsList.st.css';

import { noop } from '../../utils';
export interface TagsListProps {
  className?: string;
  onChange?(e: React.FormEvent<HTMLFormElement>): void;
  children?: React.ReactNode;
}

const preventDefault = (ev: React.FormEvent) => ev.preventDefault();

export const TagsList: React.FunctionComponent<TagsListProps> = ({
  children,
  className,
  onChange = noop,
} = {}) => (
  <form
    className={classNames(style.root, className)}
    data-hook={DataHooks.TagsList}
    onChange={onChange}
    onSubmit={preventDefault}>
    {children}
  </form>
);

TagsList.displayName = DisplayNames.TagsList;
TagsList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
