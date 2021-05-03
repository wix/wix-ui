import * as React from 'react';
import * as eventually from 'wix-eventually';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { dropdownDriverFactory } from './Dropdown.driver';
import { Dropdown } from './';
import { CLICK, HOVER } from './constants';
import { mount } from 'enzyme';
import { Simulate } from 'react-dom/test-utils';
import { generateOptions } from '../dropdown-option/OptionsExample';

describe('Dropdown', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(dropdownDriverFactory);

  const options = generateOptions();
  const createDropdown = (props = {}) => (
    <Dropdown
      placement="top"
      openTrigger={CLICK}
      {...{
        options: [],
        onSelect: () => null,
        onDeselect: () => null,
        onInitialSelectedOptionsSet: () => null,
        initialSelectedIds: [],
        ...props,
      }}
    >
      <span data-hook="open-dropdown-button">Dropdown</span>
    </Dropdown>
  );

  it('should render default dropdown', () => {
    const driver = createDriver(createDropdown());

    expect(driver.isTargetElementExists()).toBeTruthy();
    expect(driver.isContentElementExists()).toBeFalsy();
  });

  it('should display content element', () => {
    const driver = createDriver(
      createDropdown({ forceContentElementVisibility: true }),
    );
    expect(driver.isContentElementExists()).toBeTruthy();
  });

  describe('openTrigger', () => {
    it('should show content on click', () => {
      const driver = createDriver(createDropdown({ options }));

      driver.click();
      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('should hide content on another click', async () => {
      const driver = createDriver(createDropdown({ options }));
      driver.click();
      driver.click();
      await eventually(() =>
        expect(driver.isContentElementExists()).toBeFalsy(),
      );
    });

    it('should show content on `Enter`', () => {
      const driver = createDriver(createDropdown({ options }));

      expect(driver.dropdownContentDisplayed()).toBeFalsy();
      Simulate.keyDown(document.querySelector(
          '[data-hook="open-dropdown-button"]'),
          { keyCode: 13 },
          );
      expect(driver.dropdownContentDisplayed()).toBeTruthy();
    });

    it('should show content on `Space` when dropdownA11yFixes is true', () => {
      const driver = createDriver(createDropdown({ options, dropdownA11yFixes: true, }));

      expect(driver.dropdownContentDisplayed()).toBeFalsy();
      Simulate.keyDown(document.querySelector(
          '[data-hook="open-dropdown-button"]'),
          { keyCode: 32 },
          );
      expect(driver.dropdownContentDisplayed()).toBeTruthy();
    });

    it('should preventDefault on up/down arrows key press inside dropdown content in order to prevent outer scroll', () => {
      const driver = createDriver(createDropdown({ options }));
      const preventDefaultSpy = jest.fn();
      driver.click();

      Simulate.keyDown(
        document.querySelector('[data-hook="open-dropdown-button"]'),
        { key: 'ArrowDown', preventDefault: preventDefaultSpy },
      );
      expect(preventDefaultSpy).toHaveBeenCalled();
      preventDefaultSpy.mockClear();

      Simulate.keyDown(
        document.querySelector('[data-hook="open-dropdown-button"]'),
        { key: 'ArrowUp', preventDefault: preventDefaultSpy },
      );
      expect(preventDefaultSpy).toHaveBeenCalled();
      preventDefaultSpy.mockClear();
    });

    it('should show content on hover', async () => {
      const driver = createDriver(
        createDropdown({ options, openTrigger: HOVER }),
      );

      driver.mouseEnter();
      expect(driver.isContentElementExists()).toBeTruthy();
      driver.mouseLeave();
      await eventually(() =>
        expect(driver.isContentElementExists()).toBeFalsy(),
      );
    });
  });

  describe('onSelect', () => {
    it('should be called when selection changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({ options, onSelect }));
      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });

    it('should select option on `Space` in case that dropdownA11yFixes is true', async () => {
      const onSelect = jest.fn();
      const preventDefaultSpy = jest.fn();
      const driver = createDriver(createDropdown({ options, dropdownA11yFixes: true, onSelect }));

      expect(driver.dropdownContentDisplayed()).toBeFalsy();
      Simulate.keyDown(document.querySelector(
          '[data-hook="open-dropdown-button"]'),
          { keyCode: 32, preventDefault: preventDefaultSpy },
      );
      expect(driver.dropdownContentDisplayed()).toBeTruthy();

      Simulate.keyDown(document.querySelector(
          '[data-hook="open-dropdown-button"]'),
          { keyCode: 40, preventDefault: preventDefaultSpy },
      );

      Simulate.keyDown(document.querySelector(
          '[data-hook="open-dropdown-button"]'),
          { keyCode: 32, preventDefault: preventDefaultSpy },
      );

      expect(onSelect).toHaveBeenCalledWith(options[1])
    });

    it('should not be called when selecting disabled item', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({ options, onSelect }));

      driver.click();
      driver.optionAt(2).click();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should not be called when selecting separator item', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({ options, onSelect }));

      driver.click();
      driver.optionAt(5).click();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('should call onSelect when selection is empty then changed', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({ options, onSelect }));

      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledWith(options[0]);
    });

    it('should not be called when re-selecting a selected item', () => {
      const onSelect = jest.fn();
      const driver = createDriver(createDropdown({ options, onSelect }));

      driver.click();
      driver.optionAt(0).click();
      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should not be called after Tab key press', () => {
      const onSelect = jest.fn();
      const dropdown = (
        <Dropdown
          placement="top"
          initialSelectedIds={[]}
          onDeselect={() => null}
          onSelect={onSelect}
          onInitialSelectedOptionsSet={() => null}
          openTrigger={CLICK}
          options={options}
        >
          <input data-hook="open-dropdown-input" />
        </Dropdown>
      );

      const driver = createDriver(dropdown);

      driver.click();
      Simulate.keyDown(driver.getTargetElement(), { key: 'Tab' });
      expect(onSelect).toHaveBeenCalledTimes(0);
    });

    it('should be called when re-selecting a selected item when opted-in', () => {
      const onSelect = jest.fn();
      const driver = createDriver(
        createDropdown({ options, onSelect, allowReselect: true }),
      );

      driver.click();
      driver.optionAt(0).click();
      driver.click();
      driver.optionAt(0).click();
      expect(onSelect).toHaveBeenCalledTimes(2);
    });
  });

  describe('onContentMouseDown', () => {
    it('should be called when mouse down event occurs', () => {
      const onContentMouseDown = jest.fn();
      const driver = createDriver(
        createDropdown({ options, onContentMouseDown }),
      );

      driver.click();
      driver.triggerMouseDownOnDropdownContent();
      expect(onContentMouseDown).toHaveBeenCalled();
    });
    it('should be called with event when mouse down event occurs', () => {
      const onContentMouseDown = jest.fn();
      const driver = createDriver(
        createDropdown({ options, onContentMouseDown }),
      );
      driver.click();
      driver.triggerMouseDownOnDropdownContent();
      expect(onContentMouseDown.mock.calls[0].length).toBe(1);
    });
  });

  describe('onDeselect', () => {
    it('should call onDeselect when option is unselected', () => {
      const onDeselect = jest.fn();
      const driver = createDriver(
        createDropdown({
          initialSelectedIds: [0],
          options,
          onDeselect,
          multi: true,
        }),
      );

      driver.click();

      driver.optionAt(0).click();
      expect(onDeselect).toHaveBeenCalledWith(options[0]);
    });
  });

  describe('onOptionHover', () => {
    it('should call `onOptionHover` when option is hovered', () => {
      const onOptionHover = jest.fn();
      const driver = createDriver(
        createDropdown({
          options,
          onOptionHover,
        }),
      );

      driver.click();

      driver.optionAt(0).mouseEnter();
      expect(onOptionHover).toHaveBeenCalledWith({
        ...options[0],
        _DOMid: null,
      });

      driver.optionAt(1).mouseEnter();
      expect(onOptionHover).toHaveBeenCalledWith({
        ...options[1],
        _DOMid: null,
      });
    });

    it('should pass option DOM id to `onOptionHover` if `contentId` is set', () => {
      const onOptionHover = jest.fn();
      const driver = createDriver(
        createDropdown({
          options,
          onOptionHover,
          contentId: 'd401eea8',
        }),
      );

      driver.click();

      driver.optionAt(0).mouseEnter();
      const DOMid0 = driver.optionAt(0).getElement().id;
      expect(DOMid0).toBeTruthy();

      expect(onOptionHover).toHaveBeenCalledWith({
        ...options[0],
        _DOMid: DOMid0,
      });

      driver.optionAt(1).mouseEnter();
      const DOMid1 = driver.optionAt(1).getElement().id;
      expect(DOMid1).toBeTruthy();
      expect(DOMid1).not.toBe(DOMid0);

      expect(onOptionHover).toHaveBeenCalledWith({
        ...options[1],
        _DOMid: DOMid1,
      });
    });

    it('should not call `onOptionHover` when Dropdown is opened and/or closed', () => {
      const onOptionHover = jest.fn();
      const driver = createDriver(
        createDropdown({
          options,
          onOptionHover,
        }),
      );

      driver.click();
      expect(onOptionHover).toHaveBeenCalledTimes(0);

      driver.optionAt(0).mouseEnter();
      expect(onOptionHover).toHaveBeenCalledTimes(1);

      driver.clickOutside();
      expect(onOptionHover).toHaveBeenCalledTimes(1);
    });
  });

  describe('Initially selected options', () => {
    it('should be selected', () => {
      const driver = createDriver(
        createDropdown({
          options,
          initialSelectedIds: [0, 1],
          forceContentElementVisibility: true,
        }),
      );
      expect(driver.optionAt(0).isSelected()).toBeTruthy();
      expect(driver.optionAt(1).isSelected()).toBeTruthy();
      expect(driver.getSelectedOptionsCount()).toEqual(2);
    });
  });

  describe('multiple selection', () => {
    it('when enabled should allow selection of more than one option', () => {
      const driver = createDriver(
        createDropdown({
          options,
          multi: true,
          forceContentElementVisibility: true,
        }),
      );
      driver.optionAt(0).click();
      driver.optionAt(1).click();
      expect(driver.optionAt(0).isSelected()).toBeTruthy();
      expect(driver.optionAt(1).isSelected()).toBeTruthy();
      expect(driver.getSelectedOptionsCount()).toEqual(2);
    });

    it('when disabled should NOT allow selection of more than one option', () => {
      const driver = createDriver(
        createDropdown({
          options,
          multi: false,
          initialSelectedIds: [0],
          forceContentElementVisibility: true,
        }),
      );
      driver.optionAt(1).click();
      expect(driver.optionAt(1).isSelected()).toBeTruthy();
      expect(driver.getSelectedOptionsCount()).toEqual(1);
    });
  });

  describe('Dropdown content edge cases', () => {
    it('should not open dropdown content if options list is empty', () => {
      const driver = createDriver(createDropdown({ options: [] }));

      driver.click();

      expect(driver.isContentElementExists()).toBeFalsy();
    });

    it('should open dropdown content if options list is empty and fixedHeader exists', () => {
      const driver = createDriver(
        createDropdown({ options: [], fixedHeader: 'Fixed' }),
      );

      driver.click();

      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('should open dropdown content if options list is empty and fixedFooter exists', () => {
      const driver = createDriver(
        createDropdown({ options: [], fixedFooter: 'Fixed' }),
      );

      driver.click();

      expect(driver.isContentElementExists()).toBeTruthy();
    });

    it('Should display options when they exist', () => {
      const wrapper = mount(
        <Dropdown
          onSelect={() => null}
          initialSelectedIds={[]}
          onDeselect={() => null}
          onInitialSelectedOptionsSet={() => null}
          placement="top"
          openTrigger={CLICK}
          options={[]}
        >
          <span>Dropdown</span>
        </Dropdown>,
      );

      const driver = dropdownDriverFactory({
        element: wrapper
          .children()
          .at(0)
          .getDOMNode(),
        eventTrigger: Simulate,
      });

      driver.click();
      expect(driver.isContentElementExists()).toBeFalsy();

      wrapper.setProps({ options });
      expect(driver.isContentElementExists()).toBeTruthy();
    });
  });

  describe('Programatically open and close dropdown', () => {
    it('Should support open() and close() methods', () => {
      const wrapper = mount(
        <Dropdown
          onSelect={() => null}
          initialSelectedIds={[]}
          onDeselect={() => null}
          onInitialSelectedOptionsSet={() => null}
          placement="top"
          openTrigger={CLICK}
          options={options}
        >
          <span>Dropdown</span>
        </Dropdown>,
      );

      const driver = dropdownDriverFactory({
        element: wrapper
          .children()
          .at(0)
          .getDOMNode(),
        eventTrigger: Simulate,
      });

      expect(driver.isContentElementExists()).toBeFalsy();
      (wrapper.instance() as any).open();
      expect(driver.isContentElementExists()).toBeTruthy();
      (wrapper.instance() as any).close();
      expect(driver.isContentElementExists()).toBeFalsy();
    });
  });

  describe('Style states', () => {
    it('Should append "content-visible" state when content element is visible', () => {
      const driver = createDriver(createDropdown({ options }));
      expect(driver.hasStyleState('content-visible')).toBeFalsy();
      driver.click();
      expect(driver.isContentElementExists()).toBeTruthy();
      expect(driver.hasStyleState('content-visible')).toBeTruthy();
    });

    it('Should remove "content-visible" state when content element is not visible', () => {
      const driver = createDriver(createDropdown({ options }));
      driver.click();
      expect(driver.hasStyleState('content-visible')).toBeTruthy();
      driver.optionAt(0).click();
      expect(driver.isContentElementExists()).toBeFalsy();
      expect(driver.hasStyleState('content-visible')).toBeFalsy();
    });
  });

  describe('props for Popover', () => {
    /*
    * Some props are passed down to `<Popover>` component used internally.
    * Behaviour of those props are tested in `<Popover>` implementation.
    * Thus, these tests just confirm that props are really passed
    */
  
    const propsAndValues = {
      placement: 'test',
      appendTo: 'test',
      dynamicWidth: true,
      showArrow: true,
      timeout: 0,
      id: 'test',
      flip: 'test',
      role: 'test',
    };
  
    Object.entries(propsAndValues).forEach(([prop, value]) => {
      it(`Popover should receive ${prop}=${value} prop`, () => {
        const mounted = mount(createDropdown({ [prop]: value }));
        expect(mounted.find('Popover').props()[prop]).toEqual(value);
      });
    });
  });
});
