import * as React from 'react';
import style from './HBox.st.css';

export interface HBoxProps {
  children?: React.ReactNode;
  className?: string;
  verticalAlignment?: 'top' | 'center' | 'bottom';
  spacing?: number;
}

const addSpacing = (children, spacing) => {
  if (!children) {
    return null;
  }

  const spacedChildren = [];
  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      <div style={{marginRight: spacing}}>
        {children[i]}
      </div>
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
};

/**
 * HBox
 */
export const HBox: React.SFC<HBoxProps> = props => {
  const {verticalAlignment, spacing} = props;
  return <div className={props.className} {...style('root', {verticalAlignment})}>{addSpacing(props.children, spacing)}</div>;
};
