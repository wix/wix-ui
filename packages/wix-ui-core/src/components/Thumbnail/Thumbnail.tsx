import * as React from 'react';
import {bool, node, func} from 'prop-types';
import style from './Thumbnail.st.css';

export interface ThumbnailProps {
  /** Is the thumbnail selected */
  selected?: boolean;
  /** Callback when the element is clicked */
  onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>;
  /** Icon to display in when thumbnail is selected */
  selectedIcon?: React.ReactNode;
  /** Item to sit inside the Thumbnail */
  children?: React.ReactNode;
}

export const Thumbnail: React.SFC<ThumbnailProps> = props => {
  const children = React.Children.only(props.children);
  const {selected, selectedIcon, onClick} = props;

  return (
    <div {...style('root', {selected}, props)} onClick={onClick}>
      {children}

      <div className={style.selectedIcon} data-hook="selected-icon">
        {selectedIcon}
      </div>
    </div>
  );
};

Thumbnail.displayName = 'Thumbnail';

Thumbnail.propTypes = {
  /** Is the thumbnail selected */
  selected: bool,
  /** Callback when the element is clicked */
  onClick: func,
  /** Icon to display in when thumbnail is selected */
  selectedIcon: node,
  /** Item to sit inside the Thumbnail */
  children: node
};

Thumbnail.defaultProps = {
  onClick: () => null
};
