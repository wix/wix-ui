import React from 'react';
import {mount} from 'enzyme';
import ToggleSwitch from './index';

describe('ToggleSwitch', () => {
  describe('Events', () => {
    it('Should handle focus event', () => {
      const onFocus = jest.fn();
      const wrapper = mount(<ToggleSwitch onFocus={onFocus} onChange={() => {}}/>);
      wrapper.find('input').simulate('focus');
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('Should handle blur event', () => {
      const onBlur = jest.fn();
      const wrapper = mount(<ToggleSwitch onBlur={onBlur} onChange={() => {}}/>);
      wrapper.find('input').simulate('blur');
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});
