import * as React from 'react';
import {mount} from 'enzyme';
import {boxDriverFactory} from './Box.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import * as times from 'lodash/times';
import Box from './';

describe('Box', () => {
  let wrapper;

  afterEach(() => {
    wrapper.detach();
  });

  it('should render the passed children', () => {
    wrapper = mount(<Box theme={{vertical: true}}><div>1</div></Box>, {attachTo: document.createElement('div')});
    expect(wrapper.html()).toContain('<div>1</div>');
  });
});

describe('Box styling', () => {
  const createDriver = createDriverFactory(boxDriverFactory);
  const boxMaker = (vertical: boolean = false, numBoxes: number = 1) => (<Box theme={{vertical}}>{times(numBoxes, (index) => (<div key={index}>{index}</div>))}</Box>);
  describe('Box default', () => {
    const defaultBox = boxMaker(false, 1);

    it('with unspecified vertical orientation should be horizontal by default', () => {
      const driver = createDriver(<Box><div>1</div></Box>);
      expect(driver.getFlexDirection()).toBe('row');
    });
    it('should have alignment bottom by default', () => {
      const driver = createDriver(defaultBox);
      expect(driver.getAlignment()).toBe('flex-end');
    });
    it('should use flex direction row by default', () => {
      const driver = createDriver(<Box theme={{vertical: false}}><div>1</div></Box>);
      expect(driver.getFlexDirection()).toBe('row');
    });
    it('should have a default spacing of 0', () => {
      const testBox = boxMaker(false, 2);
      const driver = createDriver(testBox);
      const childStyle = driver.getChildStyle(0);
      expect(childStyle.marginRight).toBe('0px');
    });
  });
  describe('Box: vertical variant', () => {
    const defaultVerticalBox = boxMaker(true, 1);
    it('should use flex direction column', () => {
      const driver = createDriver(defaultVerticalBox);
      expect(driver.getFlexDirection()).toBe('column');
    });
    it('should have a default spacing of 20px', () => {
      const testBox = boxMaker(true, 2);
      const driver = createDriver(testBox);
      const childStyle = driver.getChildStyle(0);
      expect(childStyle.marginBottom).toBe('20px');
    });
  });
});
