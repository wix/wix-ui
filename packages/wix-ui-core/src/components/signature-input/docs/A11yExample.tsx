export const A11yExample = `
import * as React from 'react';
import { SignatureInput } from 'wix-ui-core/signature-input';

class ExampleSignatureInput extends React.Component {
  padApi = undefined;

  state = {hasFocus: false};

  handleInit = (padApi) => {
    this.padApi = padApi;
  };

  handleA11yButtonClick = (e) => {
    e.preventDefault();
    this.padApi.focus();
  };

  handleFocus = () => {
    this.setState({hasFocus: true});
  }

  handleBlur = () => {
    this.setState({hasFocus: false});
  }

  render() {
    const focusStyles = this.state.hasFocus ? {outline: "2px solid blue"} : {};

    return (
      <div>
        <SignatureInput>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <SignatureInput.Title>
              {({ getTitleProps }) => (
                <span {...getTitleProps()}>Enter your signature here:</span>
              )}
            </SignatureInput.Title>
            <SignatureInput.SigningPad
              onInit={this.handleInit}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={{ border: '1px solid black', width: 300, height: 150, ...focusStyles }}
            />
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
        </SignatureInput>
        <p>Click the button below and start typing</p>
        <button onClick={this.handleA11yButtonClick}>Click to focus a11y input</button>
      </div>
    );
  }
}
`;
