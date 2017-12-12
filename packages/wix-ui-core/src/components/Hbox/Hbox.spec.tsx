import * as React from 'react';
import {mount} from 'enzyme';
import Hbox from './';

describe('Hbox', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render the passed children', () => {
    wrapper = mount(<Hbox><div>1</div></Hbox>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});
