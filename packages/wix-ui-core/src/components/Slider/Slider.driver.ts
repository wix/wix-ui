export const sliderDriverFactory = ({element, eventTrigger}) => {
  function getByDataHook(hook) {
    return element.querySelector(`[data-hook=\'${hook}\']`);
  }

  function getAllByDataHook(hook) {
    return element.querySelectorAll(`[data-hook=\'${hook}\']`);
  }

  const driver = {
    /** Checks if element exists */
    exists: () => !!element,
    /** Returns the current slider value */
    value: () => Number(element.getAttribute('data-value')),
    /** Returns the minimum slider value */
    min: () => Number(element.getAttribute('data-min')),
    /** Returns the maximum slider value */
    max: () => Number(element.getAttribute('data-max')),
    /** Returns whether the slider is vertical or not */
    vertical: () => element.getAttribute('data-orientation') === 'vertical',
    /** Returns the thumb element */
    thumb: () => getByDataHook('thumb'),
    /** Returns the tooltip element */
    tooltip: () => getByDataHook('tooltip'),
    /** Returns the tick mark elements */
    ticks: () => getAllByDataHook('tick'),
    /** Returns the track elements */
    track: () => getByDataHook('track'),
    /** Returns whether the slider goes from right to left */
    rtl: () => element.getAttribute('data-dir') === 'rtl',
    /** Returns the root element */
    root: () => element,
    role: () => element.getAttribute('role'),
    ariaValueMin: () => element.getAttribute('aria-valuemin'),
    ariaValueMax: () => element.getAttribute('aria-valuemax'),
    ariaValueNow: () => element.getAttribute('aria-valuenow'),

    mouseMove(value) {
      const mouseMove = new Event('mousemove');

      mouseMove[driver.vertical() ? 'clientY' : 'clientX'] = value;

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

    blur() {
      eventTrigger.blur(element);
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

    stubTrackBoundingRect(rect?: any) {
      rect = rect || (driver.vertical() ? {
        bottom: 400,
        top: 0,
        left: 0,
        right: 0,
        width: 50,
        height: 400
      } : {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        width: 400,
        height: 50
      });

      const el = driver.track();
      el.getBoundingClientRect = () => rect;
      driver.forceUpdate();
    },

    stubRootBoundingRect(rect?: any) {
      rect = rect || (driver.vertical() ? {
        bottom: 400,
        top: 0,
        left: 0,
        right: 100,
        width: 100,
        height: 400
      } : {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        width: 400,
        height: 100
      });

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

      if (!driver.vertical()) {
        const thumbSize = driver.getRootBoundingRect().height;
        const offset = (value - min) * ((rect.width + thumbSize / 2) / (max - min + 1));

        if (driver.rtl()) {
          return rect.width - offset;
        } else {
          return offset;
        }
      } else {
        const thumbSize = driver.getRootBoundingRect().width;
        const offset = (value - min) * ((rect.height + thumbSize / 2) / (max - min + 1));
        return offset;
      }
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
      const tooltip = driver.tooltip();
      return tooltip && tooltip.textContent;
    },

    clickTick(tickIdx) {
      const tick = driver.ticks()[tickIdx];
      const offset = driver.getOffsetByValue(driver.min() + tickIdx);
      eventTrigger.click(tick, {[driver.vertical() ? 'clientY' : 'clientX']: offset});
    },

    clickSlider(value) {
      const offset = driver.getOffsetByValue(value);
      eventTrigger.click(driver.track(), {[driver.vertical() ? 'clientY' : 'clientX']: offset});
    },

    forceUpdate() {
      driver.hoverThumb();
      driver.unhoverThumb();
    }
  };

  return driver;
};
