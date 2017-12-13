import {protractorTestkitFactoryCreator} from 'wix-ui-test-utils';

import inputDriverFactory from '../components/Input/Input.protractor.driver';
export const inputTestkitFactory = protractorTestkitFactoryCreator(inputDriverFactory);
