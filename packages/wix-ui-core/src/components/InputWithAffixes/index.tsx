import * as React from 'react';
import {Input, InputProps} from '../Input';
import style from './InputWithAffixes.st.css';

export interface InputWithAffixesProps extends InputProps {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

export class InputWithAffixes extends React.Component<InputWithAffixesProps> {
    render() {
        const {prefix, suffix, ...props} = this.props;
        return (
        <div {...style('root', {}, this.props)}>
            {this.props.prefix && <div data-hook="input-prefix">{prefix}</div>}
            <Input {...props}/>
            {this.props.suffix && <div data-hook="input-suffix">{suffix}</div>}
        </div>);
    }
}
