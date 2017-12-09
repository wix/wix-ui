import React from 'react';
import {shallow} from 'enzyme';

import {Wrapper} from './';

describe('Wrapper component', () => {
  it('should render children', () => {
    const wrapper = shallow(<Wrapper>hello world</Wrapper>);
    expect(wrapper.html()).toMatch(/hello world/);
  });
});
