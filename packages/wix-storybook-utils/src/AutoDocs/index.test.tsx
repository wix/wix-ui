import * as React from 'react';
import { mount } from 'enzyme';

import AutoDocs from './';

describe('AutoDocs', () => {
  it('should render props sorted alphabetically with required prioritized', () => {
    const type = { name: 'string' };
    const props = {
      parsedSource: {
        displayName: '',
        props: {
          d: { type },
          z: { type, required: true },
          a: { type },
          dz: { type },
          '42z': { type },
        },
      },
    };

    const expectedOrder = ['z', '42z', 'a', 'd', 'dz'];

    const rendered = mount(<AutoDocs {...props} />)
      .find('[data-hook="autodocs-prop-row-name"]')
      .map(node => node.text());

    expect(rendered).toEqual(expectedOrder);
  });

  describe('`showMethods` prop', () => {
    it('should be true by default', () => {
      const props = {
        parsedSource: {
          displayName: '',
          props: {},
          methods: [{ name: 'testMethod' }],
        },
      };

      const rendered = mount(<AutoDocs {...props} />);
      expect(rendered.find('[data-hook="methods-table"] h2').text()).toEqual(
        'Public methods',
      );
    });

    it('should hide methods table when false', () => {
      const props = {
        showMethods: false,
        parsedSource: {
          displayName: '',
          props: {},
          methods: [{ name: 'testMethod', params: [] }],
        },
      };

      const rendered = mount(<AutoDocs {...props} />);
      expect(rendered.find('[data-hook="methods-table"]').length).toEqual(0);
    });
  });
});
