import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {iconWithOptionsDriverFactory} from './IconWithOptions.driver';
import {IconWithOptions} from './';
import {OptionFactory} from '../dropdown-option';
import {generateOptions} from '../dropdown-option/OptionsExample';

describe('IconWithOptions', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(iconWithOptionsDriverFactory);

  const options = generateOptions();
  const createIconWithOptions = (props = {}) => (
    <IconWithOptions
      {...Object.assign({
        options: [],
        iconUrl: ''
      }, props)}
    />
  );

  it('should render default component', () => {
    const driver = createDriver(createIconWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });
});
