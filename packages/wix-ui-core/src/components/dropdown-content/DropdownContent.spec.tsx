import * as React from 'react';
import { dropdownContentDriverFactory } from './DropdownContent.driver';
import { ReactDOMTestContainer } from '../../../test/dom-test-container';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { OptionFactory } from '../dropdown-option';
import { DropdownContent } from './';
import { generateOptions } from '../dropdown-option/OptionsExample';

describe('DropdownContent', () => {
  const createDriver = new ReactDOMTestContainer()
    .unmountAfterEachTest()
    .createLegacyRenderer(dropdownContentDriverFactory);

  const options = generateOptions();
  const createDropdownContent = (props = {}) => (
    <DropdownContent
      {...{
        options: [],
        onOptionClick: () => null,
        selectedIds: [],
        ...props,
      }}
    />
  );

  it('should render default dropdown content', () => {
    const driver = createDriver(createDropdownContent());
    expect(driver.exists()).toBeTruthy();
  });

  describe('mouse events', () => {
    it('should select selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(
        createDropdownContent({ options, onOptionClick }),
      );
      driver.optionAt(0).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[0]);

      driver.optionAt(1).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[1]);

      driver.optionAt(4).click();
      expect(onOptionClick).toHaveBeenCalledWith(options[4]);
    });

    it('should not select non selectable options', () => {
      const onOptionClick = jest.fn();
      const driver = createDriver(
        createDropdownContent({ options, onOptionClick }),
      );

      driver.optionAt(2).click();
      expect(onOptionClick).not.toHaveBeenCalled();

      driver.optionAt(5).click();
      expect(onOptionClick).not.toHaveBeenCalled();
    });

    it('should trigger an onMouseDown event', () => {
      const onMouseDown = jest.fn();
      const driver = createDriver(
        createDropdownContent({ options, onMouseDown }),
      );
      driver.triggerMouseDown();
      expect(onMouseDown).toHaveBeenCalled();
    });

    it('should trigger onMouseDown with an event', () => {
      const onMouseDown = jest.fn();
      const driver = createDriver(
        createDropdownContent({ options, onMouseDown }),
      );
      driver.triggerMouseDown();
      expect(onMouseDown.mock.calls[0].length).toBe(1);
    });
  });

  describe('onOptionHover', () => {
    it('should call `onOptionHover` when option is hovered', () => {
      const onOptionHover = jest.fn();
      const driver = createDriver(
        createDropdownContent({
          options,
          onOptionHover,
        }),
      );

      driver.triggerMouseDown();

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

    it("should pass option's DOM id to `onOptionHover` if `optionsContainerId` is set", () => {
      const onOptionHover = jest.fn();
      const driver = createDriver(
        createDropdownContent({
          options,
          onOptionHover,
          optionsContainerId: 'd103aca5',
        }),
      );

      driver.triggerMouseDown();

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
  });
});
