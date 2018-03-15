import * as React from 'react';
import style from './VBox.st.css';

export interface VBoxProps {
  children?: React.ReactNode;
  className?: string;
  horizontalAlignment?: 'left' | 'center' | 'right';
  spacing?: number;
}

const addSpacing = (children, spacing) => {
  if (!children) {
    return null;
  }

  if (!spacing) {
    return children;
  }

  const spacedChildren = [];
  for (let i = 0; i < children.length - 1; i++) {
    spacedChildren.push(
      <div style={{marginBottom: spacing}}>
        {children[i]}
      </div>
    );
  }

  spacedChildren.push(children[children.length - 1]);

  return spacedChildren;
};

/**
 * VBox
 */
export const VBox: React.SFC<VBoxProps> = props => {
  const {horizontalAlignment, spacing} = props;
  return <div className={props.className} {...style('root', {horizontalAlignment})}>{addSpacing(props.children, spacing)}</div>;
};
