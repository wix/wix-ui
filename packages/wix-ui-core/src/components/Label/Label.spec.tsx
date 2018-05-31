import * as React from 'react';
import {labelDriverFactory} from './Label.driver';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {labelTestkitFactory} from '../../testkit';
import {labelTestkitFactory as enzymeLabelTestkitFactory} from '../../testkit/enzyme';
import {Label} from './Label';
import {mount} from 'enzyme';

describe('Label', () => {
  const createDriver =
    new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(labelDriverFactory);

  it('Renders children', async () => {
    const label = createDriver(<Label>HELLO</Label>);

    expect(label.getLabelText()).toBe('HELLO');
  });

  it('takes an id prop', async () => {
    const label = createDriver(<Label id="hey" />);

    expect(label.getId()).toBe('hey');
  });

  it('takes an htmlFor prop', async () => {
    const label = createDriver(<Label for="hey" />);

    expect(label.getForAttribute()).toBe('hey');
  });

  describe('ellipsis attribute', () => {
    it('should not have ellipsis by default', () => {
      const driver = createDriver(<Label>Hello World</Label>);
      expect(driver.hasEllipsis()).toBeFalsy();
    });

    it('should have ellipsis', () => {
      const driver = createDriver(<Label ellipsis>Hello World</Label>);
      expect(driver.hasEllipsis()).toBeTruthy();
    });
  });

  it('takes a disabled prop', async () => {
    const label = createDriver(<Label disabled />);

    expect(label.isDisabled()).toBe(true);
  });

  it('should not be disabled by default', async () => {
    const label = createDriver(<Label />);

    expect(label.isDisabled()).toBe(false);
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<Label />, labelTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<Label />, enzymeLabelTestkitFactory, mount)).toBe(true);
    });
  });
});
