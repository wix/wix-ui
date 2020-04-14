import * as React from 'react';
import loadable from '@loadable/component';
import * as memoizeOneModule from 'memoize-one';

import { Portal, CSSTransition, Loader } from '../components';
import { PopperProps } from '../components/Popper';
import { PopoverNextProps } from '../popover-next';

import { usePortalNode } from './hooks/usePortalNode';
import { getModifiers } from './utils/getModifiers';
import { shouldAnimatePopover } from './utils/shouldAnimatePopover';

// there is an issue with memoize-one package with typescript projects
// https://github.com/alexreardon/memoize-one/pull/40
const memoizeOne = memoizeOneModule.default || memoizeOneModule;

type LoadablePopper = any;

const lazyPopperFactory = (memoizeOne as any)(key =>
  process.env.NODE_ENV === 'test'
    ? require('../components/Popper').default
    : loadable(() =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "wuc-popover-next" */ '../components/Popper'
        ),
      ),
) as (key: number) => React.ComponentType<LoadablePopper>;

export interface ContentProps extends PopoverNextProps {
  portalNode: Element;
  shown: boolean;
  dataHook: string;
  cacheId: number;
  isMounted: boolean;
  contentHook: PopperProps['contentHook'];
  grabScheduleUpdater: PopperProps['grabScheduleUpdater'];
  referenceRef: React.Ref<HTMLElement>;
}

export const Content: React.ElementType<ContentProps> = props => {
  const {
    dataHook,
    children,
    shown,
    contentHook,
    cacheId,
    grabScheduleUpdater,
    isMounted,
    referenceRef,
    ...rest
  } = props;

  const {
    timeout,
    placement,
    customArrow,
    moveArrowTo,
    showArrow,
    id,
    role,
  } = rest;

  // dynamically loaded popper
  const Popper = lazyPopperFactory(cacheId);

  //hooks
  const { shouldAnimate } = shouldAnimatePopover(timeout);

  // generate portalNode
  const { portalNode, detachStyles, boundariesElement } = usePortalNode(
    props,
    referenceRef,
    shouldAnimate,
  );

  // controlling modifiers for popper
  const modifiers = getModifiers({ ...rest, shouldAnimate, boundariesElement });

  const popper = () => (
    <Popper
      dataHook={dataHook}
      placement={placement}
      fallback={<Loader />}
      modifiers={modifiers}
      contentHook={contentHook}
      arrowOptions={{ customArrow, moveArrowTo, showArrow }}
      grabScheduleUpdater={grabScheduleUpdater}
      accesibilityOptions={{ id, role }}
    >
      {children}
    </Popper>
  );

  if (shouldAnimate && isMounted) {
    return (
      <Portal node={portalNode}>
        <CSSTransition
          shown={shown}
          timeout={timeout}
          onAnimationExit={detachStyles}
        >
          {popper()}
        </CSSTransition>
      </Portal>
    );
  }

  return shown && isMounted && <Portal node={portalNode}>{popper()}</Portal>;
};
