import * as React from 'react';
import {popoverDriverFactory} from './Popover.driver';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {Popover, PopoverProps, AppendTo} from './';
import {Boundary} from 'popper.js';
import {mount, ReactWrapper} from 'enzyme';
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

  const renderWithEnzyme = (jsx, {attachTo} = {attachTo: container.node}) => {
    const wrapper = mount<PopoverProps,{}>(jsx, {attachTo});
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
    const {driver, wrapper} = renderWithEnzyme(createPopover({shown: true, timeout: 100}));
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeTruthy();
    await eventually(() => expect(driver.isContentElementExists()).toBeFalsy());
    wrapper.unmount();
  });

  it('should not animate in case timeout is set to 0', async () => {
    const {driver, wrapper} = renderWithEnzyme(createPopover({shown: true, timeout: 0}));
    wrapper.setProps({shown: false});
    expect(driver.isContentElementExists()).toBeFalsy();
    expect(wrapper.text()).toBe('Element');
    wrapper.unmount();
  });

  describe('appendTo', () => {

    const runAppendToTests = (
      appendTo: AppendTo,
      getExpectedAppendToElement: () => Element,
      getExpectedContentParent: () => Element,
      mountPopover: (props: Partial<PopoverProps>) => {wrapper: ReactWrapper<PopoverProps,{}>, driver}
    ) => {
      it('should append new div when initially open', () => {
        const prevChildren = getExpectedAppendToElement().children.length;
        const {driver, wrapper} = mountPopover({shown: true});
        const g = getExpectedAppendToElement().children.length;
        expect(getExpectedAppendToElement().children.length).toBe(prevChildren + 1);
        expect(driver.getContentElement().parentElement).toBe(getExpectedContentParent());
        wrapper.unmount();
      });

      it('should append new div when initially closed', () => {
        const prevChildren = getExpectedAppendToElement().children.length;
        const {driver, wrapper} =mountPopover({shown: false});
        expect(getExpectedAppendToElement().children.length).toBe(prevChildren + 1);
        wrapper.unmount();
      });

      it('should attach styles to content parent when initially open', () => {
        const {wrapper} = mountPopover({shown: true});
        expect(getExpectedContentParent().classList).toContain(styles.root);
        wrapper.unmount();
      });

      it('should remove styles from content parent when closed', () => {
        const {wrapper} = mountPopover({shown: true});
        wrapper.setProps({shown: false});
        expect(getExpectedContentParent().classList).not.toContain(styles.root);
        wrapper.unmount();
      });

      it('should NOT attach styles to content parent when initially closed', () => {
        const {wrapper} = mountPopover({shown: false});
        expect(getExpectedContentParent().className).not.toBe(styles.root);
        wrapper.unmount();
      });

      it('should remove default div when unmounted', () => {
        const prevChildren = getExpectedAppendToElement().children.length;
        const {wrapper} = mountPopover({shown: false});
        expect(getExpectedAppendToElement().children.length).toBe(prevChildren + 1);
        wrapper.unmount();
        expect(getExpectedAppendToElement().children.length).toBe(prevChildren);
      });
    };

    describe('window & viewport :', () => {
      const boundaryValues: Boundary[] = ['window'];//, 'viewport'];
      boundaryValues.forEach(boundary => {
        describe(boundary, () => {
          const appendTo = boundary;
          let popoverContainer: HTMLElement;
          const getExpectedAppendToElement = () => document.body;
          const getExpectedContentParent = () => document.body.children[1];
          const mountPopover = (props: Partial<PopoverProps>) => renderWithEnzyme(createPopover({...props, appendTo}), {attachTo: popoverContainer});
          
          beforeEach(() => {
            popoverContainer = document.createElement('div');
            container.node.appendChild(popoverContainer);
          });

          runAppendToTests(appendTo, getExpectedAppendToElement, getExpectedContentParent, mountPopover);
        });
      });
    });

    describe('scrollParent', () => {
      const appendTo = 'scrollParent';
      let popoverContainer: HTMLElement;
      let scrollContainer: HTMLElement;
      const getExpectedAppendToElement = () => scrollContainer;
      const getExpectedContentParent = () => scrollContainer.children[1];
      const mountPopover = (props: Partial<PopoverProps>) => renderWithEnzyme(createPopover({...props, appendTo}), {attachTo: popoverContainer});

      beforeEach(() => {
        popoverContainer = document.createElement('div');
        scrollContainer = document.createElement('div');
        scrollContainer.style.overflow ='auto';
        scrollContainer.appendChild(popoverContainer);
        container.node.appendChild(scrollContainer);
      });

      runAppendToTests(appendTo, getExpectedAppendToElement, getExpectedContentParent, mountPopover);
    });

    describe('node', () => {
      let appendTo: HTMLElement;
      let popoverContainer: HTMLElement;
      const getExpectedAppendToElement = () => popoverContainer;
      const getExpectedContentParent = () => appendTo.children[0];
      const mountPopover = (props: Partial<PopoverProps>) => renderWithEnzyme(createPopover({...props, appendTo}), {attachTo: popoverContainer});

      beforeEach(() => {
        popoverContainer = document.createElement('div');
        container.node.appendChild(popoverContainer);

        appendTo = document.createElement('div');
        container.node.appendChild(appendTo);
      });

      runAppendToTests(appendTo, getExpectedAppendToElement, getExpectedContentParent, mountPopover);
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
