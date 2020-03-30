import * as React from 'react';
import loadable from '@loadable/component';
import * as memoizeOneModule from 'memoize-one';

import { Portal, CSSTransition, Loader } from '../components';
import { PopperProps } from '../components/Popper';

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

export interface ContentProps {
  portalNode: Element;
  shown: boolean;
  dataHook: string;
  cacheId: number;
  animationOptions: {
    animate?: boolean;
    onAnimationExit?(): void;
    timeout?: number | { enter: number; exit: number };
  };
  popperOptions: {
    placement: PopperProps['placement'];
  };
  contentHook: PopperProps['contentHook'];
  modifiers: PopperProps['modifiers'];
  arrowOptions: PopperProps['arrowOptions'];
  accesibilityOptions: PopperProps['accesibilityOptions'];
  grabScheduleUpdater: PopperProps['grabScheduleUpdater'];
}

export const Content: React.ElementType<ContentProps> = props => {
  const {
    dataHook,
    portalNode,
    children,
    shown,
    contentHook,
    cacheId,
    grabScheduleUpdater,
    modifiers,
    animationOptions,
    arrowOptions,
    accesibilityOptions,
    popperOptions,
  } = props;

  // dynamically loaded popper
  const Popper = lazyPopperFactory(cacheId);

  const popper = () => (
    <Popper
      dataHook={dataHook}
      placement={popperOptions.placement}
      fallback={<Loader />}
      modifiers={modifiers}
      contentHook={contentHook}
      popperOptions={popperOptions}
      arrowOptions={arrowOptions}
      grabScheduleUpdater={grabScheduleUpdater}
      accesibilityOptions={accesibilityOptions}
    >
      {children}
    </Popper>
  );

  if (animationOptions.animate) {
    return (
      <Portal node={portalNode}>
        <CSSTransition
          shown={shown}
          timeout={animationOptions.timeout}
          onAnimationExit={animationOptions.onAnimationExit}
        >
          {popper()}
        </CSSTransition>
      </Portal>
    );
  }

  return shown && <Portal node={portalNode}>{popper()}</Portal>;
};
