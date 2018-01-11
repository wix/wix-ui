import InputWithAffixesComponent, {InputWithAffixesProps} from './InputWithAffixes';
import {styles} from './styles';
import {withClasses} from 'wix-ui-jss';
import * as React from 'react';
import {ThemedComponentProps} from 'wix-ui-jss';
import {WixComponentProps} from '../../createHOC';

export {InputWithAffixesProps};
export const InputWithAffixes = withClasses(InputWithAffixesComponent, styles) as React.ComponentClass<InputWithAffixesProps & ThemedComponentProps & WixComponentProps>;
export default InputWithAffixes;
