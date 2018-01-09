import TooltipComponent, {TooltipProps} from './Tooltip';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC';

export {TooltipProps};
export const Tooltip = withClasses(TooltipComponent, styles) as React.ComponentClass<TooltipProps & ThemedComponentProps & WixComponentProps> & {Content, Element};
export default Tooltip;
