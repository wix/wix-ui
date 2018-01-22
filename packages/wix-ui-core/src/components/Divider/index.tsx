import * as React from 'react';
import style from './Divider.st.css';
import {bool, any} from 'prop-types';

export interface DividerProps {
    vertical?: boolean;
    children?: any;
}

/**
 * Divider
 */
export const Divider: React.SFC<DividerProps> = (props: DividerProps) => {
    const {children, vertical} = props;
    return children ?
        <div {...style('root', {}, props)}>{children}</div> :
        <div {...style(`root ${style.divider} ${vertical ? style.vertical : ''}`.trim(), {}, props)} />;
};

Divider.displayName = 'Divider';
Divider.propTypes = {
    /** Is the direction of the divider vertical */
    vertical: bool,
    /** Optional custom divider */
    children: any
};
