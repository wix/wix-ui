import * as React from 'react';
import * as PropTypes from 'prop-types';

import { DataHooks, DisplayNames, DataAttributes } from './TagsList.helpers';
import { st, classes } from './TagsList.st.css';
import { filterDataProps } from '../../utils/filter-data-props';

import { noop } from '../../utils';
import {Tag} from './Tag';

export interface TagsListProps {
  /** hook for testing purposes */
  'data-hook'?: string;
  className?: string;
  onChange?(e: React.FormEvent<HTMLDivElement>): void;
  children?: React.ReactNode;
  singleSelection?: boolean;
  name?: string;
}

export class TagsList extends React.Component<TagsListProps> {
  static displayName = DisplayNames.TagsList;
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  static id = 0;
  private id: string;

  constructor(props) {
    super(props);
    this.id = `${++TagsList.id}`;
  }

  render() {
    const {
      children,
      className,
      onChange = noop,
      singleSelection,
      name,
      ...rest
    } = this.props;

    return (
        <div
            className={st(classes.root, className)}
            {...filterDataProps(rest)}
            data-hook={DataHooks.TagsList}
            onChange={onChange}
            role={singleSelection ? 'radiogroup' : 'group'}
            {...{[`data-${DataAttributes.SingleSelection}`]: singleSelection}}
            {...rest}
        >
          {React.Children.map(children, (child, tagIndex) =>
              React.cloneElement(child as React.ReactElement, {
                tagIndex,
                singleSelection,
                name,
                key: `TagsList${this.id}-${(child as Tag).props.value}`
              })
          )}
        </div>
    );
  }
}
