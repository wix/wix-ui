import * as React from 'react';
import {radioButtonDriverFactory} from './RadioButton.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {RadioButton, RadioButtonProps} from './RadioButton';

function createRadio(props: RadioButtonProps = {}) {
  return <RadioButton label={<span>Horsie</span>}
                      checkedIcon={<span>🦄</span>} uncheckedIcon={<span>🦄</span>} value="horsie" {...props}/>;
}

describe('RadioButton', () => {
  const createDriver = createDriverFactory(radioButtonDriverFactory);

  it('renders to the screen', () => {
    const radio = createDriver(createRadio());

    expect(radio.exists()).toBeTruthy();
  });

  it('invokes callback for onChange with the correct value', () => {
    const onChange = jest.fn();
    const radio = createDriver(createRadio({onChange}));
    expect(radio.isInputFocused()).toBeFalsy();

    radio.select();
    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange.mock.calls[0][0].value).toEqual('horsie');
    expect(radio.isInputFocused()).toBeTruthy();
  });

  it('is checked correctly', () => {
    const radio = createDriver(createRadio({checked: true}));

    expect(radio.isChecked()).toBeTruthy();
  });

  it('is disabled correctly', () => {
    const radio = createDriver(createRadio({disabled: true}));

    expect(radio.isDisabled()).toBeTruthy();
  });

  it('does not invoke callback function when disabled and clicked', () => {
    const onChange = jest.fn();
    const radio = createDriver(createRadio({onChange, disabled: true}));

    radio.select();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('is required correctly', () => {
    const radio = createDriver(createRadio({required: true}));

    expect(radio.isRequired()).toBeTruthy();
  });

  it('accepts correct value', () => {
    const radio = createDriver(createRadio({value: 'unicorn'}));

    expect(radio.value()).toEqual('unicorn');
  });

  it('accepts correct name', () => {
    const radio = createDriver(createRadio({name: 'unicorns'}));

    expect(radio.name()).toEqual('unicorns');
  });

  it('renders label correctly', () => {
    const radio = createDriver(createRadio());

    expect(radio.labelExists()).toBeTruthy();
  });

  it('renders icon correctly', () => {
    const radio = createDriver(createRadio());

    expect(radio.iconExists()).toBeTruthy();
  });
});
