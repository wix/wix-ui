import * as React from 'react';

import cx from 'classnames';

// import {DragIcon, ReorderLockerIcon} from '../icons';
import {ListItem} from '../list';

import {DraggableStyleStates} from './draggable';

import style from './draggable-list-item.st.css';

export interface DraggableListItemProps {
    className?: string;
    draggable?: boolean;
    showDragIcon?: boolean;
    'data-automation-id'?: string;
    styleStates?: DraggableStyleStates;
}

export const DraggableListItem: React.StatelessComponent<
    DraggableListItemProps
> = props => {
    const {
        className,
        styleStates,
        draggable,
        showDragIcon = true,
        children,
        ...rest
    } = props;

    // let icon = null;
    // if (showDragIcon) {
        // icon = draggable ? <DragIcon /> : <ReorderLockerIcon />;
    // }

    return (
        <ListItem
            {...rest}
            draggable={draggable}
            data-automation-id={cx(
                'DRAGGABLE_LIST_ITEM',
                rest['data-automation-id']
            )}
            {...style(cx('root', className), styleStates)}
        >
            <div className={style.content}>{props.children}</div>
            {/* {icon && <div className={style.dragIcon}>{icon}</div>} */}
        </ListItem>
    );
};
