import * as React from 'react';
import {withFocusable} from '../../src/hocs/Focusable';

interface IInputProps {
  children: React.ReactNode;
  focusableOnFocus: any;
  focusableOnBlur: any;
  focusableIsFocusVisible: boolean;
  focusableIsFocused: boolean;
}

class Input extends React.Component<IInputProps> {
  render() {
    const {children, ...rest} = this.props;
    return (
      <div>
        <div>
          Is focus: {Boolean(rest.focusableIsFocused).toString()}
          <br/>
          Is focus visible: {Boolean(rest.focusableIsFocusVisible).toString()}
        </div>
        <input
          onFocus={rest.focusableOnFocus} // For some reason eslint react/prop-types rule doesn't work here ?!#$
          onBlur={rest.focusableOnBlur}
        />
      </div>
    );
  }
}

const FocusableInput = withFocusable(Input);

export default () => (
  <FocusableInput data-hook="focusable-Input"/>
);
