import * as React from 'react';
import {object, bool, any} from 'prop-types';
import {createHOC} from '../../createHOC';
import * as classNames from 'classnames';

export interface DividerClasses {
    divider: string;
    vertical: string;
}

export interface DividerProps {
    classes?: DividerClasses;
    vertical?: boolean;
    children?: any;
}

class Divider extends React.PureComponent<DividerProps> {

    static propTypes = {
        /** The classes used to style the Divider */
        classes: object.isRequired,
        /** Is the direction of the divider vertical */
        vertical: bool,
        /** Optional custom divider */
        children: any
    };

    render() {
        const {classes, children} = this.props;

        const activeClasses = classNames(classes.divider, {
            [classes.vertical]: this.props.vertical
        });

        return children ? <div>{children}</div> : <div className={activeClasses} />;
    }
}

export default createHOC(Divider);
