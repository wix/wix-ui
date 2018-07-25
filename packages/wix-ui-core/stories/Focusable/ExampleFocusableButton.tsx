import * as React from 'react';
import {withFocusable} from '../../src/hocs/Focusable';


class Button extends React.Component {
  render() {
    const {children, ...rest} = this.props;
    console.log(rest);
    return (
      <button
        onFocus={rest.focusableOnFocus} // For some reason eslint react/prop-types rule doesn't work here ?!#$
        onBlur={rest.focusableOnBlur}
      >
        {children}
        Is focus visible: {rest.focusableIsFocusVisible}
      </button>
    );
  }
}

const FocusableButton = withFocusable(Button);

export default () => (
  <FocusableButton data-hook="focusable-Button">This Button is going to be focusable</FocusableButton>
);
