import * as React from 'react';
import {timePickerDriverFactory} from './TimePicker.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {TimePicker, FIELD} from './index';
import {convertToAmPm} from './utils';
import {renderIntoDocument, findRenderedDOMComponentWithTag} from 'react-dom/test-utils';

describe('TimePicker', () => {

  const createDriver = createDriverFactory(timePickerDriverFactory);
  const SOME_VALUE = '10:04';

  describe('external functions', () => {
    describe('increment', () => {
      it('should default to minute increments', () => {
        const driver = createDriver(<TimePicker value = "10:30" />);
        driver.increment();
        expect(driver.getValue()).toEqual('10:31');
      });

      describe('last focused field', () => {
        it('should increment the value by 1 hour when last focused field was hour', () => {
          const driver = createDriver(<TimePicker value = "10:30"/>);
          driver.focus();
          driver.blur();
          driver.increment();
          expect(driver.getValue()).toEqual('11:30');
        });

        it('should increment the value by 1 minute when last focused field was minute', () => {
          const driver = createDriver(<TimePicker value = "10:30"/>);
          driver.focus();
          driver.keyDown('Tab');
          driver.blur();
          driver.increment();
          expect(driver.getValue()).toEqual('10:31');
        });

        it('should increment the value by 12 hours when last focused field was ampm', () => {
          const driver = createDriver(<TimePicker value = "10:30" useAmPm/>);
          driver.focus();
          driver.keyDown('Tab');
          driver.keyDown('Tab');
          driver.blur();
          driver.increment();
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });

      describe('calling with field arguments', () => {
        it('should increment the value by 1 minute when passing FIELD.MINUTE as argument', () => {
          const driver = createDriver(<TimePicker value = "10:30"/>);
          driver.increment(FIELD.MINUTE);
          expect(driver.getValue()).toEqual('10:31');
        });

        it('should increment the value by 1 hour when passing FIELD.HOUR as argument', () => {
          const driver = createDriver(<TimePicker value = "10:30"/>);
          driver.increment(FIELD.HOUR);
          expect(driver.getValue()).toEqual('11:30');
        });

        it('should increment the value by 12 hours when passing FIELD.AMPM argument', () => {
          const driver = createDriver(<TimePicker value = "10:30" useAmPm/>);
          driver.increment(FIELD.AMPM);
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });
    });

    describe('decrement', () => {
      it('should default to minute decrements', () => {
        const driver = createDriver(<TimePicker value = "10:30" />);
        driver.decrement();
        expect(driver.getValue()).toEqual('10:29');
      });

      describe('last focused field', () => {
        it('should decrement the value by 1 hour when last focused field was hour', () => {
          const driver = createDriver(<TimePicker value = "10:30" />);
          driver.focus();
          driver.blur();
          driver.decrement();
          expect(driver.getValue()).toEqual('09:30');
        });

        it('should decrement the value by 1 minute when last focused field was minute', () => {
          const driver = createDriver(<TimePicker value = "10:30" />);
          driver.focus();
          driver.keyDown('Tab');
          driver.blur();
          driver.decrement();
          expect(driver.getValue()).toEqual('10:29');
        });

        it('should decrement the value by 12 hours when last focused field was ampm', () => {
          const driver = createDriver(<TimePicker value = "10:30" useAmPm />);
          driver.focus();
          driver.keyDown('Tab');
          driver.keyDown('Tab');
          driver.blur();
          driver.decrement();
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });

      describe('calling with field arguments', () => {
        it('should decrement the value by 1 minute when passing FIELD.MINUTE as argument', () => {
          const driver = createDriver(<TimePicker value = "10:30" />);
          driver.decrement(FIELD.MINUTE);
          expect(driver.getValue()).toEqual('10:29');
        });

        it('should decrement the value by 1 hour when passing FIELD.HOUR as argument', () => {
          const driver = createDriver(<TimePicker value = "10:30" />);
          driver.decrement(FIELD.HOUR);
          expect(driver.getValue()).toEqual('09:30');
        });

        it('should decrement the value by 12 hours when passing FIELD.AMPM argument', () => {
          const driver = createDriver(<TimePicker value = "10:30" useAmPm />);
          driver.decrement(FIELD.AMPM);
          expect(driver.getValue()).toEqual('10:30 PM');
        });
      });
    });

    describe('focus', () => {
      it('should focus the input element', () => {
        const container = renderIntoDocument(<TimePicker/>);
        const element = findRenderedDOMComponentWithTag(container, 'input');
        expect(document.activeElement === element).toBeFalsy();
        container.focus();
        expect(document.activeElement === element).toBeTruthy();
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
      const driver = createDriver(<TimePicker useNativeInteraction = {true} />);
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
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {true} />);
      expect(driver.getValue()).toEqual(convertToAmPm(SOME_VALUE));
    });
  });

  describe('step prop', () => {
    it('should default to 1', () => {
      const driver = createDriver(<TimePicker value = "10:30" />);
      driver.increment();
      expect(driver.getValue()).toEqual('10:31');
    });

    it('should increment value by 5 minutes when step is set to 5', () => {
      const driver = createDriver(<TimePicker value = "10:30" step = {5}/>);
      driver.increment();
      expect(driver.getValue()).toEqual('10:35');
    });
  });

  describe('separateSteps prop', () => {
    it('should default to false', () => {
      const driver = createDriver(<TimePicker value = "10:59" />);
      driver.increment();
      expect(driver.getValue()).toEqual('11:00');
    });

    it('should increment hour when incrementing one minute over 59, when false', () => {
      const driver = createDriver(<TimePicker value = "10:59" separateSteps = {false}/>);
      driver.increment();
      expect(driver.getValue()).toEqual('11:00');
    });

    it('should not increment hour when incrementing one minute over 59, when true', () => {
      const driver = createDriver(<TimePicker value = "10:59" separateSteps = {true} />);
      driver.increment();
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
        getValue() { return this.refs.timePicker; }
        render() { return (<TimePicker ref= "timePicker" value={this.state.value}/>); }
      }

      const container = renderIntoDocument(<ValueContainer value = {SOME_VALUE}/>);
      const element   = findRenderedDOMComponentWithTag(container, 'input');
      const NEW_VALUE = '13:13';
      container.setValue(NEW_VALUE);
      expect(element.value).toEqual(NEW_VALUE);
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

  // TODO
  describe('styles', () => {
    it('root should be inline-flex', () => {
      // const driver = createDriver(<TimePicker onChange={noop}/>);
      // expect(driver.styles.getRootDisplay()).toBe('inline-flex');
      expect(true).toBe(true);
    });
  });
});
