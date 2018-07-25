import * as React from 'react';
import {mount} from 'enzyme';

import {createDriver, WithFocusableComp, PureChildComponent} from './FocusableHOC.driver';

import {withFocusable, focusableStates} from './FocusableHOC';
describe('FocusableHOC', () => {
  const render = Comp => mount(Comp, {attachTo: document.createElement('div')});

  describe('Pure component HOC', () => {
    it('should render the wrapped component', () => {
      const wrapper = render(<WithFocusableComp/>);
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

    beforeEach(() => {
      // Reseting modules, in order to reset the FocusableHOC.InputMethod.method state.
      jest.resetModules();
      focusableModule = require('./FocusableHOC');
      WithFocusableComp2 = focusableModule.withFocusable(PureChildComponent);
      // TODO: find a way to reset the eventHandlers which are added to the window.
    });

    it('should not have focus nor focus-visible [given] initial render', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      expectNotFocused(driver);
    });

    it('should have focus and focus-visible [when] focused programatically', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      driver.focus();
      // Default input is keyboard
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should have focus and focus-visible [when] tabbed in withot keyDown', () => {
      // This test case checks a scenario when the focus is on the browser's
      // url input, and we press tab. The keyDown is not fired.
      const driver = createDriver(<WithFocusableComp2/>);

      driver.focus();
      driver.fireKeyUp();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not have focus nor focus-visible [when] blured programatically [given] keyboard focused', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');

      driver.blur();
      expectNotFocused(driver, 'after blur');
    });

    it('should have focus but not focus-visible [when] clicked', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      driver.click();
      expectMouseFocused(driver, 'after click');
    });

    it('should have focus but not focus-visible [when] focused programatically [given] current input method is mouse', () => {
      // This test must be here , after a test which finishes with the input method = mouse.
      // this test is only to test that we are reseting the FocusableHOC global state proparely,
      // usin the jest.resetModules() call.
      const driver = createDriver(<WithFocusableComp2/>);
      driver.focus();
      expectKeyboardFocused(driver, 'after click');
    });

    /**
     * This test checks that the InpurMethod.method state is updated to `keyboard` after
     * is was set to `mouse`.
     */
    it('should have focus and focus-visible [when] focused [given] mouseDown and blur', () => {
      const driver = createDriver(<WithFocusableComp2/>);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.blur();
      expectNotFocused(driver, 'after blur');

      driver.tabIn();
      expectKeyboardFocused(driver, 'after focus');
    });

    it('should not be focused [when] tabbed out [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp/>);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.tabOut();
      expectNotFocused(driver, 'after tab');
    });

    it('should have focus and focus-visible, when: any keyboard key pressed [given] focused by mouse', () => {
      const driver = createDriver(<WithFocusableComp/>);

      driver.click();
      expectMouseFocused(driver, 'after click');

      driver.fireKeyDown();
      expectKeyboardFocused(driver, 'after pressing space');
    });
  });

});
