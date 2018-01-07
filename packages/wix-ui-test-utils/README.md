# wix-ui-test-utils

> A common test utils used in `wix-ui` packages

## Generic test utils

### `isClassExists`

Returns `true` if a certain class exists on an element.

```javascript
import {isClassExists} from 'wix-ui-test-utils';

const element = document.createElement('div');
element.classList.add('big');

isClassExists(element, 'big'); // true
isClassExists(element, 'small'); // false
```

### `sleep`

Returns a promise that resolves after a given timeout.

```javascript
import {sleep} from 'wix-ui-test-utils';

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
import {makeControlled} from 'wix-ui-test-utils';

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
import {getStoryUrl} from 'wix-ui-test-utils';

const storyUrl = getStoryUrl('Components', 'DatePicker'); // 'iframe.html?selectedKind=...'
browser.get(storyUrl);
```

### `scrollToElement`

Scroll the window to a given element location.

```javascript
import {scrollToElement} from 'wix-ui-test-utils';

// `el` is a DOM node
scrollToElement(el);
```

### `waitForVisibilityOf`

Wait until an element is visible.

```javascript
import {waitForVisibilityOf} from 'wix-ui-test-utils';

waitForVisibilityOf(
  element,
  errorMsg, // error message to throw when failed
  timeout // timeout (in ms), default is 10000
);
```

## Testkit helpers

### Vanilla (react-test-utils)

#### `testkitFactoryCreator`

Accepts a component driver. Returns a testkit factory.

```javascript
import {testkitFactoryCreator} from 'wix-ui-test-utils';
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

Accepts an React Element and a testkit factory. Returns `true` if the driver
works as expected.

```javascript
import {testkitFactoryCreator, isTestkitExists} from 'wix-ui-test-utils';
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
import {enzymeTestkitFactoryCreator} from 'wix-ui-test-utils';
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

Accepts an React Element and an enzyme testkit factory. Returns `true` if the driver
works as expected.

```javascript
import {enzymeTestkitFactoryCreator, isEnzymeTestkitExists} from 'wix-ui-test-utils';
import datePickerDriverFactory './driver';

const driverFactory = enzymeTestkitFactoryCreator(datePickerDriverFactory);

isEnzymeTestkitExists(
  <DatePicker />,
  driverFactory
); // true
```

### Protractor

#### `protractorTestkitFactoryCreator`

Accepts a component driver. Returns a testkit factory for protractor.

```javascript
import {protractorTestkitFactoryCreator} from 'wix-ui-test-utils';
import datePickerDriverFactory './driver';

const driverFactory = protractorTestkitFactoryCreator(datePickerDriverFactory);
const driver = driverFactory({dataHook: 'date-picker'});

driver.click();
driver.exists();
// ...
```
