import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import {InputWithOptions} from './';
import {generateOptions} from '../DropdownOption/OptionsExample';
import * as waitForCond from 'wait-for-cond';

describe('InputWithOptions', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(inputWithOptionsDriverFactory);

  const options = generateOptions();
  const createInputWithOptions = (props = {}) => (
    <InputWithOptions 
      {...Object.assign({
        options: [],
        inputProps: {}
      }, props)}
    />
  );

  it('should render default component', () => {
    const driver = createDriver(createInputWithOptions({options}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should display content element', () => {
    const driver = createDriver(createInputWithOptions({options, forceContentElementVisibility: true}));
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  it('should trigger onManualInput', () => {
    const onManualInput = jest.fn();

    const driver = createDriver(createInputWithOptions({options, onManualInput}));
    driver.keyDown('a');
    driver.keyDown('Enter');

    expect(onManualInput).toHaveBeenCalled();
  });

  it('should trigger onManualInput with the actual value', () => {
    const onManualInput = jest.fn();
    let inputValue = 'a';

    const driver = createDriver(createInputWithOptions({
      options,
      onManualInput,
      inputProps: {
        value: inputValue
      }
    }));

    driver.click();
    driver.keyDown('Enter');
    expect(onManualInput).toHaveBeenCalledWith('a');
  });

  it('should trigger onManualInput with the actual value even if option list is empty', () => {
    const onManualInput = jest.fn();
    let inputValue = 'a';

    const driver = createDriver(createInputWithOptions({
      options: [],
      onManualInput,
      inputProps: {
        value: inputValue
      }
    }));

    driver.click();
    driver.keyDown('Enter');
    expect(onManualInput).toHaveBeenCalledWith('a');
  });

  it('should not show options element upon blur', async () => {
    const onSelect = jest.fn();
    const driver = createDriver(createInputWithOptions({options, onSelect}));
    driver.click();
    await waitForCond(() => driver.isContentElementExists());
    driver.keyDown('ArrowDown');
    driver.keyDown('Enter');
    await waitForCond(() => !driver.isContentElementExists());
    driver.keyDown('Escape');
    await waitForCond.assertHold(() => {
      expect(driver.isContentElementExists()).toBeFalsy();
    }, 10);
  });
});
