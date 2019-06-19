import * as React from 'react';
import { mount } from 'enzyme';

import AutoDocs from './';
import { hiddenMethods } from './methods-table';

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
      methodsTableRows: () => byHook('autodocs-methods-table-row'),
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

  describe('methods table', () => {
    it('should not render lifecycle methods', () => {
      const driver = testkit();
      const methods = [
        ...hiddenMethods,
        '_privateMethod',
        'publicCoolMethod',
        'publicAwesomeMethod',
      ].map(name => ({ name, params: [], description: '' }));

      driver.when.created({
        metadata: {
          props: {},
          methods,
        },
      });

      const rows = driver.get.methodsTableRows();
      expect(rows.length).toEqual(2);
      expect(rows.at(0).text()).toEqual('publicCoolMethod');
      expect(rows.at(1).text()).toEqual('publicAwesomeMethod');
    });
  });
});
