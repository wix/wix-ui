import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import {Wrapper} from './';

describe('Wrapper component', () => {
  it('should render children', () => {
    const wrapper = shallow(<Wrapper>hello world</Wrapper>);
    expect(wrapper.html()).to.match(/hello world/);
  });
});
