import * as React from 'react';
import { SignatureInput } from '..';
import { ButtonNext } from '../../button-next';

export const TEST_IDS = {
  ROOT: 'signature-input',
  TITLE: 'signature-input--title',
  PAD: 'signature-input--pad',
  CLEAR_BUTTON: 'signature-input--clear-pad',
};

export class SignatureInputTestFixture extends React.Component<{
  onClear?(): void;
}> {
  render() {
    const { onClear } = this.props;
    return (
      <SignatureInput>
        <div
          data-hook={TEST_IDS.ROOT}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <SignatureInput.Title>
            {({ getTitleProps }) => (
              <p {...getTitleProps({ 'data-hook': TEST_IDS.TITLE })}>
                Enter your signature here:
              </p>
            )}
          </SignatureInput.Title>
          <SignatureInput.SigningPad
            data-hook={TEST_IDS.PAD}
            style={{ border: '1px solid black' }}
          />
          <SignatureInput.ClearButton>
            {({ getClearButtonProps }) => (
              <ButtonNext
                {...getClearButtonProps({
                  'data-hook': TEST_IDS.CLEAR_BUTTON,
                  onClick: onClear,
                })}
              >
                Clear
              </ButtonNext>
            )}
          </SignatureInput.ClearButton>
        </div>
      </SignatureInput>
    );
  }
}
