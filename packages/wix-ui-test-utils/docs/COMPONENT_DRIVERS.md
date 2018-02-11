# Component drivers

Each component should have an associated driver file containing useful methods used to test
the component's behaviour. The driver file should export a function that returns an object containing the methods used for testing.

The exported function will then be used in a "factory creator" (see the
[README](../README.md#createdriverfactory) for more details).

For example:

```javascript
// Button.driver.js

export const buttonDriverFactory = ({element, eventTrigger}) => ({
  exists: () => !!element,
  click: () => eventTrigger.click(element),
  // ...
});
```

```javascript
// Button.spec.js

import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {buttonDriverFactory} from './Button.driver';
import Button from './';

const createDriver = createDriverFactory(buttonDriverFactory);

describe('Button', () => {
  it('should exist', () => {
    const driver = createDriver(<Button />);
    expect(driver.exists()).toBe(true);
  });
});
```

## Received arguments

The component driver receives an object containing the following properties:

- `element` - the actual DOM node of the rendered element.
- `wrapper` - a DOM node of a `div` element that wraps the element.
- `component` - a [cloned react component](https://reactjs.org/docs/react-api.html#cloneelement).
- `componentInstance` - the rendered component [`ref`](https://reactjs.org/docs/refs-and-the-dom.html).
- `eventTrigger` - an object containing useful event trigger functions (can be viewed [here](https://github.com/wix/wix-ui/blob/master/packages/wix-ui-test-utils/src/helpers.tsx#L70)).

```javascript
export const componentDriverFactory = ({
  element,
  wrapper,
  component,
  componentInstance,
  eventTrigger
}) => ({
  // ...
});
```
