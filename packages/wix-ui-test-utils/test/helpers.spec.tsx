import * as React from 'react';
import {mount} from 'enzyme';
import {isClassExists, makeControlled, sleep} from '../src';

describe('helpers', () => {
  describe('isClassExists function', () => {
    const classes = 'class class2 class3';
    const element = document.createElement('div');
    element.className = classes;

    describe('existing class', () => {
      classes.split(' ').forEach(className =>
        it(`should return true for className ${className}`, () => {
          expect(isClassExists(element, className)).toBe(true);
        })
      );
    });

    describe('none existing classes', () => {
      [undefined, 'cla', 'class4'].forEach(className =>
        it(`should return false for className ${className}`, () => {
          expect(isClassExists(element, className)).toBe(false);
        })
      );
    });
  });

  describe('sleep helper', () => {
    it('sleeps', async () => {
      let previousTime = Date.now();
      await sleep(50);
      expect(Date.now()).toBeGreaterThanOrEqual(previousTime + 50);
    });
  });

  describe('makeControlled function', () => {
    const UncontrolledInput = props => <input {...props}/>;

    it('should init uncontrolled component with initial value', () => {
      const ControlledInput = makeControlled(UncontrolledInput);
      const initialValue = 'some value';

      const component = mount(<ControlledInput value={initialValue}/>);

      expect(component.find('input').getDOMNode().value).toBe(initialValue);
    });

    it('should invoke onChange callback', () => {
      const onChange = jest.fn();
      const ControlledInput = makeControlled(UncontrolledInput);

      const component = mount(
        <ControlledInput onChange={onChange}/>
      );

      const enteredValue = 'some value';
      const input = component.find('input');
      input.simulate('change', {target: {value: enteredValue}});

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.value).toBe(enteredValue);
      expect(input.getDOMNode().value).toBe(enteredValue);
    });

    it('should bind passed prop-functions to *this*', () => {
      const NotifyOnEnter: React.SFC<any> = ({onEnter, ...passedProps}) => (
        <UncontrolledInput
          {...passedProps}
          onKeyPress={e => e.key === 'Enter' && onEnter()}
        />
      );

      const ControlledInput = makeControlled(NotifyOnEnter);

      const component = mount(
        <ControlledInput
          value="some value"
          onEnter={function () {
            // NOTE: don't use arrow functions by purpose
            /* tslint:disable */
            this.setState({value: ''});
            /* tslint:enable */
          }}
        />
      );

      const input = component.find('input');
      input.simulate('keypress', {key: 'Enter'});
      expect(input.getDOMNode().value).toBe('');
    });
  });
});
