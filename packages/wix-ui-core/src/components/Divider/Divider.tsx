import * as React from 'react';
import * as classNames from 'classnames';
import style from './DividerStyle.st.css';
import {bool, any} from 'prop-types';

export interface DividerProps {
    vertical?: boolean;
    children?: any;
}

/**
 * Divider
 */
export const Divider: React.SFC<DividerProps> = ({children, vertical}) => (
    children ?
        <div>{children}</div> :
        <div className={classNames(style.divider, {[style.vertical]: vertical})} />
);

Divider.displayName = 'Divider';
Divider.propTypes = {
    /** Is the direction of the divider vertical */
    vertical: bool,
    /** Optional custom divider */
    children: any
};
