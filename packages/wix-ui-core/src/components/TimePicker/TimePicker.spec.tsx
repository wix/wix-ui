import * as React from 'react';
import {mount} from 'enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {TimePicker, FIELD} from './index';
import {convertToAmPm} from './utils';
import {timePickerDriverFactory} from './TimePicker.driver';

describe('TimePicker', () => {
  const SOME_VALUE = '10:04';
  const createDriver = createDriverFactory(timePickerDriverFactory);
  /**
   * Since the usual driver factory doesn't expose the React component, we need this
   * to use and test imperative API
   */
  const createDriverWithComponent = (props?) => {
    const container = mount(<TimePicker value="10:30" {...props} />);
    const reactTimePicker = container.instance() as TimePicker;
    const reactInput = container.find('input');
    const inputElement = reactInput.getDOMNode() as HTMLInputElement;
    return {
      callIncrement: (field?: FIELD) => reactTimePicker.increment(field),
      callDecrement: (field?: FIELD) => reactTimePicker.decrement(field),
      callFocus: () => reactTimePicker.focus(),
      focus: () => reactInput.simulate('focus'),
      blur: () => reactInput.simulate('blur'),
      tab: () => reactInput.simulate('keyDown', {key: 'Tab'}),
      getValue: () => inputElement.value,
      getInputElement: () => inputElement
    };
  };

  describe('imperative API', () => {
    describe('increment', () => {
      it('should default to minute increments', () => {
        const driver = createDriverWithComponent();
        driver.callIncrement();
        expect(driver.getValue()).toEqual('10:31');
      });

      describe('last focused field', () => {
        it('should increment the value by 1 hour when last focused field was hour', () => {
          const driver = createDriverWithComponent();
          driver.focus();
          driver.blur();
          driver.callIncrement();
          expect(driver.getValue()).toEqual('11:30');
        });

        it('should increment the value by 1 minute when last focused field was minute', () => {
          const driver = createDriverWithComponent();
          driver.focus();
          driver.tab();
          driver.blur();
          driver.callIncrement();
          expect(driver.getValue()).toEqual('10:31');
        });

        it('should increment the value by 12 hours when last focused field was ampm', () => {
          const driver = createDriverWithComponent({useAmPm: true});
          driver.focus();
          driver.tab();
          driver.tab();
          driver.blur();
          driver.callIncrement();
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });

      describe('calling with field arguments', () => {
        it('should increment the value by 1 minute when passing FIELD.MINUTE as argument', () => {
          const driver = createDriverWithComponent();
          driver.callIncrement(FIELD.MINUTE);
          expect(driver.getValue()).toEqual('10:31');
        });

        it('should increment the value by 1 hour when passing FIELD.HOUR as argument', () => {
          const driver = createDriverWithComponent();
          driver.callIncrement(FIELD.HOUR);
          expect(driver.getValue()).toEqual('11:30');
        });

        it('should increment the value by 12 hours when passing FIELD.AMPM argument', () => {
          const driver = createDriverWithComponent({useAmPm: true});
          driver.callIncrement(FIELD.AMPM);
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });
    });

    describe('decrement', () => {
      it('should default to minute decrements', () => {
        const driver = createDriverWithComponent();
        driver.callDecrement();
        expect(driver.getValue()).toEqual('10:29');
      });

      describe('last focused field', () => {
        it('should decrement the value by 1 hour when last focused field was hour', () => {
          const driver = createDriverWithComponent();
          driver.focus();
          driver.blur();
          driver.callDecrement();
          expect(driver.getValue()).toEqual('09:30');
        });

        it('should decrement the value by 1 minute when last focused field was minute', () => {
          const driver = createDriverWithComponent();
          driver.focus();
          driver.tab();
          driver.blur();
          driver.callDecrement();
          expect(driver.getValue()).toEqual('10:29');
        });

        it('should decrement the value by 12 hours when last focused field was ampm', () => {
          const driver = createDriverWithComponent({useAmPm: true});
          driver.focus();
          driver.tab();
          driver.tab();
          driver.blur();
          driver.callDecrement();
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });

      describe('calling with field arguments', () => {
        it('should decrement the value by 1 minute when passing FIELD.MINUTE as argument', () => {
          const driver = createDriverWithComponent();
          driver.callDecrement(FIELD.MINUTE);
          expect(driver.getValue()).toEqual('10:29');
        });

        it('should decrement the value by 1 hour when passing FIELD.HOUR as argument', () => {
          const driver = createDriverWithComponent();
          driver.callDecrement(FIELD.HOUR);
          expect(driver.getValue()).toEqual('09:30');
        });

        it('should decrement the value by 12 hours when passing FIELD.AMPM argument', () => {
          const driver = createDriverWithComponent({useAmPm: true});
          driver.callDecrement(FIELD.AMPM);
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });
    });

    describe('focus', () => {
      it('should focus the input element', () => {
        const driver = createDriverWithComponent();
        expect(document.activeElement).not.toBe(driver.getInputElement());
        driver.callFocus();
        expect(document.activeElement).toBe(driver.getInputElement());
      });
    });
  });

  describe('onChange prop', () => {
    it('should be called with a new time when a new valid time is set', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = "10:00" onChange = {onChange} />);
      driver.keyDown('ArrowDown');
      expect(onChange).toBeCalledWith('09:00');
    });

    it('should be called with null when deleting a valid time to "--:--"', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} onChange={onChange} />);
      driver.keyDown('Delete');
      driver.keyDown('Tab');
      driver.keyDown('Delete');
      expect(onChange).toBeCalledWith(null);
    });

    it('should not be called when only one field is deleted', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} onChange={onChange} />);
      driver.keyDown('Delete');
      expect(onChange).not.toBeCalled();
    });

    it('should be called when only one field is deleted and then blurred', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = "10:00" onChange={onChange} />);
      driver.keyDown('Delete');
      driver.blur();
      expect(onChange).toBeCalledWith('00:00');
    });
  });

  describe('useNativeInteraction prop', () => {
    it('should default to false', () => {
      const driver = createDriver(<TimePicker />);
      expect(driver.getInputType()).toEqual('text');
    });

    it('should use type = "text" for false', () => {
      const driver = createDriver(<TimePicker useNativeInteraction = {false} />);
      expect(driver.getInputType()).toEqual('text');
    });

    it('should use type = "time" for true', () => {
      const driver = createDriver(<TimePicker useNativeInteraction />);
      expect(driver.getInputType()).toEqual('time');
    });
  });

  describe('useAmPm prop', () => {
    it('should use false as default', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} />);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should display time in 24-hour format when false', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {false}/>);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should display time in 12-hour format when true', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm/>);
      expect(driver.getValue()).toEqual(convertToAmPm(SOME_VALUE));
    });
  });

  describe('step prop', () => {
    it('should default to 1', () => {
      const driver = createDriverWithComponent();
      driver.callIncrement();
      expect(driver.getValue()).toEqual('10:31');
    });

    it('should increment value by 5 minutes when step is set to 5', () => {
      const driver = createDriverWithComponent({step: 5});
      driver.callIncrement();
      expect(driver.getValue()).toEqual('10:35');
    });
  });

  describe('separateSteps prop', () => {
    it('should default to false', () => {
      const driver = createDriverWithComponent({value: '10:59'});
      driver.callIncrement();
      expect(driver.getValue()).toEqual('11:00');
    });

    it('should increment hour when incrementing one minute over 59, when false', () => {
      const driver = createDriverWithComponent({value: '10:59', separateSteps: false});
      driver.callIncrement();
      expect(driver.getValue()).toEqual('11:00');
    });

    it('should not increment hour when incrementing one minute over 59, when true', () => {
      const driver = createDriverWithComponent({value: '10:59', separateSteps: true});
      driver.callIncrement();
      expect(driver.getValue()).toEqual('10:00');
    });
  });

  describe('value prop', () => {
    it('should use blank "--:--" as default', () => {
      const driver = createDriver(<TimePicker />);
      expect(driver.getValue()).toEqual('--:--');
    });

    it('should set the value according to the value prop', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE}/>);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should set the value when a new value is sent', () => {
      class ValueContainer extends React.Component<{value: string}, {value: string}> {
        constructor(props) {
          super(props);
          this.state = {value: props.value};
          this.setValue = this.setValue.bind(this);
        }
        setValue(value) { this.setState({value}); }
        /* tslint:disable jsx-no-string-ref */
        render() { return (<TimePicker ref="timePicker" value={this.state.value}/>); }
        /* tslint:enable jsx-no-string-ref*/
      }

      const container = mount(<ValueContainer value = {SOME_VALUE}/>);
      const inputElement = container.find('input').getDOMNode() as HTMLInputElement;
      expect(inputElement.value).toEqual(SOME_VALUE);
      const NEW_VALUE = '13:13';
      (container.instance() as ValueContainer).setValue(NEW_VALUE);
      expect(inputElement.value).toEqual(NEW_VALUE);
    });
  });

  describe('placeholder prop', () => {
    const SOME_VALUE_WHEN_NULL = '14:42';

    it('should default to "--:--"', () => {
      const driver = createDriver(<TimePicker value={null} />);
      expect(driver.getValue()).toEqual('--:--');
    });

    it('should set the value to placeholder when actual value is null', () => {
      const driver = createDriver(<TimePicker value = {null} placeholder = {SOME_VALUE_WHEN_NULL} />);
      expect(driver.getValue()).toEqual(SOME_VALUE_WHEN_NULL);
    });

    it('should ignore this prop when value is set', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} placeholder = {SOME_VALUE_WHEN_NULL} />);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });
  });

});
