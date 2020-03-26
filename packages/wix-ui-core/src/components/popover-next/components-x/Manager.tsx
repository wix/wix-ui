import * as React from 'react';

import { Manager as PopperManager } from 'react-popper';
import { ClickOutside } from '../../click-outside';
import { ErrorBoundary } from '../components/ErrorBoundary';

import styles from '../../popover/Popover.st.css';

export interface ManagerProps {
  dataHook: string;
  contentHook: string;
  onErrorRecovery(): void;
  onClickOutside(): void;
  style?: React.CSSProperties;
  excludeClass?: string;
  cacheId: number;
}

export const Manager: React.ElementType<ManagerProps> = props => {
  const clickOutsideRef = React.createRef<HTMLDivElement>();

  const _recoverFromError = () => {
    const { onErrorRecovery } = props;
    onErrorRecovery && onErrorRecovery();
  };

  const {
    excludeClass,
    onClickOutside,
    children,
    style,
    contentHook,
    dataHook,
    cacheId,
  } = props;

  return (
    <ErrorBoundary key={cacheId} onRetry={_recoverFromError}>
      <PopperManager>
        <ClickOutside
          rootRef={clickOutsideRef}
          onClickOutside={onClickOutside ? onClickOutside : undefined}
          excludeClass={excludeClass ? excludeClass : styles.popover}
        >
          <div
            {...styles('root', {}, props)}
            ref={clickOutsideRef}
            style={style}
            data-hook={dataHook}
            data-content-hook={contentHook}
          >
            {children}
          </div>
        </ClickOutside>
      </PopperManager>
    </ErrorBoundary>
  );
};
