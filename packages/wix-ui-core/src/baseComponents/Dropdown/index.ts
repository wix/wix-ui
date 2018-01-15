import * as React from 'react';
import DropdownComponent, {DropdownProps} from './Dropdown';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {DropdownProps};
export const Dropdown = withClasses(DropdownComponent, styles) as React.ComponentClass<DropdownProps & ThemedComponentProps & WixComponentProps>;
