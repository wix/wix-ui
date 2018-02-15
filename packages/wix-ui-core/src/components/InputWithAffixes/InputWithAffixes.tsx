import * as React from 'react';
import {Input, InputProps} from '../Input';
import {node, Requireable} from 'prop-types';
import style from './InputWithAffixes.st.css';

export interface InputWithAffixesProps extends InputProps {
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
}

/**
 * InputWithAffixes
 */
export class InputWithAffixes extends React.Component<InputWithAffixesProps, {}> {
    static displayName = 'InputWithAffixes';

    static propTypes = {
        /** Prefix */
        prefix: node,
        /** Suffix */
        suffix: node
    };

    render() {
        const {prefix, suffix, ...props} = this.props;
        return (
        <div {...style('root', {}, this.props)}>
            {this.props.prefix && <div data-hook="input-prefix">{prefix}</div>}
            <Input className={style.input} data-hook="input" {...props} />
            {this.props.suffix && <div data-hook="input-suffix">{suffix}</div>}
        </div>);
    }
}
