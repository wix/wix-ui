import * as React from 'react';
import {sliderDriverFactory} from './Slider.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import Slider from './index';
import * as sinon from 'sinon';
import {mount} from 'enzyme';
import {Simulate} from 'react-dom/test-utils';
import * as eventually from 'wix-eventually';

describe('Slider', () => {

  const createDriver = createDriverFactory(sliderDriverFactory);
  const noop = () => null;

  it('should exist', () => {
    const driver = createDriver(<Slider/>);
    expect(driver.exists()).toBe(true);
  });

  it('should render props', () => {
    const driver = createDriver(<Slider vertical min={4} max={20} value={7} onChange={noop}/>);
    expect(driver.value()).toBe(7);
    expect(driver.min()).toBe(4);
    expect(driver.max()).toBe(20);
    expect(driver.vertical()).toBe(true);
  });

  it('should trigger onChange', () => {
    const onChange = sinon.spy();
    const driver = createDriver(<Slider min={4} max={20} value={7} onChange={onChange}/>);
    driver.change();
    sinon.assert.called(onChange);
  });

  it('should change to a specific value', () => {
    const onChange = sinon.spy();
    const driver = createDriver(<Slider min={1} max={10} value={1} onChange={onChange}/>);

    driver.change(5);

    sinon.assert.calledWith(onChange, 5);
  });

  it('should show tooltip upon thumb hover', () => {
    const driver = createDriver(<Slider min={1} max={10} value={3} onChange={noop}/>);

    driver.hoverThumb();

    expect(driver.thumbTooltipValue()).toEqual('3');
  });

  it('should not show tooltip if thumb is not hovered or dragged', () => {
    const driver = createDriver(<Slider min={1} max={10} value={3} onChange={noop}/>);

    expect(driver.tooltip()).toEqual(null);
  });

  it('should show tooltip when dragging', () => {
    const driver = createDriver(<Slider min={1} max={10} value={3} onChange={noop}/>);

    driver.dragThumb(1);

    expect(driver.thumbTooltipValue()).toEqual('3');
  });

  it('should render ticks', () => {
    const driver = createDriver(<Slider min={1} step={1} max={10} value={3} onChange={noop}/>);

    driver.stubTrackBoundingRect({width: 500});

    expect(driver.ticks().length).toEqual(10);
  });

  it('should not render ticks in continuous mode', () => {
    const driver = createDriver(<Slider min={1} max={10} value={3} onChange={noop}/>);

    driver.stubTrackBoundingRect({width: 500});

    expect(driver.ticks().length).toEqual(0);
  });

  it('should change the value when clicking a tick', () => {
    const onChange = sinon.spy();
    const driver = createDriver(<Slider step={1} min={1} max={10} value={3} onChange={onChange}/>);
    driver.clickTick(7);
    sinon.assert.calledWith(onChange, 8);
  });
});
