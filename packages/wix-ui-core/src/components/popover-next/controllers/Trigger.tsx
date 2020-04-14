import * as React from 'react';

import { Reference } from 'react-popper';
import styles from '../../popover/Popover.st.css';

export interface TriggerProps {
  dataHook: string;
  referenceRef: React.Ref<HTMLDivElement>;
  onClick(): void;
  onMouseEnter(): void;
  onMouseLeave(): void;
  onKeyDown(): void;
}

export const Trigger: React.ElementType<TriggerProps> = props => {
  const { dataHook, children, referenceRef, ...rest } = props;
  return (
    <Reference innerRef={referenceRef}>
      {({ ref }) => (
        <div
          ref={ref}
          data-hook={dataHook}
          className={styles.popoverElement}
          {...rest}
        >
          {children}
        </div>
      )}
    </Reference>
  );
};
