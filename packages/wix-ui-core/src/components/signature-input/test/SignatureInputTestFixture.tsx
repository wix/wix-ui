import * as React from 'react';
import {SignatureInput} from '../SignatureInput';

export enum DataHooks {
  SignatureInput = 'test-signature-input',
}

export class SignatureInputTestFixture extends React.Component<{}> {
  render() {
    return (
      <div>
        <SignatureInput data-hook={DataHooks.SignatureInput}></SignatureInput>
      </div>
    );
  }
}
