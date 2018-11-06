import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import inputDriverFactory from '../Input/Input.driver';
import dropdownLayoutDriverFactory from '../DropdownLayout/DropdownLayout.driver';
import ReactDOM from 'react-dom';

const inputWithOptionsDriverFactory = ({element, wrapper, component}) => {

  const inputWrapper = element && element.childNodes[0];
  const inputDriver = element && inputDriverFactory({element: inputWrapper.childNodes[0], wrapper: inputWrapper});
  const dropdownLayoutDriver = element && dropdownLayoutDriverFactory({element: element.childNodes[1].childNodes[0], wrapper});

  const driver = {
    exists: () => !!element,
    inputWrapper: () => inputWrapper,
    focus: () => inputDriver.focus(),
    blur: () => dropdownLayoutDriver.mouseClickOutside(),
    pressDownKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'ArrowDown'}),
    pressUpKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'ArrowUp'}),
    pressAnyKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Any'}),
    pressEnterKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Enter'}),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Tab'}),
    pressEscKey: () => ReactTestUtils.Simulate.keyDown(inputWrapper, {key: 'Escape'}),
    outsideClick: () => document.body.dispatchEvent(new Event('click', {cancelable: true})),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    },
    isOptionWrappedToHighlighter: optionId => {
      const {element} = dropdownLayoutDriver.optionById(optionId);
      return !!element().querySelector(`[data-hook=highlighter-${optionId}]`);
    }
  };
  return {
    exists: () => driver.exists(),
    driver,
    inputDriver,
    dropdownLayoutDriver
  };
};

export default inputWithOptionsDriverFactory;
