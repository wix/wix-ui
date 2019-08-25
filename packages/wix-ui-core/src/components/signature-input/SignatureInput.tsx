import * as React from 'react';
import { SIGNNATURE_INPUT_METADATA } from './constants';
import {
  SignatureInputContextProvider,
  SignatureInputContextValue,
} from './SignatureInputContext';
import { Title } from './title';
import { SigningPad } from './signing-pad';
import { ClearButton } from './clear-button';
import SignaturePad from 'signature_pad';

export type SignatureInputState = Readonly<SignatureInputContextValue>;

export class SignatureInput extends React.Component<{}, SignatureInputState> {
  static displayName = SIGNNATURE_INPUT_METADATA.displayName;

  static Title = Title;
  static SigningPad = SigningPad;
  static ClearButton = ClearButton;

  setSignaturePadContext = (pad: SignaturePad) => {
    this.setState({ pad });
  };

  setSignatureTitleId = (titleId: string) => {
    this.setState({ titleId });
  };

  readonly state = {
    titleId: undefined,
    pad: undefined,
    setSignaturePadContext: this.setSignaturePadContext,
    setSignatureTitleId: this.setSignatureTitleId,
  };

  render() {
    return (
      <SignatureInputContextProvider value={this.state}>
        {this.props.children}
      </SignatureInputContextProvider>
    );
  }
}
