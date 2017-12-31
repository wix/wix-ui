import * as React from 'react';
import {object, bool} from 'prop-types';
import {createHOC} from '../../createHOC';
import * as classNames from 'classnames';

interface DividerClasses {
    divider: string;
    vertical: string;
}

interface DividerProps {
    classes: DividerClasses;
    vertical?: boolean;
}

class Divider extends React.PureComponent<DividerProps> {

    static propTypes = {
        /** The classes used to style the Divider */
        classes: object.isRequired,
        /** Is the direction of the divider vertical */
        vertical: bool
    };

    render() {
        const {classes} = this.props;

        const activeClasses = classNames(classes.divider, {
            [classes.vertical]: this.props.vertical
        });

        return <div className={activeClasses} />;
    }
}

export default createHOC(Divider);
