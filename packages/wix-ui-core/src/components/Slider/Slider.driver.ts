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

    getTrack() {
      return element.querySelector('[data-hook=\'track\']');
    },

    stubTrackBoundingRect(rect) {
      const trackElement = driver.getTrack();
      trackElement.getBoundingClientRect = () => rect;
    },

    getTrackBoundingRect() {
      return driver.getTrack().getBoundingClientRect();
    },

    getOffsetByValue(value) {
      const rect = driver.getTrackBoundingRect();
      const min = driver.min();
      const max = driver.max();
      const offset = (value - min) * (rect.width / (max - min));
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

    forceUpdate() {
      driver.hoverThumb();
    },

    styles: {
    }
  };

  driver.stubTrackBoundingRect({
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    width: 400,
    height: 50
  });

  return driver;
};
