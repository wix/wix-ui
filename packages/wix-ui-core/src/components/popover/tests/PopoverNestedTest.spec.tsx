import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Popover } from '../Popover';
import { act } from 'react-dom/test-utils';

const renderNestedPopover = (
  level1,
  level2,
  level3,
  level4,
  excludeClass?: string,
) => (
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
            <Popover
              appendTo="window"
              shown
              onClickOutside={level3}
              placement="top"
            >
              <Popover.Element>
                <button data-hook="level-3">level-3</button>
              </Popover.Element>
              <Popover.Content>
                <Popover
                  appendTo="window"
                  shown
                  onClickOutside={level4}
                  placement="top"
                >
                  <Popover.Element>
                    <button data-hook="level-4">level-4</button>
                  </Popover.Element>
                  <Popover.Content>
                    <button data-hook="level-5">level-5</button>
                  </Popover.Content>
                </Popover>
              </Popover.Content>
            </Popover>
          </Popover.Content>
        </Popover>
      </Popover.Content>
    </Popover>
  </div>
);

describe('Click outside nested popovers', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should click outside a nested popover', () => {
    const level1 = jest.fn(),
      level2 = jest.fn(),
      level3 = jest.fn(),
      level4 = jest.fn();
    act(() => {
      ReactDOM.render(
        renderNestedPopover(level1, level2, level3, level4),
        container,
      );
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-5"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-4"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-3"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(1);

    act(() => {
      document
        .querySelector(`[data-hook="level-2"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(1);
    expect(level4).toHaveBeenCalledTimes(2);

    act(() => {
      document
        .querySelector(`[data-hook="level-1"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(1);
    expect(level3).toHaveBeenCalledTimes(2);
    expect(level4).toHaveBeenCalledTimes(3);

    act(() => {
      document
        .querySelector(`[data-hook="outside"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(1);
    expect(level2).toHaveBeenCalledTimes(2);
    expect(level3).toHaveBeenCalledTimes(3);
    expect(level4).toHaveBeenCalledTimes(4);
  });

  it('should click outside a nested popover with excludeClass', () => {
    const level1 = jest.fn(),
      level2 = jest.fn(),
      level3 = jest.fn(),
      level4 = jest.fn();
    act(() => {
      ReactDOM.render(
        renderNestedPopover(level1, level2, level3, level4, 'excludeClass'),
        container,
      );
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-5"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-4"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(0);

    act(() => {
      document
        .querySelector(`[data-hook="level-3"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(0);
    expect(level4).toHaveBeenCalledTimes(1);

    act(() => {
      document
        .querySelector(`[data-hook="level-2"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(0);
    expect(level3).toHaveBeenCalledTimes(1);
    expect(level4).toHaveBeenCalledTimes(2);

    act(() => {
      document
        .querySelector(`[data-hook="level-1"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(0);
    expect(level2).toHaveBeenCalledTimes(1);
    expect(level3).toHaveBeenCalledTimes(2);
    expect(level4).toHaveBeenCalledTimes(3);

    act(() => {
      document
        .querySelector(`[data-hook="outside"]`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    });

    expect(level1).toHaveBeenCalledTimes(1);
    expect(level2).toHaveBeenCalledTimes(2);
    expect(level3).toHaveBeenCalledTimes(3);
    expect(level4).toHaveBeenCalledTimes(4);
  });
});
