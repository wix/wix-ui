import * as React from 'react';
import * as PropTypes from 'prop-types';

export interface TitleProps {
  children?: TitleChildrenFn;
}

export type TitleChildrenFn = (childrenFn: {
  getTitleProps(overrides?: Partial<object>): object;
}) => JSX.Element;

export class Title extends React.Component<TitleProps> {
  static displayName = 'Title';

  static propTypes = {
    children: PropTypes.func,
  };

  getTitleProps = (overrides: Partial<object> = {}): object => {
    return { ...overrides };
  };

  render() {
    const { children = null } = this.props;
    return (
      children &&
      children({
        getTitleProps: this.getTitleProps,
      })
    );
  }
}
