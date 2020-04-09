import * as React from 'react';
import { style, classes } from './Thumbnail.st.css';

export interface ThumbnailProps {
  /** Is the thumbnail selected */
  selected?: boolean;
  /** Callback when the element is clicked */
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  /** Icon to display in when thumbnail is selected */
  selectedIcon?: React.ReactNode;
  /** Item to sit inside the Thumbnail */
  children?: React.ReactNode;
  /** Is the thumbnail disabled */
  disabled?: boolean;
}

export const Thumbnail: React.FunctionComponent<ThumbnailProps> = props => {
  const children = React.Children.only(props.children);
  const { selected, selectedIcon, onClick, disabled } = props;

  return (
    <div
      className={style(classes.root, { selected, disabled })}
      onClick={onClick}
    >
      {children}

      {selectedIcon && selected && (
        <div className={classes.selectedIcon} data-hook="selected-icon">
          {selectedIcon}
        </div>
      )}
    </div>
  );
};

Thumbnail.displayName = 'Thumbnail';

Thumbnail.defaultProps = {
  onClick: () => null,
  disabled: false,
};
