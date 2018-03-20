import * as React from 'react';
import {number, any, oneOf, arrayOf} from 'prop-types';
import style from './HBox.st.css';

export interface HBoxProps {
  children?: React.ReactNode;
  verticalAlignment?: AlignmentOptions;
  spacing?: number;
}

export type AlignmentOptions = 'top' | 'center' | 'bottom';

/**
 * HBox
 */
export const HBox: React.SFC<HBoxProps> = props => {
  const {verticalAlignment, spacing, children} = props;
  return <div {...style('root', {verticalAlignment}, props)}>{addSpacing(children, spacing, 'right')}</div>;
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

HBox.propTypes = {
  children: any,
  verticalAlignment: oneOf(['top', 'center', 'bottom']),
  spacing: number
};
