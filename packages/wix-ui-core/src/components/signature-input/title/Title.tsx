import * as React from 'react';
import * as PropTypes from 'prop-types';
import { classes } from './Title.st.css';
import * as classNames from 'classnames';

import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import { generateID } from '../utils';

export interface TitleProps extends WithSignaturePadProps {
  children?: TitleChildrenFn;
}

export type TitleChildrenProps = React.HTMLAttributes<HTMLElement> & {
  'data-hook'?: string;
};

export type TitleChildrenFn = (childrenFn: {
  getTitleProps(overrides?: Partial<TitleChildrenProps>): TitleChildrenProps;
}) => JSX.Element;

class TitleComp extends React.Component<TitleProps> {
  static displayName = 'Title';

  static propTypes = {
    children: PropTypes.func,
  };

  componentDidMount() {
    const { setSignatureTitleId } = this.props;
    const id = `signature-input-label-${generateID()}`;
    setSignatureTitleId(id);
  }

  componentWillUnmount() {
    const { setSignatureTitleId } = this.props;
    setSignatureTitleId(undefined);
  }

  getTitleProps = (overrides: Partial<any> = {}): any => {
    const { titleId } = this.props;
    return {
      id: titleId,
      ...overrides,
      className: classNames(classes.root, overrides.className),
    };
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

export const Title = withSignatureInputContext(TitleComp);
