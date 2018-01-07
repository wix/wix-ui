import SliderComponent, {SliderProps} from './Slider';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import {ThemedComponentProps} from 'wix-ui-jss';
import * as React from 'react';
import {WixComponentProps} from '../../createHOC/index';

export {SliderProps};
export const Slider = withClasses(SliderComponent, styles) as React.ComponentClass<SliderProps & ThemedComponentProps & WixComponentProps>;
export default Slider;
