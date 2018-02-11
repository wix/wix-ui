import * as React from 'react';
import {mount} from 'enzyme';
import {HBox} from './';

describe('HBox', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render the passed children', () => {
    wrapper = mount(<HBox><div>1</div></HBox>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});
