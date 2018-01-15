import * as React from 'react';
import InputWithOptionsComponent, {InputWithOptionsProps} from './InputWithOptions';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {InputWithOptionsProps};
export const InputWithOptions = withClasses(InputWithOptionsComponent, styles) as React.ComponentClass<InputWithOptionsProps & ThemedComponentProps & WixComponentProps>;
