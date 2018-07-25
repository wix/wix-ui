import * as React from 'react';
import {mount} from 'enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {TimePicker} from './index';
import {FIELD, AmPmOptions, AmPmStrings} from './constants';
import {convertToAmPm} from './utils';
import {timePickerDriverFactory} from './TimePicker.driver';
import {StylableDOMUtil} from 'stylable/test-utils';
import style from './TimePicker.st.css';

const stylableUtil = new StylableDOMUtil(style);

describe('TimePicker', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(timePickerDriverFactory);

  const SOME_VALUE = '10:04';

  describe('onChange prop', () => {
    it('should be called with a new time when a new valid time is set', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = "10:00" onChange = {onChange} />);
      driver.focus();
      driver.keyDown('ArrowDown');
      expect(onChange).toBeCalledWith('09:00');
    });

    it('should be called with null when deleting a valid time to "--:--"', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} onChange={onChange} />);
      driver.focus();
      driver.keyDown('Delete');
      driver.keyDown('Tab');
      driver.keyDown('Delete');
      expect(onChange).toBeCalledWith(null);
    });

    it('should not be called when only one field is deleted', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} onChange={onChange} />);
      driver.focus();
      driver.keyDown('Delete');
      expect(onChange).not.toBeCalled();
    });

    it('should be called when only one field is deleted and then blurred', () => {
      const onChange = jest.fn();
      const driver = createDriver(<TimePicker value = "10:00" onChange={onChange} />);
      driver.focus();
      driver.keyDown('Delete');
      driver.blur();
      expect(onChange).toBeCalledWith('00:00');
    });
  });

  describe('onFocus and onBlur props', () => {
    it('should call the onFocus prop when focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<TimePicker onFocus={onFocus} />);
      driver.focus();
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call the onBlur prop when blurred', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<TimePicker onBlur={onBlur} />);
      driver.focus();
      driver.blur();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('useNativeInteraction prop', () => {
    it('should default to false', () => {
      const driver = createDriver(<TimePicker />);
      expect(driver.getInputType()).toEqual('text');
    });

    it('should send empty string value instead of null value', () => {
      const driver = createDriver(<TimePicker useNativeInteraction value = {null} />);
      expect(driver.getValue()).toEqual('');
    });

    it('should use type = "text" for false', () => {
      const driver = createDriver(<TimePicker useNativeInteraction = {false} />);
      expect(driver.getInputType()).toEqual('text');
    });

    it('should use type = "time" for true', () => {
      const driver = createDriver(<TimePicker useNativeInteraction />);
      expect(driver.getInputType()).toEqual('time');
    });

    it('should crop the time value to HH:MM format', () => {
      const driver = createDriver(<TimePicker useNativeInteraction value = "12:12:12" />);
      expect(driver.getValue()).toEqual('12:12');
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
      driver.focus();
      driver.keyDown('Tab');
      driver.keyDown('Tab');
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('10:05');
    });

    it('should increment value by 5 minutes when step is set to 5', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE} step={5}/>);
      driver.focus();
      driver.keyDown('Tab');
      driver.keyDown('Tab');
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('10:09');
    });

    it('should increment hour value by 1', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE}/>);
      driver.focus();
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('11:04');
    });

    it('should increment hour value by 1 when step is set to 60', () => {
      const driver = createDriver(<TimePicker value={SOME_VALUE} step={60}/>);
      driver.focus();
      driver.keyDown('ArrowUp');
      expect(driver.getValue()).toEqual('11:04');
    });
  });

  describe('value prop', () => {
    it('should use blank "--:--" as default', () => {
      const driver = createDriver(<TimePicker />);
      expect(driver.getValue()).toEqual('--:--');
    });

    it('should set the value according to the value prop HH:MM format', () => {
      const driver = createDriver(<TimePicker value = {SOME_VALUE}/>);
      expect(driver.getValue()).toEqual(SOME_VALUE);
    });

    it('should set the value according to the value prop HH:MM:SS format', () => {
      const driver = createDriver(<TimePicker value = "12:34:56"/>);
      expect(driver.getValue()).toEqual('12:34');
    });

    it('should set the value according to the value prop HH:MM:SS.mmm format', () => {
      const driver = createDriver(<TimePicker value = "12:34:56.789"/>);
      expect(driver.getValue()).toEqual('12:34');
    });

    it('should set the value when a new value is sent', () => {
      class ValueContainer extends React.Component<{value: string}, {value: string}> {
        timePickerRef: React.RefObject<TimePicker>;
        constructor(props) {
          super(props);
          this.timePickerRef = React.createRef();
          this.setValue = this.setValue.bind(this);
        }

        state = {value: this.props.value};

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

    describe('invalid values', () => {
      let stub;
      beforeEach(() => stub = jest.spyOn(console, 'error').mockImplementation(() => null));
      afterEach(() => stub.mockRestore());

      it('should validate the prop and console.error if not valid', () => {
        const driver = createDriver(<TimePicker value = 'a' />);
        expect(stub).toHaveBeenCalled();
      });

      it('should show blank when value is invalid', () => {
        const driver = createDriver(<TimePicker value = 'a'/>);
        expect(driver.getValue()).toEqual('--:--');
      });

      it('should show blank when value is invalid time', () => {
        const driver = createDriver(<TimePicker value = '12:60'/>);
        expect(driver.getValue()).toEqual('--:--');
      });

      it('should send empty string value instead of invalid value when using native interaction', () => {
        const driver = createDriver(<TimePicker useNativeInteraction value="a" />);
        expect(driver.getValue()).toEqual('');
      });
    });
  });

  describe('style prop', () => {
    it('should set inline style on input', () => {
      const inlineStyle = {width: '123px'};
      const driver = createDriver(<TimePicker style={inlineStyle}/>);
      expect(driver.getInlineStyle()).toEqual(expect.objectContaining(inlineStyle));
    });
  });

  describe('tickers', () => {
    const tickerUpIcon = <div data-hook="ticker-up"/>;
    const tickerDownIcon = <div data-hook="ticker-down"/>;

    it('should render tickers when both tickerUpIcon and tickerDownIcon are supplied', () => {
      const driver = createDriver(<TimePicker tickerUpIcon = {tickerUpIcon} tickerDownIcon = {tickerDownIcon}/>);
      expect(driver.getTickers()).toBeTruthy();
    });

    it('should NOT render tickers if both tickerUpIcon and tickerDownIcon are not supplied', () => {
      const driver = createDriver(<TimePicker tickerDownIcon = {tickerDownIcon} />);
      expect(driver.getTickers()).toBeFalsy();
    });

    it('should call onChange with correct value when up ticker is clicked and valid time is set', () => {
      const onChangeSpy = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} tickerUpIcon = {tickerUpIcon} tickerDownIcon = {tickerDownIcon} onChange = {onChangeSpy}/>);
      driver.clickTickerUp();
      expect(onChangeSpy).toHaveBeenCalledWith('10:05');
    });

    it('should call onChange with correct value when down ticker is clicked and valid time is set', () => {
      const onChangeSpy = jest.fn();
      const driver = createDriver(<TimePicker value = {SOME_VALUE} tickerUpIcon = {tickerUpIcon} tickerDownIcon = {tickerDownIcon} onChange = {onChangeSpy} />);
      driver.clickTickerDown();
      expect(onChangeSpy).toHaveBeenCalledWith('10:03');
    });

    it('should NOT call onChange with correct value when up ticker is clicked and invalid time is set, but should update the display', () => {
      const onChangeSpy = jest.fn();
      const driver = createDriver(<TimePicker tickerUpIcon = {tickerUpIcon} tickerDownIcon = {tickerDownIcon} onChange = {onChangeSpy}/>);
      driver.clickTickerUp();
      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(driver.getValue()).toEqual('--:01');
    });

    it('should NOT call onChange with correct value when down ticker is clicked and invalid time is set, but should update the display', () => {
      const onChangeSpy = jest.fn();
      const driver = createDriver(<TimePicker tickerUpIcon = {tickerUpIcon} tickerDownIcon = {tickerDownIcon} onChange = {onChangeSpy} />);
      driver.clickTickerDown();
      expect(onChangeSpy).not.toHaveBeenCalled();
      expect(driver.getValue()).toEqual('--:59');
    });
  });

  it('should support focus state', () => {
    const driver = createDriver(<TimePicker/>);
    expect(stylableUtil.hasStyleState(driver.element(), 'focus')).toBeFalsy();
    driver.focus();
    expect(stylableUtil.hasStyleState(driver.element(), 'focus')).toBeTruthy();
    driver.blur();
    expect(stylableUtil.hasStyleState(driver.element(), 'focus')).toBeFalsy();
  });

});
