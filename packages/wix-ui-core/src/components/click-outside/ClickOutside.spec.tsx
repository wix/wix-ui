import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ClickOutside } from './ClickOutside';
import { act, Simulate } from 'react-dom/test-utils';

describe('ClickOutside', () => {
  let container, map;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    map = {};
    document.addEventListener = jest.fn((event, cb) => (map[event] = cb));
  });

  afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  function render(options) {
    const {
      handleClickOutside,
      clickOutsideCallback,
      handleClickInside,
      excludeClass,
      disableOnClickOutside,
    } = options;
    const ref = React.createRef<HTMLButtonElement>();
    ReactDOM.render(
      <div>
        <button
          id="outside"
          className={excludeClass}
          onClick={handleClickOutside}
        >
          Outside
        </button>
        <ClickOutside
          rootRef={ref}
          onClickOutside={clickOutsideCallback}
          excludeClass={excludeClass}
          disableOnClickOutside={disableOnClickOutside}
        >
          <button id="inside" ref={ref} onClick={handleClickInside}>
            Inside
          </button>
        </ClickOutside>
      </div>,
      container,
    );
  }

  // Simulate a click the button outside
  function clickOutside(outside) {
    Simulate.click(outside);

    /*
     * This hack makes sure the right "jest.fn()" is being called on the outside element.
     * Will not work without "Simulate.click(outside)"
     */
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', {
      writable: false,
      value: outside,
    });
    if (map.mouseup) {
      map.mouseup(clickEvent);
    }
  }

  it('should click inside and outside', async () => {
    const handleClickInside = jest.fn();
    const handleClickOutside = jest.fn();
    const clickOutsideCallback = jest.fn();

    act(() => {
      render({ handleClickOutside, clickOutsideCallback, handleClickInside });
    });

    // Nothing is clicked yet
    expect(handleClickInside).not.toBeCalled();
    expect(handleClickOutside).not.toBeCalled();
    expect(clickOutsideCallback).not.toBeCalled();

    // Click inside
    const inside = container.querySelector('#inside');
    expect(inside.innerHTML).toBe('Inside');
    act(() => {
      Simulate.click(inside);
    });
    expect(handleClickInside).toHaveBeenCalledTimes(1);

    // Click outside
    const outside = container.querySelector('#outside');
    expect(outside.innerHTML).toBe('Outside');
    act(() => {
      clickOutside(outside);
    });
    expect(handleClickOutside).toHaveBeenCalledTimes(1);

    // Once clicked outside, the onClickOutside callback should be called.
    expect(clickOutsideCallback).toHaveBeenCalledTimes(1);
  });

  it('should click inside and in an excluded element', async () => {
    const clickOutsideCallback = jest.fn();
    const excludeClass = 'exclude-me';

    act(() => {
      render({ excludeClass, clickOutsideCallback });
    });

    // Nothing is clicked yet
    expect(clickOutsideCallback).not.toBeCalled();

    // Click inside
    const inside = container.querySelector('#inside');
    expect(inside.innerHTML).toBe('Inside');
    act(() => {
      Simulate.click(inside);
    });

    // Click outside
    const outside = container.querySelector('#outside');
    expect(outside.innerHTML).toBe('Outside');
    act(() => {
      clickOutside(outside);
    });

    // Once clicked an excluded element, the onClickOutside callback should not be called.
    expect(clickOutsideCallback).toHaveBeenCalledTimes(0);
  });

  it('should try to outside when listeners are stopped unsuccessfully', async () => {
    const clickOutsideCallback = jest.fn();
    const disableOnClickOutside = true;

    act(() => {
      render({ clickOutsideCallback, disableOnClickOutside });
    });

    // Nothing is clicked yet
    expect(clickOutsideCallback).not.toBeCalled();

    // Click outside
    const outside = container.querySelector('#outside');
    expect(outside.innerHTML).toBe('Outside');
    act(() => {
      clickOutside(outside);
    });

    // Once clicked an excluded element, the onClickOutside callback should not be called.
    expect(clickOutsideCallback).toHaveBeenCalledTimes(0);
  });
});
