# wix-ui-test-utils

> A common test utils used within the different `wix-ui` packages

## Generic test utils

The following helper functions can be used within the different `wix-ui` packages:

### `isClassExists`

Returns `true` if a certain class exists on an element.

```javascript
import {isClassExists} from 'wix-ui-test-utils/react-helpers';

const element = document.createElement('div');
element.classList.add('big');

isClassExists(element, 'big'); // true
isClassExists(element, 'small'); // false
```

### `sleep`

Returns a promise that resolves after a given timeout.

```javascript
import {sleep} from 'wix-ui-test-utils/react-helpers';

sleep(5000)
  .then(() => console.log('Hello world'));

async function foo() {
  await sleep(5000);
  console.log('Hello world');
}
```

### `makeControlled`

A HOC that makes underlying component "controlled". The "controlled" element will be
initiated with an initial value, invoke an `onChange` callback and will bind the passed
prop functions.

```javascript
import {mount} from 'enzyme';
import {makeControlled} from 'wix-ui-test-utils/react-helpers';

const UncontrolledInput = props => (
  <input {...props}/>
);

const ControlledInput = makeControlled(UncontrolledInput);
const component = mount(
  <ControlledInput
    value={initialValue}
  />
);

// ...
```

## Protractor helpers

### `getStoryUrl`

Returns the iframe URL of a storybook's story.

```javascript
import {getStoryUrl} from 'wix-ui-test-utils/protractor';

const storyUrl = getStoryUrl('Components', 'DatePicker'); // 'iframe.html?selectedKind=...'
browser.get(storyUrl);
```

### `scrollToElement`

Scroll the window to a given element location.

```javascript
import {scrollToElement} from 'wix-ui-test-utils/protractor';

// `el` is a DOM node
scrollToElement(el);
```

### `hasEllipsis`

Checks if the element's text has overflowed and displays ellipsis

```javascript
import {hasEllipsis} from 'wix-ui-test-utils/protractor';

// `el` is a DOM node
expect(hasEllipsis(el)).toEqual(true);
```

### `hasAttribute`

Checks if the element has attribute

```javascript
import {hasAttribute} from 'wix-ui-test-utils/protractor';

// `el` is a DOM node
expect(hasAttribute(el, 'id')).toEqual(true);
```

### `waitForVisibilityOf`

Wait until an element is visible.

```javascript
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

waitForVisibilityOf(
  element,
  errorMsg, // error message to throw when failed
  timeout // timeout (in ms), default is 10000
);
```

### `mouseEnter`

Move the mouse on the element.

```javascript
import {mouseEnter} from 'wix-ui-test-utils/protractor';

mouseEnter(element);
```

### `mouseLeave`

Move the mouse out of the element.

```javascript
import {mouseLeave} from 'wix-ui-test-utils/protractor';

mouseLeave(element);
```

## Testkit helpers

### `createDriverFactory`

Accepts a component driver. Returns a new driver factory. An explanation of drivers can be viewd
[here](./docs/COMPONENT_DRIVERS.md).

```javascript
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

### Vanilla (react-test-utils)

#### `testkitFactoryCreator`

Accepts a component driver. Returns a testkit factory.

```javascript
import {testkitFactoryCreator} from 'wix-ui-test-utils/vanilla';
import datePickerDriverFactory './driver';

const driverFactory = testkitFactoryCreator(datePickerDriverFactory);
const driver = driverFactory({
  // ...
});

driver.click();
driver.exists();
// ...
```

#### `isTestkitExists`

This function should be used inside the component tests in order to to perform a sanity check for the exposed testkit.
It accepts a React Element and a testkit factory. Returns `true` if the driver
works as expected.

```javascript
import {testkitFactoryCreator, isTestkitExists} from 'wix-ui-test-utils/vanilla';
import datePickerDriverFactory './driver';

const driverFactory = testkitFactoryCreator(datePickerDriverFactory);

isTestkitExists(
  <DatePicker />,
  driverFactory
); // true
```

### Enzyme

#### `enzymeTestkitFactoryCreator`

Accepts a component driver. Returns a testkit factory based on enzyme.

```javascript
import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils/enzyme';
import datePickerDriverFactory './driver';

const driverFactory = enzymeTestkitFactoryCreator(datePickerDriverFactory);
const driver = driverFactory({
  // ...
});

driver.click();
driver.exists();
// ...
```

#### `isEnzymeTestkitExists`

This function should be used inside the component tests in order to to perform a sanity check for the exposed testkit.
It accepts a React Element and a testkit factory. Returns `true` if the driver
works as expected.

```javascript
import {enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import datePickerDriverFactory './driver';
import {mount} from 'enzyme';

const driverFactory = enzymeTestkitFactoryCreator(datePickerDriverFactory);

isEnzymeTestkitExists(
  <DatePicker />,
  driverFactory,
  mount
); // true
```

### Protractor

#### `protractorTestkitFactoryCreator`

Accepts a component driver. Returns a testkit factory for protractor.

```javascript
import {protractorTestkitFactoryCreator} from 'wix-ui-test-utils/protractor';
import datePickerDriverFactory './driver';

const driverFactory = protractorTestkitFactoryCreator(datePickerDriverFactory);
const driver = driverFactory({dataHook: 'date-picker'});

driver.click();
driver.exists();
// ...
```
