import * as React from 'react';
import * as classNames from 'classnames';
import {object, bool, any} from 'prop-types';
import {createHOC} from '../../createHOC';

export interface DividerClasses {
    divider: string;
    vertical: string;
}

export interface DividerProps {
    classes?: DividerClasses;
    vertical?: boolean;
    children?: any;
}

const Divider: React.SFC<DividerProps> = ({classes, children, vertical}) => (
    children ?
        <div>{children}</div> :
        <div className={classNames(classes.divider, {[classes.vertical]: vertical})} />
);

Divider.propTypes = {
    /** The classes used to style the Divider */
    classes: object.isRequired,
    /** Is the direction of the divider vertical */
    vertical: bool,
    /** Optional custom divider */
    children: any
};

export default createHOC(Divider);
