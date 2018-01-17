import * as React from 'react';
import InputComponent, {InputProps} from './Input';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {InputProps};
export const Input = withClasses(InputComponent, styles) as React.ComponentClass<InputProps & ThemedComponentProps & WixComponentProps>;
