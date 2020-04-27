import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';
import { st, classes } from './TagsList.st.css';

import { noop } from '../../utils';
export interface TagsListProps {
  /** hook for testing purposes */
  'data-hook'?: string;
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
    className={st(classes.root, className)}
    data-hook={DataHooks.TagsList}
    onChange={onChange}
    role="group"
    {...rest}
  >
    {React.Children.map(children, (child, tagIndex) =>
      React.cloneElement(child as any, { tagIndex }),
    )}
  </div>
);

TagsList.displayName = DisplayNames.TagsList;
TagsList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
