import * as React from 'react';

import {
  createComponentThatRendersItsChildren,
  buildChildrenObject,
} from '../../utils';
import { testId } from './utils';

import { Manager, Trigger, Content } from './components-x';

export const PopoverNext = props => {
  //props and states
  const [shown, setShown] = React.useState(false);
  const [cacheId, setCacheId] = React.useState(1);

  //refs
  const referenceRef = React.createRef<HTMLDivElement>();

  //local variables
  const contentHook = `popover-content-${props['data-hook'] || ''}-${testId}`;

  //callback handlers
  const { onClickOutside, onMouseLeave } = props;

  const _onClickOutside = () => onClickOutside && onClickOutside();
  const _onErrorRecovery = () => {
    onMouseLeave && onMouseLeave();
    setCacheId(cacheId + 1);
  };

  const { onMouseEnter, onClick, onKeyDown } = props;

  const children = buildChildrenObject(props.children, {
    Element: null,
    Content: null,
  });

  return (
    <Manager
      {...props}
      cacheId={cacheId}
      dataHook={props['data-hook']}
      data-content-hook={contentHook}
      onClickOutside={_onClickOutside}
      onErrorRecovery={_onErrorRecovery}
    >
      <Trigger
        dataHook="popover-element"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        referenceRef={referenceRef}
      >
        {children.Element}
      </Trigger>
      <Content cacheId={cacheId} shown={shown}>
        {children.Content}
      </Content>
    </Manager>
  );
};

PopoverNext.Element = createComponentThatRendersItsChildren('Popover.Element');
PopoverNext.Content = createComponentThatRendersItsChildren('Popover.Content');
