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

export type ExpandSize = 'column' | 'menu' | 'fullWidth';

export interface HorizontalMenuLayoutProps {
  className?: string;
  style?: React.CSSProperties;
  textAlign?: 'left' | 'center' | 'right';
  maxOverflowWidth?: number;
  expandSize?: ExpandSize;
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

interface HorizontalMenuLayoutDefaultProps {
  expandSize: ExpandSize;
}

export class HorizontalMenuLayout<P> extends React.Component<
  HorizontalMenuLayoutWrappedProps & P,
  HorizontalMenuLayoutState
> {
  static defaultProps: HorizontalMenuLayoutDefaultProps = {
    expandSize: 'column',
  };

  layoutRef: React.RefObject<HTMLUListElement> = React.createRef();

  state = {
    styles: {},
  };

  componentDidUpdate(props: HorizontalMenuLayoutWrappedProps) {
    const { isOpen, expandSize } = this.props;

    if (
      (isOpen !== props.isOpen && isOpen) ||
      expandSize !== props.expandSize
    ) {
      this.recalculatePositions();
    }
  }

  private recalculatePositions() {
    const { maxOverflowWidth, menuItemContext, expandSize } = this.props;

    this.setState({
      styles: calculatePositioning({
        expandSize,
        layoutRef: this.layoutRef,
        maxOverflowWidth,
        getMenuBoundingRect: menuItemContext.getMenuBoundingRect,
        getMenuItemBoundingRect: menuItemContext.getMenuItemBoundingRect,
        getMenuItemOffsetLeft: menuItemContext.getMenuItemOffsetLeft,
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
