import { mount } from 'enzyme';

import { sectionWithSiblings } from '.';

import { title } from '../';

describe('sectionWithSiblings', () => {
  it('should not render siblings for `title` section', () => {
    const rendered = mount(
      sectionWithSiblings(
        title({
          pretitle: 'i',
          title: 'should',
          subtitle: 'not',
          description: 'show',
        }),
        'i should show',
      ),
    );

    expect(rendered.text()).toEqual('i should show');
  });
});
