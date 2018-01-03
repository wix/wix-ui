import * as React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Hello from '../../src/Hello';

describe('<Hello />', () => {
  it('should render a hello message with a custom name', () => {
    const name = 'Skywalker';
    const wrapper = shallow(<Hello name={name}/>);
    expect(wrapper.text()).to.equal(`Hello ${name}!`);
  });
});
