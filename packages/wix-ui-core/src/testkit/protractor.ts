import {protractorTestkitFactoryCreator} from 'wix-ui-test-utils';

import inputDriverFactory from '../components/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);

import {buttonDriverFactory} from '../components/Button/Button.protractor.driver';
export const buttonTestkitFactory = protractorTestkitFactoryCreator(buttonDriverFactory);
