import * as React from 'react';
import { SignatureInput } from '..';
import { ButtonNext } from '../../button-next';
import { SigningPadOwnProps } from '../signing-pad/SigningPad';

export const TEST_IDS = {
  ROOT: 'signature-input',
  TITLE: 'signature-input--title',
  PAD: 'signature-input--pad',
  CLEAR_BUTTON: 'signature-input--clear-pad',
};

export interface SignatureInputTestFixtureProps extends SigningPadOwnProps {
  onClear?(): void;
  titleText?: string;
}

export class SignatureInputTestFixture extends React.Component<
  SignatureInputTestFixtureProps
> {
  render() {
    const {
      onClear,
      titleText = 'Enter your signature here:',
      ...padProps
    } = this.props;
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
          {titleText && (
            <SignatureInput.Title>
              {({ getTitleProps }) => (
                <p {...getTitleProps({ 'data-hook': TEST_IDS.TITLE })}>
                  Enter your signature here:
                </p>
              )}
            </SignatureInput.Title>
          )}
          <SignatureInput.SigningPad
            data-hook={TEST_IDS.PAD}
            style={{ border: '1px solid black' }}
            {...padProps}
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
