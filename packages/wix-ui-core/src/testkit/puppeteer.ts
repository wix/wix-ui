import {puppeteerTestkitFactoryCreator} from 'wix-ui-test-utils/puppeteer';

import {labelDriverFactory} from '../components/Label/Label.puppeteer.driver';
export const labelTestkitFactory = puppeteerTestkitFactoryCreator(labelDriverFactory);
