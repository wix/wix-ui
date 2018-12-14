import * as React from 'react';
import { mount } from 'enzyme';

import { description as descriptionView } from './description';
import { description } from '../';
const Markdown = require('../../Markdown').default;

const createDescription = text => mount(descriptionView(description({ text })));

describe('Section: description', () => {
  describe('given string in `text`', () => {
    it('should render as markdown', () => {
      const source = '# hello';
      const wrapper = createDescription(source);
      expect(wrapper.find(Markdown).prop('source')).toEqual(source);
    });
  });

  describe('given component in `text`', () => {
    it('should render that component', () => {
      const component = ({ number }) => <div>Blink {number}</div>;
      const wrapper = createDescription(
        React.createElement(component, { number: 182 }),
      );
      expect(wrapper.find(component).text()).toEqual('Blink 182');
    });
  });
});
