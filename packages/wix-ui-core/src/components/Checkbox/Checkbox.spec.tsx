import * as React from 'react';
import {checkboxDriverFactory} from './Checkbox.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Checkbox} from './Checkbox';

const tickSVG = (<span data-name="custom-tickmark">1</span>);

describe('Checkbox', () => {
  const createDriver = createDriverFactory(checkboxDriverFactory);

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
      const checkbox = createDriver(<Checkbox aria-controls={['123', '345']} />);

      expect(checkbox.input().getAttribute('aria-controls')).toBe('123,345');
    });
  });

//   it('Displays custom tick mark when value is true', async () => {
//     const checkbox = createDriver(
//       <Checkbox
//         tickIcon={tickSVG}
//         checked={true}
//       />
//     );

//     expect(checkbox.tickmark()).toBeDefined();
//     expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
//   });

//   it('Switches to focus state when focused', async () => {
//     const checkbox = createDriver(<Checkbox/>);

//     checkbox.focus();

//     expect(checkbox.hasFocusState()).toBe(true);
// });

//   it('Accepts "name" prop', async () => {
//     const checkbox = createDriver(
//       <Checkbox name="shlomi" />
//     );

//     expect(checkbox.input().getAttribute('name')).toBe('shlomi');
//   });

//   it('Accepts "required" prop', async () => {
//     const checkbox = createDriver(<Checkbox required/>);

//     expect(checkbox.input().required).toBe(true);
//   });

//   it('Accepts "autofocus" prop', () => {
//     const checkbox = createDriver(<Checkbox autoFocus />);

//     expect(document.activeElement).toBe(checkbox.input());
//   });

//     it('native input gets disabled state', async () => {
//       const checkbox = createDriver(<Checkbox disabled />);

//       const nativeInput = checkbox.input();

//       expect(nativeInput.disabled).toBe(true);
//     });

//     it('native input gets id prop if supplied by user', async () => {
//       const checkbox = createDriver(<Checkbox id="covfefe" />);

//       const nativeInput = checkbox.input();

//       expect(nativeInput.getAttribute('id')).toBe('covfefe');
//     });

//     it('component gets tabIndex 0 by default', async () => {
//       const checkbox = createDriver(<Checkbox />);

//       const nativeInput = checkbox.input();

//       expect(nativeInput.getAttribute('tabIndex')).toBe('0');
//     });

//     it('component gets tabIndex supplied by the user', async () => {
//       const checkbox = createDriver(<Checkbox tabIndex={666} />);

//       const nativeInput = checkbox.input();

//       expect(nativeInput.getAttribute('tabIndex')).toBe('666');
//     });

//     it('gets focus after click (should not be in focused style state)', async () => {
//       const checkbox = createDriver(<Checkbox />);

//       checkbox.click();

//       expect(document.activeElement).toBe(checkbox.input());
//       expect(checkbox.hasFocusState()).toBe(false);
//     });

//     it('loses focused style state after click', async () => {
//       const checkbox = createDriver(<Checkbox />);

//       checkbox.focus();

//       expect(checkbox.hasFocusState()).toBe(true);

//       checkbox.click();

//       expect(checkbox.hasFocusState()).toBe(false);
//     });
//   });

//   describe('When disabled', () => {
//     it('doesn\'t call onChange when clicked', async () => {
//       const onChange = jest.fn();

//       const checkbox = createDriver(
//         <Checkbox
//           disabled
//           onChange={onChange}
//         />
//       );

//       expect(checkbox.exists()).toBe(true);

//       checkbox.click();

//       setTimeout(() => {
//         expect(onChange).not.toHaveBeenCalled();
//       }, 10);
//     });

//     it('displays tickmark if value is true', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           disabled
//           checked
//         />
//       );

//       expect(checkbox.isChecked()).toBe(true);
//     });

//     it('displays indeterminate icon', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           indeterminate
//           disabled
//           checked
//         />
//       );

//       expect(checkbox.isIndeterminate()).toBe(true);
//     });

//     it('gets disabled style state', async () => {
//       const checkbox = createDriver(<Checkbox disabled />);

//       expect(checkbox.isDisabled()).toBe(true);
//     });
//   });

//   describe('When readonly', () => {
//     it('doesn\'t call onChange when clicked', async () => {
//       const onChange = jest.fn();

//       const checkbox = createDriver(
//         <Checkbox
//           readOnly
//           onChange={onChange}
//         />
//       );

//       expect(checkbox.exists()).toBe(true);

//       checkbox.click();

//       setTimeout(() => {
//         expect(onChange).not.toHaveBeenCalled();
//       }, 10);
//     });

//     it('displays tickmark if value is true', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           readOnly
//           checked
//         />
//       );

//       expect(checkbox.isChecked()).toBe(true);
//     });

//     it('gets readOnly style state', async () => {
//       const checkbox = createDriver(<Checkbox readOnly />);

//       expect(checkbox.hasReadOnlyState()).toBe(true);
//     });
//   });

//   describe('When error', () => {
//     it('has error style state', async () => {
//       const checkbox = createDriver(<Checkbox error />);

//       expect(checkbox.hasErrorState()).toBe(true);
//     });
//   });

//   describe('When indeterminate', () => {
//     it('renders indeterminate icon when value is true', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           indeterminate
//           checked
//         />
//       );

//       expect(checkbox.isIndeterminate()).toBe(true);
//     });

//     it('renders indeterminate icon when value is false', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           indeterminate
//         />
//       );

//       expect(checkbox.isIndeterminate()).toBe(true);
//     });

//     it('click calls onChange with correct value', async () => {
//       const onChange = jest.fn();

//       const checkbox = createDriver(
//         <Checkbox
//           indeterminate
//           checked
//           onChange={onChange}
//         />
//       );

//       expect(checkbox.exists()).toBe(true);

//       checkbox.click();

//       expect(onChange).toBeCalled();
//       expect(onChange.mock.calls[0][0].checked).toBe(false);
//     });

//     it('renders custom indeterminate icon', async () => {
//       const checkbox = createDriver(
//         <Checkbox
//           indeterminate
//           indeterminateIcon={tickSVG}
//         />
//       );

//       expect(checkbox.isIndeterminate()).toBe(true);
//       expect(checkbox.tickmark().getAttribute('data-name')).toBe('custom-tickmark');
//     });

//     it('does not call onChange when disabled', async () => {
//       const onChange = jest.fn();

//       const checkbox = createDriver(
//         <Checkbox
//           disabled
//           indeterminate
//           onChange={onChange}
//         />
//       );

//       expect(checkbox.exists()).toBe(true);

//       checkbox.click();

//       setTimeout(() => {
//         expect(onChange).not.toHaveBeenCalled();
//       }, 10);
//     });

//     it('gets indeterminate style state', async () => {
//       const checkbox = createDriver(<Checkbox indeterminate />);

//       expect(checkbox.isIndeterminate()).toBe(true);
//     });
//   });
});
