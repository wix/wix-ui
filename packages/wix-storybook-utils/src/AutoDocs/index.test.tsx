import * as React from 'react';
import { mount } from 'enzyme';

import AutoDocs from './';

describe('AutoDocs', () => {
  it('should render props sorted alphabetically with required prioritized', () => {
    const props = {
      parsedSource: {
        props: {
          d: { type: 'string' },
          z: { type: 'string', required: true },
          a: { type: 'string' },
          dz: { type: 'string' },
          '42z': { type: 'string' },
        },
      },
    };

    const expectedOrder = ['z', '42z', 'a', 'd', 'dz'];

    const renderedProps = mount(<AutoDocs {...props} />)
      .find('[data-hook="autodocs-prop-row-name"]')
      .map(node => node.text());

    expect(renderedProps).toEqual(expectedOrder);
  });
});
