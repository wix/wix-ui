import * as React from 'react';
import { ButtonProps } from '../../button-next/button-next';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';
import { classes } from './ClearButton.st.css';
import * as classNames from 'classnames';

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
    const { inputId } = this.props;

    return {
      ...(inputId && { 'aria-controls': inputId }),
      ...overrides,
      className: classNames(classes.root, overrides.className),
      onClick: e => {
        const { padApi } = this.props;
        const { onClick } = overrides;
        padApi && padApi.clear();
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
