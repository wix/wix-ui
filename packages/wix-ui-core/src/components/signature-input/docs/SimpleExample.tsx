export const SimpleExample = `
import * as React from 'react';
import {SignatureInput} from 'wix-ui-core/signature-input';

class ExampleSignatureInput extends React.Component {
  render() {
    return <SignatureInput>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <SignatureInput.Title>
          {({ getTitleProps }) => (
            <span {...getTitleProps()}>Enter your signature here:</span>
          )}
        </SignatureInput.Title>
        <SignatureInput.SigningPad style={{ border: '1px solid black', width: 300, height: 150 }} />
        <SignatureInput.ClearButton>
          {({ getClearButtonProps }) => (
            <button
              {...getClearButtonProps({
                onClick: () => console.log('clear callback'),
              })}
            >
              Clear
            </button>
          )}
        </SignatureInput.ClearButton>
      </div>
    </SignatureInput>;
  }
}`;
