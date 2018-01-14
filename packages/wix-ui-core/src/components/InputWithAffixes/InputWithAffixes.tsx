import * as React from 'react';
import Input, {InputProps} from '../Input';
import {createHOC} from '../../createHOC';

export interface InputWithAffixesProps extends InputProps {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

class InputWithAffixes extends React.Component<InputWithAffixesProps> {
    render() {
    return (
    <div>
        {this.props.prefix && <div data-hook="input-prefix">{this.props.prefix}</div>}
        <Input/>
        {this.props.suffix && <div data-hook="input-suffix">{this.props.suffix}</div>}
    </div>);
    }
}

export default createHOC(InputWithAffixes);
