import * as React from 'react';
import {number, any, oneOf, arrayOf} from 'prop-types';
import style from './VBox.st.css';

export interface VBoxProps {
  children?: React.ReactNode;
  horizontalAlignment?: VBoxAlignmentOptions;
  spacing?: number;
}

export type VBoxAlignmentOptions = 'left' | 'center' | 'right';

/**
 * VBox
 */
export const VBox: React.SFC<VBoxProps> = props => {
  const {horizontalAlignment, spacing} = props;
  return <div {...style('root', {horizontalAlignment}, props)}>{addSpacing(props.children, spacing, 'bottom')}</div>;
};

function addSpacing (children, spacing, direction) {
  if (!children || !spacing) {
    return children;
  }

  const marginDirection = direction === 'right' ? 'marginRight' : direction === 'bottom' ? 'marginBottom' : 'marginRight';

  const spacedChildren = [];
  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      <div style={{marginDirection: spacing}}>
        {children[i]}
      </div>
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
}

VBox.propTypes = {
  children: any,
  horizontalAlignment: oneOf(['left', 'center', 'right']),
  spacing: number
};
