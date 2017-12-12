import * as React from 'react';
import {mount} from 'enzyme';
import Vbox from './';

describe('Vbox', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render the passed children', () => {
    wrapper = mount(<Vbox><div>1</div></Vbox>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});
