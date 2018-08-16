import * as React from 'react';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {inputWithOptionsDriverFactory} from './InputWithOptions.driver';
import {InputWithOptions} from './';
import {generateOptions} from '../../baseComponents/DropdownOption/OptionsExample';
import * as waitForCond from 'wait-for-cond';
import {mount} from 'enzyme';
import {Simulate} from 'react-dom/test-utils';

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

  it('Should support open() and close() methods', () => {
      const wrapper = mount(createInputWithOptions({options}));

      const driver = inputWithOptionsDriverFactory({
          element: wrapper.children().at(0).getDOMNode(),
          eventTrigger: Simulate
      });

      expect(driver.isContentElementExists()).toBeFalsy();
      (wrapper.instance() as any).open();
      expect(driver.isContentElementExists()).toBeTruthy();
      (wrapper.instance() as any).close();
      expect(driver.isContentElementExists()).toBeFalsy();
  });
});
