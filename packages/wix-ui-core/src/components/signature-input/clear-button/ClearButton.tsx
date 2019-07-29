import * as React from 'react';
import { ButtonProps } from '../../button-next/button-next';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';

export interface ClearButtonProps extends WithSignaturePadProps {
  children?: ClearButtonChildrenFn;
}

export type ClearButtonChildrenProps = ButtonProps & { 'data-hook'?: string };

export type ClearButtonChildrenFn = (childrenFn: {
  getClearButtonProps(
    overrides?: Partial<ClearButtonChildrenProps>,
  ): ClearButtonChildrenProps;
}) => JSX.Element;

class ClearButtonComp extends React.Component<ClearButtonProps> {
  static displayName = 'ClearButton';

  static propTypes = {
    children: PropTypes.func,
  };

  getClearButtonProps = (
    overrides: Partial<ClearButtonChildrenProps> = {},
  ): ClearButtonChildrenProps => {
    return {
      ...overrides,
      onClick: e => {
        const { pad } = this.props;
        const { onClick } = overrides;
        pad && pad.clear();
        onClick && onClick(e);
      },
    };
  };

  render() {
    const { children = null } = this.props;
    return (
      children &&
      children({
        getClearButtonProps: this.getClearButtonProps,
      })
    );
  }
}

export const ClearButton = withSignatureInputContext(ClearButtonComp);
