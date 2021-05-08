import * as React from 'react';
import { Popover } from '../Popover';

export class A11yPopoverTestFixture extends React.PureComponent {
  _popoverRef;
  _inputRef;

  state = {
    escPress: false,
    blurred: false,
  };

  _onEscPress = () => {
    this.setState({ escPress: true });
  };

  _onPopoverBlur = () => {
    this.setState({ blurred: true });
  };

  _setPopoverRef = (el) => {
    this._popoverRef = el;
  };

  _setInputRef = (el) => {
    this._inputRef = el;
  };

  _focusPopover = () => {
    if (this._popoverRef) {
      this._popoverRef.focus();
    }
  };

  _focusInput = () => {
    if (this._inputRef) {
      this._inputRef.focus();
    }
  };

  render() {
    const { escPress, blurred } = this.state;

    return (
      <div>
        <button onClick={this._focusPopover}>Focus Popover</button>
        <br />
        <button onClick={this._focusInput}>Focus Input</button>
        <br />
        <Popover
          data-hook={'storybook-popover-a11y'}
          placement={'bottom'}
          shown
          role={'dialog'}
          tabIndex={-1}
          onEscPress={this._onEscPress}
          onPopoverBlur={this._onPopoverBlur}
          ref={this._setPopoverRef}
        >
          <Popover.Element>
            <div>Element</div>
          </Popover.Element>
          <Popover.Content>
            <div>Content</div>
            <input type="text" ref={this._setInputRef} />
          </Popover.Content>
        </Popover>
        <br />
        <input style={{ margin: 60 }} type="text" /> {/* To catch focus */}
        <br />
        <div
          id="blurred-hook"
          style={{ visibility: blurred ? 'visible' : 'hidden' }}
        >
          Blurred Popover!
        </div>
        <div
          id="escape-hook"
          style={{ visibility: escPress ? 'visible' : 'hidden' }}
        >
          Escape Pressed!
        </div>
      </div>
    );
  }
}
