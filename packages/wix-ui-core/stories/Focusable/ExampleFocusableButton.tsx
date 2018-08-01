import * as React from 'react';
import {withFocusable} from '../../src/hocs/Focusable';
import styles from './ExampleFocusableButton.st.css';

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
      <input
        onFocus={rest.focusableOnFocus}
        onBlur={rest.focusableOnBlur}
        {...styles('root', {}, this.props)}
      />
    );
  }
}

const FocusableInput = withFocusable(Input);

export default () => (
  <FocusableInput data-hook="focusable-Input"/>
);
