import * as React from 'react';
import * as PropTypes from 'prop-types';
import style from './Title.st.css';
import * as classNames from 'classnames';

export interface TitleProps {
  children?: TitleChildrenFn;
}

export type TitleChildrenProps = React.HTMLAttributes<HTMLElement> & {
  'data-hook'?: string;
};

export type TitleChildrenFn = (childrenFn: {
  getTitleProps(overrides?: Partial<TitleChildrenProps>): TitleChildrenProps;
}) => JSX.Element;

export class Title extends React.Component<TitleProps> {
  static displayName = 'Title';

  static propTypes = {
    children: PropTypes.func,
  };

  getTitleProps = (overrides: Partial<any> = {}): any => {
    return {
      ...overrides,
      className: classNames(style.root, overrides.className),
    };
  };

  render() {
    const { children = null } = this.props;
    <div />;
    return (
      children &&
      children({
        getTitleProps: this.getTitleProps,
      })
    );
  }
}
