import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames } from './TagsList.helpers';
import { st, classes } from './TagsList.st.css';
import { filterDataProps } from '../../utils/filter-data-props';

import { noop } from '../../utils';
export interface TagsListProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  className?: string;
  onChange?(e: React.FormEvent<HTMLDivElement>): void;
  children?: React.ReactNode;
  singleSelection?: boolean;
}

export const TagsList: React.FunctionComponent<TagsListProps> = ({
  children,
  className,
  onChange = noop,
  singleSelection = false,
  ...rest
} = {}) => (
  <div
    className={st(classes.root, className)}
    {...filterDataProps(rest)}
    data-hook={DataHooks.TagsList}
    onChange={onChange}
    role="group"
    {...rest}
  >
    {React.Children.map(children, (child, tagIndex) =>
      React.cloneElement(child as any, { tagIndex, singleSelection }),
    )}
  </div>
);

TagsList.displayName = DisplayNames.TagsList;
TagsList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
