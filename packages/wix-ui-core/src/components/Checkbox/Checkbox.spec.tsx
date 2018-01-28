import * as React from 'react';
import {checkboxDriverFactory} from './Checkbox.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import Checkbox from './Checkbox';

const tickSVG: React.ReactNode = (
  <svg
    data-hook="CHECKBOX_TICKMARK"
    data-name="custom-tickmark"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="black" strokeLinecap="square" strokeWidth="1.5" d="M5 8.685l2.496 1.664M8 10.685L11.748 6" />
  </svg>
);

const IndeterminateSVG: React.ReactNode = (
  <svg
    data-hook="CHECKBOX_INDETERMINATE"
    data-name="custom-indeterminate"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 0h8v2H0z" />
  </svg>
);

describe('Checkbox', () => {
  const createDriver = createDriverFactory(checkboxDriverFactory);

  it('Renders with default values', async () => {
    const checkbox = createDriver(<Checkbox />);

    expect(checkbox.exists()).toBe(true);
    expect(checkbox.isChecked()).toBe(false);
  });

  it('Displays children', async () => {
    const checkbox = createDriver(
      <Checkbox>
        <span>covfefe</span>
      </Checkbox>
    );

    expect(checkbox.children()[0].textContent).toContain('covfefe');
  });

  it('Displays custom tick mark when value is true', async () => {
    const checkbox = createDriver(
      <Checkbox
        tickIcon={tickSVG}
        checked={true}
      />
    );

    expect(checkbox.tickmark()).toBeDefined();
    expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
  });

  it('Calls onChange when clicked', async () => {
    const onChange = jest.fn();

    const checkbox = createDriver(
      <Checkbox
        tickIcon={tickSVG}
        checked={true}
        onChange={onChange}
      />
    );

    expect(checkbox.exists()).toBe(true);

    checkbox.click();

    expect(onChange).toBeCalled();
    expect(onChange.mock.calls[0][0].checked).toBe(false);
  });

  it('Accepts "name" prop', async () => {
    const checkbox = createDriver(
      <Checkbox name="shlomi" />
    );

    expect(checkbox.input().getAttribute('name')).toBe('shlomi');
  });

  it('Accepts "autofocus" prop', async () => {
    if (document.hasFocus()) {

      const checkbox = createDriver(
        <Checkbox autoFocus />
      );

      expect(document.activeElement).toBe(checkbox.input());

    } else {
      console.warn(// tslint:disable-line no-console
        'Checkbox autofocus test wasn\'t run since document doesn\'t have focus'
      );
    }
  });

  describe('Accessibility features', () => {
    it('Renders a native input and pass on checked state', async () => {
      const checkbox = createDriver(
        <Checkbox checked />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput).toBeDefined();
      expect(nativeInput).toBeInstanceOf(HTMLInputElement);
      expect(nativeInput.getAttribute('type')).toBe('checkbox');
      expect(nativeInput.checked).toBe(true);
    });

    it('native input gets disabled state', async () => {
      const checkbox = createDriver(
        <Checkbox disabled />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput.disabled).toBe(true);
    });

    it('native input gets id prop if supplied by user', async () => {
      const checkbox = createDriver(
        <Checkbox id="covfefe" />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput.getAttribute('id')).toBe('covfefe');
    });

    it('component gets tabIndex 0 by default', async () => {
      const checkbox = createDriver(
        <Checkbox />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput.getAttribute('tabIndex')).toBe('0');
    });

    it('component gets tabIndex supplied by the user', async () => {
      const checkbox = createDriver(
        <Checkbox tabIndex={666} />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput.getAttribute('tabIndex')).toBe('666');
    });

    it('takes "aria-controls" property', async () => {
      const checkbox = createDriver(
        <Checkbox aria-controls={['123', '345']} />
      );

      const nativeInput = checkbox.input();

      expect(nativeInput.getAttribute('aria-controls')).toBe('123,345');
    });

    it('gets focus after click (should not be in focused style state)', async () => {
      const checkbox = createDriver(
        <Checkbox />
      );

      checkbox.click();

      expect(document.activeElement).toBe(checkbox.input());
    });
  });

  describe('When disabled', () => {
    it('doesn\'t call onChange when clicked', async () => {
      const onChange = jest.fn();

      const checkbox = createDriver(
        <Checkbox
          disabled
          onChange={onChange}
        />
      );

      expect(checkbox.exists()).toBe(true);

      checkbox.click();

      setTimeout(() => {
        expect(onChange).not.toHaveBeenCalled();
      }, 10);
    });

    it('displays tickmark if value is true', async () => {
      const checkbox = createDriver(
        <Checkbox
          disabled
          checked={true}
        />
      );

      expect(checkbox.isChecked()).toBe(true);
    });

    it('displays indeterminate icon', async () => {
      const checkbox = createDriver(
        <Checkbox
          indeterminate
          disabled
          checked={true}
        />
      );

      expect(checkbox.isIndeterminate()).toBe(true);
    });
  });

  describe('When readonly', () => {
    it('doesn\'t call onChange when clicked', async () => {
      const onChange = jest.fn();

      const checkbox = createDriver(
        <Checkbox
          readOnly
          onChange={onChange}
        />
      );

      expect(checkbox.exists()).toBe(true);

      checkbox.click();

      setTimeout(() => {
        expect(onChange).not.toHaveBeenCalled();
      }, 10);
    });

    it('displays tickmark if value is true', async () => {
      const checkbox = createDriver(
        <Checkbox
          readOnly
          checked={true}
        />
      );

      expect(checkbox.isChecked()).toBe(true);
    });
  });

  describe('When indeterminate', () => {
    it('renders indeterminate icon when value is true', async () => {
      const checkbox = createDriver(
        <Checkbox
          indeterminate
          checked={true}
        />
      );

      expect(checkbox.exists()).toBe(true);
      expect(checkbox.isIndeterminate()).toBe(true);
      expect(checkbox.isChecked()).toBe(false);
    });

    it('renders indeterminate icon when value is false', async () => {
      const checkbox = createDriver(
        <Checkbox
          indeterminate
          checked={false}
        />
      );

      expect(checkbox.exists()).toBe(true);
      expect(checkbox.isIndeterminate()).toBe(true);
    });

    it('click calls onChange with value true', async () => {
      const onChange = jest.fn();

      const checkbox = createDriver(
        <Checkbox
          indeterminate
          checked={true}
          onChange={onChange}
        />
      );

      expect(checkbox.exists()).toBe(true);

      checkbox.click();

      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].checked).toBe(true);
    });

    it('renders custom indeterminate icon', async () => {
      const checkbox = createDriver(
        <Checkbox
          indeterminate
          indeterminateIcon={IndeterminateSVG}
        />
      );

      expect(checkbox.isIndeterminate()).toBe(true);
      expect(checkbox.indeterminateMark().getAttribute('data-name')).toBe('custom-indeterminate');
    });

    it('does not call onChange when disabled', async () => {
      const onChange = jest.fn();

      const checkbox = createDriver(
        <Checkbox
          disabled
          indeterminate
          onChange={onChange}
        />
      );

      expect(checkbox.exists()).toBe(true);

      checkbox.click();

      setTimeout(() => {
        expect(onChange).not.toHaveBeenCalled();
      }, 10);
    });
  });
});
