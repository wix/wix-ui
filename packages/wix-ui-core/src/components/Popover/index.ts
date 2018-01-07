import PopoverComponent, {PopoverProps, PopoverType, SharedPopoverProps} from './Popover';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC/index';

export {PopoverProps};
export const Popover = withClasses(PopoverComponent, styles) as (PopoverType & React.ComponentClass<PopoverProps & SharedPopoverProps & ThemedComponentProps & WixComponentProps>) ;
export default Popover;
