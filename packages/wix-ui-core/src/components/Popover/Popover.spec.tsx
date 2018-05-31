import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover, PopoverProps} from './';
import {mount} from 'enzyme';
import {ReactDOMTestContainer} from '../../../test/dom-test-container';
import * as eventually from 'wix-eventually';
import {popoverTestkitFactory as enzymePopoverTestkitFactory} from '../../testkit/enzyme';
import {isEnzymeTestkitExists} from 'wix-ui-test-utils/enzyme';
import {isTestkitExists} from 'wix-ui-test-utils/vanilla';
import {popoverTestkitFactory} from '../../testkit';
import styles from './Popover.st.css';

describe('Popover', () => {
  const container = new ReactDOMTestContainer().unmountAfterEachTest();

  const render = container.createLegacyRenderer(popoverDriverFactory);

  const renderWithEnzyme = jsx => {
    const wrapper = mount(jsx, {attachTo: container.node});
    const driver = popoverDriverFactory({
      element: wrapper.find(Popover).getDOMNode(),
      eventTrigger: null
    });
    return {wrapper, driver};
  };

  const createPopover = (props: Partial<PopoverProps> = {}) => (
    <Popover placement="top" showArrow shown={false} {...props}>
      <Popover.Element>
        <div>
          Element
        </div>
      </Popover.Element>
      <Popover.Content>
        <div>
          Content
        </div>
      </Popover.Content>
    </Popover>
  );

  it('should not display content by default', () => {
    const driver = render(createPopover());
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(driver.isTargetElementExists()).toBeTruthy();
  });

  it('should display content when shown is true', () => {
    const driver = render(createPopover({shown: true}));
    expect(driver.isContentElementExists()).toBeTruthy();
    expect(driver.isTargetElementExists()).toBeTruthy();
  });

  it('should call mouse enter callback', () => {
    const onMouseEnter = jest.fn();
    const driver = render(createPopover({onMouseEnter}));
    driver.mouseEnter();
    expect(onMouseEnter).toBeCalled();
  });

  it('should call mouse leave callback', () => {
    const onMouseLeave = jest.fn();
    const driver = render(createPopover({onMouseLeave}));
    driver.mouseLeave();
    expect(onMouseLeave).toBeCalled();
  });

  it('moves arrow according to provided offset', () => {
    const driver = render(createPopover({shown: true, moveArrowTo: 10}));
    expect(driver.isTargetElementExists()).toBeTruthy();
    const arrowLeft = driver.getArrowOffset().left;
    expect(arrowLeft).toEqual('10px');
  });

  it('should animate given timeout', async () => {
    const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, timeout: 100}));
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeTruthy();
    await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
    wrapper.unmount();
  });

  it('should not animate in case timeout is set to 0', async () => {
    const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, timeout: 0}));
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(wrapper.text()).toBe('Element');
    wrapper.unmount();
  });

  describe('appendTo', () => {

    describe('window', () => {
      it('should append popover to body when appendTo is window', () => {
        const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, appendTo: 'window'}));
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(document.body);
        wrapper.unmount();
      });

      it('should attach and detach styles to body when appended to window', () => {
        const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, appendTo: 'window'}));
        expect(document.body.classList).toContain(styles.root);
        wrapper.setProps({shown: false});
        expect(document.body.classList).not.toContain(styles.root);
        wrapper.unmount();
      });
    });

    describe('viewport', () => {
      it('should append popover to body when appendTo is viewport', () => {
        const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, appendTo: 'viewport'}));
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(document.body);
        wrapper.unmount();
      });

      it('should attach and detach styles to body when appended to viewport', () => {
        const {wrapper, driver} = renderWithEnzyme(createPopover({shown: true, appendTo: 'viewport'}));
        expect(document.body.classList).toContain(styles.root);
        wrapper.setProps({shown: false});
        expect(document.body.classList).not.toContain(styles.root);
        wrapper.unmount();
      });
    });

    describe('node', () => {
      it('should append popover to given element when appendTo is an element', () => {
        const {wrapper, driver} = renderWithEnzyme(
          createPopover({shown: true, appendTo: container.node})
        );
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(container.node);
        wrapper.unmount();
      });

      it('should attach and detach styles to the element appended to', () => {
        const {wrapper, driver} = renderWithEnzyme(createPopover(
          {shown: true, appendTo: container.node}
        ));
        expect(container.node.classList).toContain(styles.root);
        wrapper.setProps({shown: false});
        expect(container.node.classList).not.toContain(styles.root);
        wrapper.unmount();
      });
    });

    describe('scrollParent', () => {
      const intoScrollable = jsx =>
        <div style={{overflow: 'auto'}}><div>{jsx}</div></div>;

      it('should append popover to first scrollable parent when appendTo is scrollParent', () => {
        const {wrapper, driver} = renderWithEnzyme(intoScrollable(
          createPopover({shown: true, appendTo: 'scrollParent'})
        ));
        const contentElement = driver.getContentElement();
        expect(contentElement.parentElement).toBe(wrapper.getDOMNode());
        wrapper.unmount();
      });

      it('should attach and detach styles to the scrollable parent container', () => {
        let {wrapper} = renderWithEnzyme(intoScrollable(
          createPopover({shown: true, appendTo: 'scrollParent'})
        ));
        expect(wrapper.getDOMNode().className).toBe(styles.root);

        ({wrapper} = renderWithEnzyme(intoScrollable(
          createPopover({shown: false, appendTo: 'scrollParent'})
        )));
        expect(wrapper.getDOMNode().className).toBe('');

        wrapper.unmount();
      });
    });

  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(createPopover(), popoverTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(createPopover(), enzymePopoverTestkitFactory, mount)).toBe(true);
    });
  });
});
