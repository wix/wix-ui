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
});
