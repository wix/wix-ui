# Focusable HOC

A HOC which desgined to wrap components and provide info about focus state<br/>

1. Provide for wrapped component

| propName | propType | isRequired | description |
|----------|----------|------------|-------------|
| focusableOnFocus | func | false | This callback need to be applied for onFocus event |
| focusableOnBlur | func | false | This callback need to be applied for onBlur event |
| focusableIsFocused | bool | false | Provide current focus state |
| focusableIsFocusVisible | bool | false | Provide current focus visible state |

## Usage Example
In order to create the wrapped component:

```js
import * as React from 'react';
import {withFocusable} from 'wix-ui-core/hocs/Focusable';
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
```

```css
:import {
  -st-from: "wix-ui-core/hocs/Focusable/Focusable.st.css";
  -st-default: Focusable;
  -st-named: focus-box;
}

.root {
  -st-extends: Focusable;
}

.root:focus {
  -st-mixin: focus-box;
  border: 2px solid red;
}

.root:focus-visible {
  border: 2px solid green;
}
```
