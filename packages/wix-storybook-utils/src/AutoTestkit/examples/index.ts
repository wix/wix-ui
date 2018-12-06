import { Example } from '../../typings/code-example';
import EnzymeExample from './enzyme';
import ProtractorExample from './protractor';
import PuppeteerExample from './puppeteer';

const examples: Example[] = [
  { type: 'puppeteer', pattern: /puppeteer/, generate: PuppeteerExample },
  { type: 'protractor', pattern: /protractor/, generate: ProtractorExample },
  { type: 'enzyme', generate: EnzymeExample },
];

export default examples;
