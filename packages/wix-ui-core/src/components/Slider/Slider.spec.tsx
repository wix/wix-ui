import * as React from 'react';
import {sliderDriverFactory} from './Slider.driver';
import {createDriverFactory} from 'wix-ui-test-utils';
import {Slider} from './index';
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

    const driver = render({
      min: 1,
      max: 10,
      value: 1,
      step: 1,
      onChange
    });

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

  it('does not show tooltip, given tooltipVisibility=none', () => {
    const driver = createDriver(<Slider tooltipVisibility="none" min={1} max={10} value={3} onChange={noop}/>);

    driver.hoverThumb();

    expect(driver.tooltip()).not.toBeTruthy();
  });

  it('shows tooltip only on hover, given tooltipVisibility=hover', () => {
    const driver = createDriver(<Slider tooltipVisibility="hover" min={1} max={10} value={3} onChange={noop}/>);

    expect(driver.tooltip()).toBeFalsy();

    driver.hoverThumb();

    expect(driver.tooltip()).toBeTruthy();
  });

  it('shows tooltip by default, given tooltipVisibility=always', () => {
    const driver = createDriver(<Slider tooltipVisibility="always" min={1} max={10} value={3} onChange={noop}/>);

    expect(driver.tooltip()).toBeTruthy();
  });

  it('should render tooltip prefix', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 0.1,
      min: 1,
      max: 10,
      value: 1,
      disabled: true,
      tooltipPrefix: '$',
      onChange
    });

    driver.hoverThumb();

    expect(driver.thumbTooltipValue()).toBe('$1');
  });

  it('should render tooltip suffix', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 0.1,
      min: 1,
      max: 10,
      value: 1,
      disabled: true,
      tooltipSuffix: '$',
      onChange
    });

    driver.hoverThumb();

    expect(driver.thumbTooltipValue()).toBe('1$');
  });

  it('should render ticks', () => {
    const driver = render({
      min: 1,
      step: 1,
      max: 10,
      value: 3,
      onChange: noop
    });

    driver.stubTrackBoundingRect({width: 500});

    expect(driver.ticks().length).toEqual(10);
  });

  it('should render the max tick, given max % step !== 0', () => {
    const driver = render({
      min: 1,
      step: 5,
      max: 20,
      value: 3,
      onChange: noop
    });

    driver.stubTrackBoundingRect({width: 500});

    expect(driver.ticks().length).toEqual(5);
  });

  it('should not render the ticks, given tickMarksPosition = none', () => {
    const driver = render({
      min: 1,
      step: 5,
      max: 20,
      value: 3,
      tickMarksPosition: 'none',
      onChange: noop
    });

    driver.stubTrackBoundingRect({width: 500});

    expect(driver.ticks().length).toEqual(0);
  });

  it('should render ticks in continuous mode, with a density of 1 tick per 4 pixels', () => {
    const driver = createDriver(<Slider min={1} max={10} value={3} onChange={noop}/>);

    driver.stubTrackBoundingRect({width: 400});

    expect(driver.ticks().length).toEqual(92);
  });

  it('should change the value when clicking a tick', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 1,
      min: 1,
      max: 10,
      value: 3,
      onChange
    });

    driver.clickTick(5);
    sinon.assert.calledWith(onChange, 6);
  });

  it('should change the value when clicking the slider', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 1,
      min: 1,
      max: 10,
      value: 7,
      onChange
    });

    driver.clickSlider(3);
    sinon.assert.calledWith(onChange, 3);
  });

  it('should change the value when clicking the slider, given rtl', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 1,
      min: 1,
      max: 10,
      value: 7,
      rtl: true,
      onChange
    });

    driver.clickSlider(3);
    sinon.assert.calledWith(onChange, 3);
  });

  describe('key presses', () => {
    let onChange, driver;

    beforeEach(() => {
      _render();
    });

    function _render(mixin = {}) {
      onChange = sinon.spy();

      driver = render({
        step: 0.1,
        min: 50,
        max: 100,
        value: 60,
        onChange,
        ...mixin
      });

      driver.focus();
    }

    it('should increase the value when clicking the right arrow, given ltr', () => {
      driver.arrowRight();
      sinon.assert.calledWith(onChange, 60.1);
    });

    it('should decrease the value when clicking the right arrow, given rtl', () => {
      _render({rtl: true});
      driver.arrowRight();
      sinon.assert.calledWith(onChange, 59.9);
    });

    it('should increase the value when clicking the up arrow', () => {
      driver.arrowRight();
      sinon.assert.calledWith(onChange, 60.1);
    });

    it('should decrease the value when clicking the left arrow, given ltr', () => {
      driver.arrowLeft();
      sinon.assert.calledWith(onChange, 59.9);
    });

    it('should increase the value when clicking the left arrow, given rtl', () => {
      _render({rtl: true});
      driver.arrowLeft();
      sinon.assert.calledWith(onChange, 60.1);
    });

    it('should decrease the value when clicking the down arrow', () => {
      driver.arrowDown();
      sinon.assert.calledWith(onChange, 59.9);
    });

    it('should increase the value by 0.1 * (max - min) when clicking Page Up', () => {
      driver.pageUp();
      sinon.assert.calledWith(onChange, 65);
    });

    it('should decrease the value by 0.1 * (max - min) when clicking Page Down', () => {
      driver.pageDown();
      sinon.assert.calledWith(onChange, 55);
    });

    it('should set the value to maximum when clicking End', () => {
      driver.end();
      sinon.assert.calledWith(onChange, 100);
    });

    it('should set the value to minimum when clicking Home', () => {
      driver.home();
      sinon.assert.calledWith(onChange, 50);
    });

    it('should not decrease below the minimum', () => {
      driver = render({
        step: 0.1,
        min: 1,
        max: 10,
        value: 1,
        onChange
      });

      driver.focus();

      driver.arrowLeft();

      sinon.assert.notCalled(onChange);
    });

    it('should not increase above the maximum', () => {
      driver = render({
        step: 0.1,
        min: 1,
        max: 10,
        value: 10,
        onChange
      });

      driver.focus();

      driver.arrowRight();

      sinon.assert.notCalled(onChange);
    });
  });

  it('cannot move handle, given disabled', () => {
    const onChange = sinon.spy();

    const driver = render({
      step: 0.1,
      min: 1,
      max: 10,
      value: 1,
      disabled: true,
      onChange
    });

    driver.focus();
    driver.arrowRight();
    driver.clickSlider(3);

    sinon.assert.notCalled(onChange);
  });

  it('should have 3 steps, given stepType = \'count\' and step = 3', () => {
    const onChange = sinon.spy();

    const driver = render({
      min: 0,
      max: 6,
      value: 0,
      step: 3,
      stepType: 'count',
      onChange
    });

    driver.focus();
    driver.arrowRight();
    sinon.assert.calledWith(onChange, 2);
  });

  it('continuous mode - step is 0.1', () => {
    const onChange = sinon.spy();

    const driver = render({
      min: 0,
      max: 6,
      value: 0,
      step: null,
      onChange
    });

    driver.focus();
    driver.arrowRight();
    sinon.assert.calledWith(onChange, 0.1);
  });

  it('tooltip numeric value should be clamped to 3 chars', () => {
    const onChange = sinon.spy();

    const driver = render({
      min: 0,
      max: 6,
      value: 0.444,
      step: null,
      tooltipPrefix: '$',
      tooltipSuffix: '%',
      onChange
    });

    expect(driver.thumbTooltipValue()).toEqual('$0.4%');
  });

  function render(props) {
    const driver = createDriver(<Slider {...props}/>);

    driver.stubRootBoundingRect();
    driver.stubTrackBoundingRect();

    return driver;
  }
});
