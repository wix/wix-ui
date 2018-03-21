import * as React from 'react';
import {labelDriverFactory} from './Label.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {labelTestkitFactory} from '../../testkit';
import {labelTestkitFactory as enzymeLabelTestkitFactory} from '../../testkit/enzyme';
import {Label} from './Label';
import {mount} from 'enzyme';

describe('Label', () => {
  const createDriver = createDriverFactory(labelDriverFactory);
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
