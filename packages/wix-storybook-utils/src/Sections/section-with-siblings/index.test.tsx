import { mount } from 'enzyme';

import { sectionWithSiblings } from '.';

import * as sectionBuilders from '../';

describe('sectionWithSiblings', () => {
  ['title', 'header'].map(section => {
    it(`should not render siblings for ${section} section`, () => {
      const expectation = `${section} without siblings`;

      const rendered = mount(
        sectionWithSiblings(
          sectionBuilders[section]({
            pretitle: 'i',
            title: 'should',
            subtitle: 'not',
            description: 'show',
          }),
          expectation,
        ),
      );

      expect(rendered.text()).toEqual(expectation);
    });
  });
});
