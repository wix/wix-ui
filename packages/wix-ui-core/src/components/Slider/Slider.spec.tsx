import * as React from 'react';
import {sliderDriverFactory} from './Slider.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import Slider from './index';
// import {sliderTestkitFactory} from '../../testkit';
// import {sliderTestkitFactory as enzymesliderTestkitFactory} from '../../testkit/enzyme';
import * as sinon from 'sinon';

describe('Slider', () => {

  const createDriver = createDriverFactory(sliderDriverFactory);
  const noop = () => null;

    it('should exist', () => {
      const driver = createDriver(<Slider/>);
      expect(driver.exists()).toBe(true);
    });

    it('should render props', () => {
        const driver = createDriver(<Slider min={4} max={20} value={7} onChange={noop}/>);
        expect(driver.min()).toBe('4');
        expect(driver.max()).toBe('20');
        expect(driver.value()).toBe('7');
    });

    it('should trigger onChange', () => {
        const onChange = sinon.spy();
        const driver = createDriver(<Slider min={4} max={20} value={7} onChange={onChange}/>);
        driver.change();
        sinon.assert.called(onChange);
    });
});
