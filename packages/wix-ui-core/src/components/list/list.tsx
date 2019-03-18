import * as React from 'react';

import cx from 'classnames';

import styles from './list.st.css';

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {};

export const ListItem: React.SFC<ListItemProps> = ({children, ...props}) => (
    <li {...props}>{children}</li>
);

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {};

export const List: React.SFC<ListProps> = ({children, className}) => {
    const count = React.Children.count(children);
    return (
        <ul {...styles(cx('root', className))}>
            {React.Children.map(children, (child, index) =>
                typeof child === 'object' ? (
                    React.cloneElement(child as React.ReactElement, {
                        className: cx(
                            styles.ListItem,
                            {[styles.last]: index === count - 1},
                            (child as React.ReactElement).props.className
                        )
                    })
                ) : (
                    <ListItem
                        className={cx(styles.ListItem, {
                            [styles.last]: index === count - 1
                        })}
                        key={index}
                    >
                        {child}
                    </ListItem>
                )
            )}
        </ul>
    );
};
