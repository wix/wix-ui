import InputComponent, {InputProps} from './Input';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC/index';

export {InputProps};
export const Input = withClasses(InputComponent, styles) as React.ComponentClass<InputProps & ThemedComponentProps & WixComponentProps>;
export default Input;
