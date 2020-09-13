import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Popover } from '../Popover';
import { act } from 'react-dom/test-utils';

const renderNestedPopover = (level1, level2, excludeClass?: string) => (
  <div>
    <button data-hook="outside">Outside</button>
    <Popover
      appendTo="window"
      shown
      onClickOutside={level1}
      placement="top"
      excludeClass={excludeClass}
    >
      <Popover.Element>
        <button data-hook="level-1">level-1</button>
      </Popover.Element>
      <Popover.Content>
        <Popover
          appendTo="window"
          shown
          onClickOutside={level2}
          placement="top"
        >
          <Popover.Element>
            <button data-hook="level-2">level-2</button>
          </Popover.Element>
          <Popover.Content>
            <button data-hook="level-3">level-3</button>
          </Popover.Content>
        </Popover>
      </Popover.Content>
    </Popover>
  </div>
);

describe('Click outside nested popovers', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
    container = null;
  });

  it('should close nested popover only when clicking outside of them', () => {
    const level1 = jest.fn(),
      level2 = jest.fn();
    act(() => {
      ReactDOM.render(renderNestedPopover(level1, level2), container);
    });

    // Before clicking
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-3"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the nested popover content - no popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-2"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the nested popover element, which is the outer popover content - no popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-1"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the outer popover element - only nested popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(1);

    act(() => {
      document
        .querySelector(`[data-hook="outside"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking outside the outer popover - both should close
    expect(level1).toHaveBeenCalledTimes(1);
    expect(level2).toHaveBeenCalledTimes(2);
  });

  it('should close nested popover with excludeClass only when clicking outside of them', () => {
    const level1 = jest.fn(),
      level2 = jest.fn();
    act(() => {
      ReactDOM.render(
        renderNestedPopover(level1, level2, 'excludeClass'),
        container,
      );
    });

    // Before clicking
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-3"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the nested popover content - no popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-2"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the nested popover element, which is the outer popover content - no popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-1"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking the outer popover element - only nested popover should close
    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(1);

    act(() => {
      document
        .querySelector(`[data-hook="outside"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    // After clicking outside the outer popover - both should close
    expect(level1).toHaveBeenCalledTimes(1);
    expect(level2).toHaveBeenCalledTimes(2);
  });
});
