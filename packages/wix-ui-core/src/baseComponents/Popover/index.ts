import * as React from 'react';
import PopoverComponent, {PopoverProps, PopoverType} from './Popover';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {PopoverProps};
export const Popover = withClasses(PopoverComponent, styles) as (PopoverType & React.ComponentClass<PopoverProps & ThemedComponentProps & WixComponentProps>) ;
