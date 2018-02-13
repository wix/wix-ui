import * as React from 'react';
import times = require('lodash.times');
import {mount} from 'enzyme';
import {boxDriverFactory} from './Box.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Box} from './';

describe('Box', () => {
  let wrapper;

  afterEach(() => {
    wrapper.detach();
  });

  it('should render the passed children', () => {
    wrapper = mount(<Box><div>1</div></Box>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});

describe('Box styling', () => {
  const createDriver = createDriverFactory(boxDriverFactory);
  const boxMaker = (numBoxes: number = 1, vertical = false) => {
    return <Box vertical={vertical}>{times(numBoxes, (index) => (<div key={index}>{index}</div>))}</Box>;
  };

  describe('Box default (horizontal)', () => {
    const defaultBox = boxMaker(1);

    it('with unspecified vertical orientation should be horizontal by default', () => {
      const driver = createDriver(<Box><div>1</div></Box>);
      expect(driver.getFlexDirection()).toBe('row');
    });

    it('should have alignment bottom by default', () => {
      const driver = createDriver(defaultBox);
      expect(driver.getAlignment()).toBe('flex-end');
    });

    it('should use flex direction row by default', () => {
      const driver = createDriver(defaultBox);
      expect(driver.getFlexDirection()).toBe('row');
    });

    it('should have a default spacing of 0', () => {
      const testBox = boxMaker(2);
      const driver = createDriver(testBox);
      const childStyle = driver.getChildStyle(0);
      expect(childStyle.marginRight).toBe('0px');
    });
  });

  describe('Box: vertical variant', () => {
    const defaultVerticalBox = boxMaker(1, true);

    it('should use flex direction column', () => {
      const driver = createDriver(defaultVerticalBox);
      expect(driver.getFlexDirection()).toBe('column');
    });

    it('should have a default spacing of 20px', () => {
      const testBox = boxMaker(2, true);
      const driver = createDriver(testBox);
      const childStyle = driver.getChildStyle(0);
      expect(childStyle.marginBottom).toBe('20px');
    });
  });
});
