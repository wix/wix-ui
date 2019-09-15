import * as React from 'react';
import { SIGNATURE_INPUT_METADATA } from './constants';
import {
  SignatureInputContextProvider,
  SignatureInputContextValue,
  SignaturePadApiContext,
} from './SignatureInputContext';
import { Title } from './title';
import { SigningPad } from './signing-pad';
import { ClearButton } from './clear-button';

export type SignatureInputState = Readonly<SignatureInputContextValue>;

export class SignatureInput extends React.Component<{}, SignatureInputState> {
  static displayName = SIGNATURE_INPUT_METADATA.displayName;

  static Title = Title;
  static SigningPad = SigningPad;
  static ClearButton = ClearButton;

  setSignaturePadContext = (padApi: SignaturePadApiContext) => {
    this.setState({ padApi });
  };

  setSignatureTitleId = (titleId: string) => {
    this.setState({ titleId });
  };

  setInputId = (inputId: string) => {
    this.setState({ inputId });
  };

  readonly state = {
    inputId: undefined,
    titleId: undefined,
    padApi: undefined,
    setSignaturePadContext: this.setSignaturePadContext,
    setSignatureTitleId: this.setSignatureTitleId,
    setInputId: this.setInputId,
  };

  render() {
    return (
      <SignatureInputContextProvider value={this.state}>
        {this.props.children}
      </SignatureInputContextProvider>
    );
  }
}
