import * as React from 'react';
import {mount} from 'enzyme';
import {boxDriverFactory} from './Box.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
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

  it('vBox should use flex direction column', () => {
    const driver = createDriver(<Box theme={{vertical: true}}><div>1</div></Box>);
    expect(driver.getFlexDirection()).toBe('column');
  });
  it('a box with unspecified vertical orientation should be horizontal by default', () => {
    const driver = createDriver(<Box><div>1</div></Box>);
    expect(driver.getFlexDirection()).toBe('row');
  });
  it('hBox should have alignment bottom by default', () => {
    const driver = createDriver(<Box><div>1</div></Box>);
    expect(driver.getAlignment()).toBe('flex-end');
  });
  it('hBox should use flex direction row', () => {
    const driver = createDriver(<Box theme={{vertical: false}}><div>1</div></Box>);
    expect(driver.getFlexDirection()).toBe('row');
  });
});
