import * as React from 'react';
import { Manager, Reference } from 'react-popper';

import { ClickOutside } from '../click-outside';
import {
  createComponentThatRendersItsChildren,
  buildChildrenObject,
} from '../../utils';

import styles from '../popover/Popover.st.css';

export const PopoverNext = props => {
  //props and states
  const [shown, setShown] = React.useState(false);

  //refs
  const clickOutsideRef = React.createRef<HTMLElement>();
  const referenceRef = React.createRef<HTMLElement>();

  //local variables
  const contentHook = null;

  //callback handlers
  const _handleClickOutside = () => {
    const { onClickOutside } = props;
    onClickOutside && onClickOutside();
  };

  //render handlers
  const renderElement = children => {
    const { onClick, onKeyDown } = props;
    return (
      <Reference innerRef={referenceRef}>
        {({ ref }) => (
          <div
            ref={ref}
            data-hook="popover-element"
            className={styles.popoverElement}
            onClick={onClick}
            onKeyDown={onKeyDown}
          >
            {children}
          </div>
        )}
      </Reference>
    );
  };

  const { onMouseEnter, onMouseLeave, excludeClass, style, children } = props;

  const childrenObject = buildChildrenObject(children, {
    Element: null,
    Content: null,
  });

  return (
    <Manager>
      <ClickOutside
        rootRef={clickOutsideRef}
        onClickOutside={shown ? _handleClickOutside : undefined}
        excludeClass={excludeClass ? excludeClass : styles.popover}
      >
        <div
          {...style('root', {}, props)}
          ref={clickOutsideRef}
          style={style}
          data-hook={props['data-hook']}
          data-content-hook={contentHook}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {renderElement()}
        </div>
      </ClickOutside>
    </Manager>
  );
};

PopoverNext.Element = createComponentThatRendersItsChildren('Popover.Element');
PopoverNext.Content = createComponentThatRendersItsChildren('Popover.Content');
