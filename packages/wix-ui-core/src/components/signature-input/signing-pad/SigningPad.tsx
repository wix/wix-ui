import * as React from 'react';
import SignaturePad from 'signature_pad';
import {
  withSignatureInputContext,
  WithSignaturePadProps,
} from '../SignatureInputContext';
import * as PropTypes from 'prop-types';

export interface SigningPadProps
  extends WithSignaturePadProps,
    React.CanvasHTMLAttributes<HTMLCanvasElement> {
  'data-hook'?: string;
}

class SigningPadComp extends React.Component<SigningPadProps> {
  static displayName = 'SigningPad';

  static propTypes = {
    'data-hook': PropTypes.string,
  };

  private canvasEl: HTMLCanvasElement = undefined;

  componentDidMount() {
    const signaturePad = new SignaturePad(this.canvasEl);
    this.props.setSignaturePad(signaturePad);
  }

  render() {
    const { setSignaturePad, pad, ...rest } = this.props;
    return <canvas ref={ref => (this.canvasEl = ref)} {...rest}></canvas>;
  }
}

export const SigningPad = withSignatureInputContext(SigningPadComp);
