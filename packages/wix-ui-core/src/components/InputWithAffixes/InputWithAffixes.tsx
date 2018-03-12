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
export const InputWithAffixes: React.SFC<InputWithAffixesProps> = (props: InputWithAffixesProps) => (
  <div {...style('root', {}, props)}>
    {props.prefix && <div data-hook="input-prefix">{props.prefix}</div>}
    <Input {...props} className={style.input} data-hook="input" />
    {props.suffix && <div data-hook="input-suffix">{props.suffix}</div>}
  </div>
);

InputWithAffixes.displayName = 'InputWithAffixes';
InputWithAffixes.propTypes = {
  /** Prefix */
  prefix: node,
  /** Suffix */
  suffix: node
};
