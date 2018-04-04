import * as React from 'react';
import {mount} from 'enzyme';
import {VBox} from './';

describe('VBox', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('should render the passed children', () => {
    wrapper = mount(<VBox><div>1</div></VBox>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});
