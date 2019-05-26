import {
  enzymeTestkitFactoryCreator,
  WrapperData,
  enzymeUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/enzyme';

import { inputDriverFactory } from '../components/Input/Input.driver';
export const inputTestkitFactory: (
  obj: WrapperData,
) => any = enzymeTestkitFactoryCreator(inputDriverFactory);

import { myNewComponentDriverFactory } from '../components/MyNewComponent/MyNewComponent.driver';
export const myNewComponentTestkitFactory: (
  obj: WrapperData,
) => any = enzymeUniTestkitFactoryCreator(myNewComponentDriverFactory);
