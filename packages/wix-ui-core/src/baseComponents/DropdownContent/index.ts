import * as React from 'react';
import DropdownContentComponent, {DropdownContentProps} from './DropdownContent';
import {styles} from './styles';
import {withClasses, ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {DropdownContentProps};
export const DropdownContent = withClasses(DropdownContentComponent, styles) as React.ComponentClass<DropdownContentProps & ThemedComponentProps & WixComponentProps>;
export default DropdownContent;
