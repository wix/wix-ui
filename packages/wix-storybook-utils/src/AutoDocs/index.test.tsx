import * as React from 'react';
import { mount } from 'enzyme';

import AutoDocs from './';

const testkit = () => {
  let component;

  const byHook = hook => component.find(`[data-hook="${hook}"]`);

  return {
    when: {
      created: props => {
        component = mount(<AutoDocs {...props} />);
        return component;
      },
    },

    get: {
      propsTables: () => byHook('autodocs-props-table'),
      propRows: () => byHook('autodocs-prop-row-name'),
      methodsTable: () => byHook('autodocs-methods-table'),
      methodsTableTitle: () => byHook('autodocs-methods-table-title'),
    },
  };
};

describe('AutoDocs', () => {
  it('should render props sorted alphabetically with required prioritized', () => {
    const type = { name: 'string' };
    const props = {
      metadata: {
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

    const driver = testkit();
    driver.when.created(props);
    const propNames = driver.get.propRows().map(node => node.text());

    expect(propNames).toEqual(expectedOrder);
  });

  describe('given metadata with deprecated props', () => {
    it('should display separate table for depreacted props', () => {
      const driver = testkit();
      driver.when.created({
        metadata: {
          props: { deprecated: { tags: [{ title: 'deprecated' }] } },
        },
      });

      expect(driver.get.propsTables().length).toEqual(2);
    });
  });
});
