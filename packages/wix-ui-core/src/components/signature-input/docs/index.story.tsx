import * as React from 'react';
import { SignatureInput } from '..';
import { ButtonNext } from '../../button-next';
import { SIGNNATURE_INPUT_METADATA } from '../constants';

export default {
  category: 'Components',
  storyName: SIGNNATURE_INPUT_METADATA.displayName,
  component: SignatureInput,
  componentPath: '..',
  componentProps: {
    children: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <SignatureInput.Title>
          {({ getTitleProps }) => (
            <label {...getTitleProps()}>Enter your signature here:</label>
          )}
        </SignatureInput.Title>
        <SignatureInput.SigningPad style={{ border: '1px solid black' }} />
        <SignatureInput.ClearButton>
          {({ getClearButtonProps }) => (
            <ButtonNext
              {...getClearButtonProps({
                onClick: () => window.alert('clear callback'),
              })}
            >
              Clear
            </ButtonNext>
          )}
        </SignatureInput.ClearButton>
      </div>
    ),
  },
};
