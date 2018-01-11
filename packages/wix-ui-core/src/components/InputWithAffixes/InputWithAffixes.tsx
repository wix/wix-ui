import * as React from 'react';
import Input, {InputProps} from '../Input';
import {createHOC} from '../../createHOC';

export interface InputWithAffixesProps extends InputProps {

}

class InputWithAffixes extends React.Component<InputWithAffixesProps> {
    render() {
        return <Input/>;
    }
}

export default createHOC(InputWithAffixes);
