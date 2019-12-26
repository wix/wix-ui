import * as React from 'react';

import {
  HorizontalMenuContext,
  HorizontalMenuContextValue,
} from '../HorizontalMenuContext';
import {
  HorizontalMenuItemContext,
  HorizontalMenuItemContextValue,
} from '../horizontal-menu-item/HorizontalMenuItemContext';
import { calculatePositioning } from './calculatePositioning';

export interface HorizontalMenuLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  maxOverflowWidth?: number;
  children?: React.ReactNode;
}

export interface HorizontalMenuLayoutWrappedProps
  extends HorizontalMenuLayoutProps {
  menuContext: HorizontalMenuContextValue;
  menuItemContext: HorizontalMenuItemContextValue;
  isOpen: boolean;
}

interface HorizontalMenuLayoutState {
  styles: React.CSSProperties;
}

export class HorizontalMenuLayout<P> extends React.Component<
  HorizontalMenuLayoutWrappedProps & P,
  HorizontalMenuLayoutState
> {
  layoutRef: React.RefObject<HTMLUListElement> = React.createRef();

  state = {
    styles: {},
  };

  componentDidUpdate(props: HorizontalMenuLayoutWrappedProps) {
    const { isOpen, menuItemContext } = this.props;

    if (
      (isOpen !== props.isOpen && isOpen) ||
      menuItemContext.expandSize !== props.menuItemContext.expandSize
    ) {
      this.recalculatePositions();
    }
  }

  private recalculatePositions() {
    const { maxOverflowWidth, menuItemContext } = this.props;

    this.setState({
      styles: calculatePositioning({
        expandSize: menuItemContext.expandSize,
        layoutRef: this.layoutRef,
        maxOverflowWidth,
        getMenuBoundingRect: menuItemContext.getMenuBoundingRect,
        getMenuItemBoundingRect: menuItemContext.getMenuItemBoundingRect,
      }),
    });
  }
}

export function withHorizontalMenuLayout<T>(
  WrappedComponent: React.ComponentType<T & HorizontalMenuLayoutWrappedProps>,
) {
  return (props: T & HorizontalMenuLayoutProps) => (
    <HorizontalMenuContext.Consumer>
      {context => {
        return (
          <HorizontalMenuItemContext.Consumer>
            {menuItemContext => {
              return (
                <WrappedComponent
                  {...props}
                  menuContext={context}
                  menuItemContext={menuItemContext}
                  isOpen={menuItemContext.isOpen}
                />
              );
            }}
          </HorizontalMenuItemContext.Consumer>
        );
      }}
    </HorizontalMenuContext.Consumer>
  );
}
