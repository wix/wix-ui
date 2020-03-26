import * as React from 'react';
import loadable from '@loadable/component';
import * as memoizeOneModule from 'memoize-one';

import { Portal, CSSTransition, Loader } from '../components';

import styles from '../../popover/Popover.st.css';

// there is an issue with memoize-one package with typescript projects
// https://github.com/alexreardon/memoize-one/pull/40
const memoizeOne = memoizeOneModule.default || memoizeOneModule;

type LoadablePopper = PopperProps & { fallback: Element };

const lazyPopperFactory = (memoizeOne as any)(key =>
  process.env.NODE_ENV === 'test'
    ? require('./components/Popper').default
    : loadable(() =>
        import(
          /* webpackPrefetch: true, webpackChunkName: "wuc-popover-next" */ './components/Popper'
        ),
      ),
) as (key: number) => React.ComponentType<LoadablePopper>;

export interface ContentProps {
  portalNode: Element;
  timeout: number | { enter: number; exit: number };
  shown: boolean;
  shouldAnimate: boolean;
  detachStyles(): void;
  contentHook: string;
  cacheId: number;
  grabScheduleUpdater(): void;
  onAnimationExit(): void;
  modifiers: object;
}

export const Content: React.ElementType<ContentProps> = props => {
  const {
    portalNode,
    timeout,
    shouldAnimate,
    children,
    shown,
    onAnimationExit,
    contentHook,
    cacheId,
    modifiers,
    grabScheduleUpdater,
  } = props;

  const Popper = lazyPopperFactory(cacheId);

  const popper = (
    <Popper
      fallback={<Loader />}
      modifiers={modifiers}
      contentHook={contentHook}
      grabScheduleUpdater={grabScheduleUpdater}
    >
      {children}
    </Popper>
  );

  if (shouldAnimate) {
    return (
      <Portal node={portalNode}>
        <CSSTransition
          shown={shown}
          timeout={timeout}
          shouldAnimate={shouldAnimate}
          onAnimationExit={onAnimationExit}
        >
          {popper}
        </CSSTransition>
      </Portal>
    );
  }

  return shown && <Portal node={portalNode}>{popper}</Portal>;
};
