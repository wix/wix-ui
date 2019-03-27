import * as React from 'react';
import { mount } from 'enzyme';
import {
  createDriver,
  WithFocusableComp,
  PureChildComponent,
} from './FocusableHOC.driver';

import { withFocusable } from './FocusableHOC';

describe('FocusableHOC', () => {
  const render = Comp =>
    mount(Comp, { attachTo: document.createElement('div') });

  describe('Pure component HOC', () => {
    it('should render the wrapped component', () => {
      const wrapper = render(<WithFocusableComp />);
      expect(wrapper.children().instance()).toBeInstanceOf(PureChildComponent);
    });

    describe('hoisting', () => {
      it('should hoist static methods', () => {
        expect(WithFocusableComp.staticMethod()).toEqual('staticMethod');
      });

      it('should hoist static variables', () => {
        expect(WithFocusableComp.staticVariable).toEqual('staticVariable');
      });
    });
  });

  describe('Focusable', () => {
    const expectKeyboardFocused = (driver, msg) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(true);
      expect(driver.hasFocusVisibleState()).toBe(true);
    };

    const expectNotFocused = (driver, msg?: string) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(false);
      expect(driver.hasFocusVisibleState()).toBe(false);
    };

    const expectMouseFocused = (driver, msg) => {
      const prefix = msg ? `${msg} - ` : '';
      expect(driver.hasFocusState()).toBe(true);
      expect(driver.hasFocusVisibleState()).toBe(false);
    };

    let WithFocusableComp2;
    let focusableModule;

    beforeAll(() => {
      // Previous tests may trigger a `mousedown` event, so we need to trigger a `keydown` event as
      // the default input is keyboard (some tests rely on this default behaviour).
      document.dispatchEvent(new Event('keydown', { bubbles: true }));
    });

    beforeEach(() => {
      // Reseting modules, in order to reset the FocusableHOC.InputMethod.method state.
      if (typeof jest.resetModules === 'function') {
        jest.resetModules();
      }
      focusableModule = require('./FocusableHOC');
      WithFocusableComp2 = focusableModule.withFocusable(PureChildComponent);
      // TODO: find a way to reset the eventHandlers which are added to the window.
    });

    it('should not have focus nor focus-visible [given] initial render', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      expectNotFocused(driver);
    });

    it('should have focus and focus-visible [when] focused programatically', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.focus();
      // Default input is keyboard
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in withot keyDown', () => {
      // This test case checks a scenario when the focus is on the browser's
      // url input, and we press tab. The keyDown is not fired.
      const driver = createDriver(<WithFocusableComp2 />);

      driver.focus();
      driver.fireKeyUp();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not have focus nor focus-visible [when] blured programatically [given] keyboard focused', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');

      driver.blur();
      expectNotFocused(driver, 'after blur');
    });

    describe('Given `onFocus`', () => {
      it('callback should not have focus nor focus-visible [when] keyboard focused', () => {
        const onFocus = () => ({});

        const driver = createDriver(<WithFocusableComp2 onFocus={onFocus} />);

        driver.tabIn();
        expectNotFocused(driver);
      });
      it('callback with focus method calling should have focus and focus-visible [when] keyboard focused', () => {
        const onFocus = focus => focus();

        const driver = createDriver(<WithFocusableComp2 onFocus={onFocus} />);

        driver.tabIn();
        expectKeyboardFocused(driver, 'after focus');
      });
    });

    describe('Given `onBlur`', () => {
      it('callback should not blur focused component [when] keyboard focused', () => {
        const onBlur = () => ({});

        const driver = createDriver(<WithFocusableComp2 onBlur={onBlur} />);

        driver.tabIn();
        expectKeyboardFocused(driver, 'after focus');

        driver.blur();
        expectKeyboardFocused(driver, 'after focus');
      });

      it('callback with blur method calling should blur focused component [when] keyboard focused', () => {
        const onBlur = blur => blur();

        const driver = createDriver(<WithFocusableComp2 onFocus={onBlur} />);

        driver.tabIn();
        expectKeyboardFocused(driver, 'after focus');

        driver.blur();
        expectNotFocused(driver);
      });
    });

    it('should have focus but not focus-visible [when] clicked', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.click();
      expectMouseFocused(driver, 'after click');
    });

    /**
     * This test checks that the InpurMethod.method state is updated to `keyboard` after
     * is was set to `mouse`.
     */
    it('should have focus and focus-visible [when] focused [given] mouseDown and blur', () => {
      const driver = createDriver(<WithFocusableComp2 />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.blur();
      expectNotFocused(driver, 'after blur');

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not be focused [when] tabbed out [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.tabOut();
      expectNotFocused(driver, 'after tab');
    });

    it('should have focus and focus-visible, when: any keyboard key pressed [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp />);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.fireKeyDown();
      expectKeyboardFocused(driver, 'after pressing space');
    });
  });
});
