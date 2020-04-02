import * as React from 'react';

import { Manager as PopperManager } from 'react-popper';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useClickOutside } from './hooks/useClickOutside';

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

  useClickOutside(clickOutsideRef, onClickOutside, { excludeClass });

  return (
    <ErrorBoundary key={cacheId} onRetry={_recoverFromError}>
      <PopperManager>
        <div
          {...styles('root', {}, props)}
          ref={clickOutsideRef}
          style={style}
          data-hook={dataHook}
          data-content-hook={contentHook}
        >
          {children}
        </div>
      </PopperManager>
    </ErrorBoundary>
  );
};
