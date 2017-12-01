import * as React from 'react';
import {mount} from 'enzyme';
import {isClassExists, makeControlled} from '../src/helpers';

describe('helpers', () => {
  describe('isClassExists function', () => {
    const classes = 'class class2 class3';
    const element = {className: classes};

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

  describe('makeControlled function', () => {
    const UncontrolledInput = props => <input {...props}/>;

    it('should init uncontrolled component with initial value', () => {
      const ControlledInput = makeControlled(UncontrolledInput);
      const initialValue = 'some value';

      const component = mount(
        <ControlledInput
          value={initialValue}
          />
      );

      expect(component.find('input').getNode().value).toBe(initialValue);
    });

    it('should invoke onChange callback', () => {
      const onChange = jest.fn();
      const ControlledInput = makeControlled(UncontrolledInput);

      const component = mount(
        <ControlledInput
          onChange={onChange}
          />
      );

      const enteredValue = 'some value';
      const input = component.find('input');
      input.simulate('change', {target: {value: enteredValue}});

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.value).toBe(enteredValue);
      expect(input.getNode().value).toBe(enteredValue);
    });

    it('should bind passed prop-functions to *this*', () => {
      // NOTE: don't use arrow functions
      const onEnter = function () {
        this.setState({value: ''});
      };

      const NotifyOnEnter = ({onEnter, ...passedProps}) => (
        <UncontrolledInput
          {...passedProps}
          onKeyPress={e => e.key === 'Enter' && onEnter()}
          />
      );

      NotifyOnEnter.propTypes = {
        onEnter: PropTypes.func
      };

      const ControlledInput = makeControlled(NotifyOnEnter);

      const component = mount(
        <ControlledInput
          value="some value"
          onEnter={onEnter}
          />
      );

      const input = component.find('input');
      input.simulate('keypress', {key: 'Enter'});
      expect(input.getNode().value).toBe('');
    });
  });
});
