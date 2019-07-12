import * as React from 'react';
import style from './SignatureInput.st.css';
import {DataHooks, DataKeys, COMPONENT_METADATA} from './constants';
import SignaturePad from 'signature_pad';

export interface SignatureInputProps {
  /* Label for signature input field */
  label?: string;
  /** Data hook for testing purposes */
  ['data-hook']?: string;
}

export interface SignatureInputState {
  hasData: boolean;
}

export class SignatureInput extends React.Component<
  SignatureInputProps,
  SignatureInputState
> {
  static displayName = COMPONENT_METADATA.displayName;

  private canvas: HTMLCanvasElement;
  private signaturePad: SignaturePad;

  componentDidMount() {
    this.signaturePad = new SignaturePad(this.canvas);
  }

  get hasData() {
    return this.signaturePad && !this.signaturePad.isEmpty();
  }

  render() {
    const {label} = this.props;
    return (
      <div
        {...{[DataKeys.HasData]: this.hasData}}
        {...style('root', {}, this.props)}
      >
        {label && (
          <div data-hook={DataHooks.Label} className={style.label}>
            {label}
          </div>
        )}
        <canvas
          ref={ref => (this.canvas = ref)}
          data-hook={DataHooks.Canvas}
          className={style.canvas}
        ></canvas>
      </div>
    );
  }
}
