import * as React from 'react';
import {mount} from 'enzyme';
import {Highlighter} from '.';

describe('Highlighter', () => {
  it('should wrap children with strong tag', () => {
    const wrapper = mount(<Highlighter>Text</Highlighter>);
    const element = wrapper.children().at(0).getDOMNode();
    expect(element.tagName).toEqual('STRONG');
    expect(element.innerHTML).toEqual('Text');
  });
});
