import * as React from 'react';
import {checkboxDriverFactory} from './Checkbox.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {Checkbox} from './Checkbox';

const tickSVG = (<span data-name="custom-tickmark">1</span>);
function delay(millis: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, millis));
}

describe('Checkbox', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(checkboxDriverFactory);

  describe('Basic behavior', () => {
    it('should render', () => {
      const checkbox = createDriver(<Checkbox />);

      expect(checkbox.exists()).toBe(true);
    });

    it('is not checked by default', () => {
      const checkbox = createDriver(<Checkbox />);

      expect(checkbox.isChecked()).toBe(false);
    });

    it('is checked when passing the checked prop', () => {
      const checkbox = createDriver(<Checkbox checked />);

      expect(checkbox.isChecked()).toBe(true);
    });

    it('renders given children', () => {
      const checkbox = createDriver(
        <Checkbox>
          <span>covfefe</span>
        </Checkbox>
      );

      expect(checkbox.children().textContent).toContain('covfefe');
    });

    it('calls onChange when clicked', () => {
      const onChange = jest.fn();
      const checkbox = createDriver(<Checkbox onChange={onChange}/>);

      checkbox.click();

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({checked: true}));
    });

    it('displays the given custom tick icon when checked', () => {
      const checkbox = createDriver(
        <Checkbox
          checkedIcon={tickSVG}
          checked
        />
      );

      expect(checkbox.tickmark()).toBeDefined();
      expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
    });
  });

  describe('Indeterminate', () => {
    it('has indeterminate state when indeterminate', () => {
      const checkbox = createDriver(<Checkbox indeterminate />);

      expect(checkbox.isIndeterminate()).toBe(true);
    });

    it('displays the given custom tick icon when indeterminate', () => {
      const checkbox = createDriver(
        <Checkbox
          indeterminateIcon={tickSVG}
          indeterminate
        />
      );

      expect(checkbox.tickmark()).toBeDefined();
      expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
    });
  });

  describe('Accessibility', () => {
    it('renders a native input behind the scene', () => {
      const checkbox = createDriver(<Checkbox />);
      const nativeInput = checkbox.input();

      expect(nativeInput).toBeDefined();
      expect(nativeInput).toBeInstanceOf(HTMLInputElement);
      expect(nativeInput.getAttribute('type')).toBe('checkbox');
      expect(nativeInput.checked).toBe(false);
    });

    it('passes the checked value to the input', () => {
      const checkbox = createDriver(<Checkbox checked />);

      expect(checkbox.input().checked).toBe(true);
    });

    it('passes "aria-controls" value to the intput', () => {
      const checkbox = createDriver(<Checkbox aria-controls={'123,345'} />);

      expect(checkbox.input().getAttribute('aria-controls')).toBe('123,345');
    });
  });

  describe('Form element', () => {
    it('passes the name prop to the input', () => {
      const checkbox = createDriver(<Checkbox name="shlomi" />);

      expect(checkbox.input().getAttribute('name')).toBe('shlomi');
    });

    it('passes the id prop to the input', () => {
      const checkbox = createDriver(<Checkbox id="covfefe" />);

      expect(checkbox.input().getAttribute('id')).toBe('covfefe');
    });

    it('passes tabindex 0 to the input by default', () => {
      const checkbox = createDriver(<Checkbox />);

      expect(checkbox.input().getAttribute('tabIndex')).toBe('0');
    });

    it('passes the tabindex value to the input', () => {
      const checkbox = createDriver(<Checkbox tabIndex={666} />);

      expect(checkbox.input().getAttribute('tabIndex')).toBe('666');
    });

    it('passes the required value to the input', () => {
      const checkbox = createDriver(<Checkbox required/>);

      expect(checkbox.input().required).toBe(true);
    });

    it('passes the autoFocus prop to the input', () => {
      const checkbox = createDriver(<Checkbox autoFocus />);

      // Elements in inactive windows cannot gain focus, however on .focus()
      // call they still become the active element.
      expect(document.activeElement).toBe(checkbox.input());
    });

    it('has error style state', () => {
      const checkbox = createDriver(<Checkbox error />);

      expect(checkbox.hasErrorState()).toBe(true);
    });
  });

  describe('Disabled', () => {
    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      const checkbox = createDriver(
        <Checkbox
          disabled
          onChange={onChange}
        />
      );

      checkbox.click();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('disables the input when disabled', () => {
      const checkbox = createDriver(<Checkbox disabled/>);

      expect(checkbox.input().disabled).toBe(true);
    });

    it('can be checked when disabled', () => {
      const checkbox = createDriver(<Checkbox disabled checked />);

      expect(checkbox.isChecked()).toBe(true);
      expect(checkbox.input().checked).toBe(true);
    });

    it('can be indeterminate when disabled', () => {
      const checkbox = createDriver(<Checkbox disabled indeterminate />);

      expect(checkbox.isIndeterminate()).toBe(true);
    });

    it('has disable css state when disabled', () => {
      const checkbox = createDriver(<Checkbox disabled />);

      expect(checkbox.isDisabled()).toBe(true);
    });

    it('can not be focused when disabled', () => {
      const checkbox = createDriver(<Checkbox disabled />);

      checkbox.mouseDown();
      expect(checkbox.hasFocusState()).toBe(false);
    });
  });

  describe('Readonly', () => {
    it('does not call onChange when readonly', () => {
      const onChange = jest.fn();
      const checkbox = createDriver(
        <Checkbox
          readOnly
          onChange={onChange}
        />
      );

      checkbox.click();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('is can be checked when readonly', () => {
      const checkbox = createDriver(<Checkbox readOnly checked />);

      expect(checkbox.isChecked()).toBe(true);
      expect(checkbox.input().checked).toBe(true);
    });

    it('is can be indeterminate when readonly', () => {
      const checkbox = createDriver(<Checkbox readOnly indeterminate />);

      expect(checkbox.isIndeterminate()).toBe(true);
    });

    it('has disable css state when readonly', () => {
      const checkbox = createDriver(<Checkbox readOnly />);

      expect(checkbox.hasReadOnlyState()).toBe(true);
    });
  });

  describe('Focus', () => {
    it('has focus css state when focused', () => {
      const checkbox = createDriver(<Checkbox />);

      checkbox.focus();
      expect(checkbox.hasFocusState()).toBe(true);
    });
  });
});
