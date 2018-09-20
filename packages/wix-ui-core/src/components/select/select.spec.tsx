/* global describe it */
import * as React from 'react';

import {selectDriverFactory} from './select.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {Select} from './select';

const createDriver = new ReactDOMTestContainer()
  .unmountAfterEachTest()
  .createLegacyRenderer(selectDriverFactory);

const isTestEnv = process.env.NODE_ENV === 'test';
if (isTestEnv && typeof document !== 'undefined') {
  if (!document.createRange) {
    document.createRange = () =>
      ({
        setStart: () => null,
        setEnd: () => null,
        commonAncestorContainer: {
          nodeName: 'BODY'
        }
      } as any);
  }
}

describe('Select', () => {
  it('should render', () => {
    const select = createDriver(<Select children="hi" />);
    expect(select.exists()).toBe(true);
  });

  describe('`toggle` prop', () => {
    it('should render button by default', () => {
      const select = createDriver(<Select children="hi" />);
      expect(select.getToggle().isButton()).toEqual(true);
    });

    it('should render input, when returning <Input/>', () => {
      const select = createDriver(
        <Select children="hi" toggle={() => <input />} />
      );
      expect(select.getToggle().isInput()).toEqual(true);
    });

    it('should be invoked with downshift interface', () => {
      const toggle = jest.fn();
      const select = createDriver(<Select toggle={toggle} children="hi" />);
      expect(toggle.mock.calls[0][0]).toMatchObject({
        getToggleButtonProps: expect.any(Function)
      });
    });
  });
});
