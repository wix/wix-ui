import * as React from 'react';
import Input, {InputProps} from '../Input';
import {createHOC} from '../../createHOC';

export interface InputWithAffixesProps extends InputProps {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

class InputWithAffixes extends React.Component<InputWithAffixesProps> {
    render() {
        const {prefix, suffix, ...props} = this.props;
        return (
        <div>
            {this.props.prefix && <div data-hook="input-prefix">{prefix}</div>}
            <Input {...props}/>
            {this.props.suffix && <div data-hook="input-suffix">{suffix}</div>}
        </div>);
    }
}

export default createHOC(InputWithAffixes);
