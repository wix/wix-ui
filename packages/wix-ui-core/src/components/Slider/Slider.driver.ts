import * as eventually from 'wix-eventually';

export const sliderDriverFactory = ({element, eventTrigger}) => {
  function getByDataHook(hook) {
    return element.querySelector(`[data-hook=\'${hook}\']`);
  }

  function getAllByDataHook(hook) {
    return element.querySelectorAll(`[data-hook=\'${hook}\']`);
  }

  const driver = {
    /** checks if element exists */
    exists: () => !!element,
    value: () => Number(element.getAttribute('data-value')),
    min: () => Number(element.getAttribute('data-min')),
    max: () => Number(element.getAttribute('data-max')),
    vertical: () => Boolean(element.getAttribute('data-vertical')),
    thumb: () => getByDataHook('thumb'),
    tooltip: () => getByDataHook('tooltip'),
    ticks: () => getAllByDataHook('tick'),
    track: () => element.querySelector('[data-hook=\'track\']'),
    root: () => element,

    mouseMove(value) {
      const mouseMove = new Event('mousemove');

      if (driver.vertical()) {
        mouseMove['clientY'] = value;
      } else {
        mouseMove['clientX'] = value;
      }

      document.dispatchEvent(mouseMove);
    },

    mouseDown() {
      eventTrigger.mouseDown(element);
    },

    mouseUp() {
      const mouseUp = new Event('mouseup');
      document.dispatchEvent(mouseUp);
    },

    focus() {
      eventTrigger.focus(element);
    },

    arrowLeft() {
      eventTrigger.keyDown(element, {key: 'ArrowLeft'});
    },

    arrowRight() {
      eventTrigger.keyDown(element, {key: 'ArrowRight'});
    },

    arrowUp() {
      eventTrigger.keyDown(element, {key: 'ArrowUp'});
    },

    arrowDown() {
      eventTrigger.keyDown(element, {key: 'ArrowDown'});
    },

    pageUp() {
      eventTrigger.keyDown(element, {key: 'PageUp'});
    },

    pageDown() {
      eventTrigger.keyDown(element, {key: 'PageDown'});
    },

    home() {
      eventTrigger.keyDown(element, {key: 'Home'});
    },

    end() {
      eventTrigger.keyDown(element, {key: 'End'});
    },

    stubTrackBoundingRect(rect: any = {
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: 400,
      height: 50
    }) {
      const el = driver.track();
      el.getBoundingClientRect = () => rect;
      driver.forceUpdate();
    },

    stubRootBoundingRect(rect: any = {
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      width: 400,
      height: 100
    }) {
      const el = driver.root();
      el.getBoundingClientRect = () => rect;
      driver.forceUpdate();
    },

    getTrackBoundingRect() {
      return driver.track().getBoundingClientRect();
    },

    getRootBoundingRect() {
      return driver.root().getBoundingClientRect();
    },

    getThumbSize() {
      return driver.root().getBoundingClientRect().height;
    },

    getOffsetByValue(value) {
      const rect = driver.getTrackBoundingRect();
      const min = driver.min();
      const max = driver.max();
      const handleSize = driver.getRootBoundingRect().height;
      const offset = (value - min) * ((rect.width + handleSize / 2) / (max - min + 1));
      return offset;
    },

    change(value?: number) {
      driver.mouseDown();
      driver.mouseMove(driver.getOffsetByValue(value));
      driver.mouseUp();
    },

    hoverThumb() {
      eventTrigger.mouseEnter(driver.thumb());
    },

    unhoverThumb() {
      eventTrigger.mouseLeave(driver.thumb());
    },

    dragThumb(offset) {
      driver.hoverThumb();
      driver.mouseDown();
      driver.mouseMove(offset);
    },

    thumbTooltipValue() {
      return driver.tooltip().textContent;
    },

    clickTick(tickIdx) {
      const tick = driver.ticks()[tickIdx];
      const offset = driver.getOffsetByValue(driver.min() + tickIdx);
      eventTrigger.click(tick, {clientX: offset});
    },

    clickSlider(value) {
      const offset = driver.getOffsetByValue(value);
      eventTrigger.click(driver.track(), {clientX: offset});
    },

    forceUpdate() {
      driver.hoverThumb();
    },

    styles: {
    }
  };

  return driver;
};
