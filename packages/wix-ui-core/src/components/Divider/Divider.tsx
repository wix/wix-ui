import * as React from 'react';
import {object} from 'prop-types';
import {createHOC} from '../../createHOC';

interface DividerClasses {
    divider?: string;
}

interface DividerProps {
    classes?: DividerClasses;
}

class Divider extends React.PureComponent<DividerProps> {

    static propTypes = {
        /** The classes used to style the Divider */
        classes: object
    }

    render() {
        const {classes} = this.props;

        return <div className={classes.divider} />
    }
}

export default createHOC(Divider);