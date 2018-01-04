import * as React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import InputWithOptions from './index';
import Divider from '../Divider';

describe('InputWithOptions', () => {

  const createDriver = createDriverFactory(inputWithOptionsDriverFactory);
  const options = [1, 2, 3, 4, 5].map(x => ({
    id: x,
    isSelectable: x !== 3,
    isDisabled: x === 4,
    render: () => x === 3 ? <Divider /> : <span>{`value${x}`}</span>
  }));

  const createInputWithOptions = (props = {}) => (
    <InputWithOptions {...Object.assign({
      options: []
    }, props)}/>
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });
});
