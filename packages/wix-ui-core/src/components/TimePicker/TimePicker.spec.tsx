import * as React from 'react';
import {mount} from 'enzyme';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {TimePicker} from './index';
import {FIELD, AmPmOptions, AmPmStrings} from './constants';
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
      focus: () => reactInput.simulate('focus'),
      blur: () => reactInput.simulate('blur'),
      tab: () => reactInput.simulate('keyDown', {key: 'Tab'}),
      getValue: () => inputElement.value,
      getInputElement: () => inputElement
    };
  };

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
    it('should use none as default', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} />);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should display time in 24-hour format when AmPmOptions.None', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {AmPmOptions.None}/>);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should display time in lowercase 12-hour format when AmPmOptions.Lowercase', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {AmPmOptions.Lowercase} />);
      expect(driver.getValue()).toEqual(convertToAmPm({value: SOME_VALUE, strings: AmPmStrings[AmPmOptions.Lowercase]}));
    });

    it('should display time in uppercase 12-hour format when AmPmOptions.Uppercase', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {AmPmOptions.Uppercase} />);
      expect(driver.getValue()).toEqual(convertToAmPm({value: SOME_VALUE, strings: AmPmStrings[AmPmOptions.Uppercase]}));
    });

    it('should display time in capitalized 12-hour format when AmPmOptions.Capitalized', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE} useAmPm = {AmPmOptions.Capitalized} />);
      expect(driver.getValue()).toEqual(convertToAmPm({value: SOME_VALUE, strings: AmPmStrings[AmPmOptions.Capitalized]}));
    });
  });

  describe('step prop', () => {
    it('should default to 1 minute', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE} />);
      driver.keyDown('Tab');
      driver.keyDown('Tab');
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('10:05');
    });
    
    it('should increment value by 5 minutes when step is set to 5', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE} step={5}/>);
      driver.keyDown('Tab');
      driver.keyDown('Tab');
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('10:09');
    });

    it('should increment hour value by 1', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE}/>);
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('11:04');
    });

    it('should increment hour value by 1 when step is set to 60', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE} step={60}/>);
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('11:04');
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
        timePickerRef: React.RefObject<TimePicker>;
        constructor(props) {
          super(props);
          this.timePickerRef = React.createRef();
          this.state = {value: props.value};
          this.setValue = this.setValue.bind(this);
        }
        setValue(value) { this.setState({value}); }
        render() { return (<TimePicker ref={this.timePickerRef} value={this.state.value}/>); }
      }

      const container = mount(<ValueContainer value = {SOME_VALUE}/>);
      const inputElement = container.find('input').getDOMNode() as HTMLInputElement;
      expect(inputElement.value).toEqual(SOME_VALUE);
      const NEW_VALUE = '13:13';
      (container.instance() as ValueContainer).setValue(NEW_VALUE);
      expect(inputElement.value).toEqual(NEW_VALUE);
    });
  });
});
