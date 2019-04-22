import { UnidriverExample } from '../../../typings/code-example';
import EnzymeExample from './enzyme';
import ProtractorExample from './protractor';
import PuppeteerExample from './puppeteer';
import ReactTestUtilsExample from './react';

const templates: UnidriverExample[] = [
  {
    title: 'Puppeteer Example',
    type: 'puppeteer',
    generate: PuppeteerExample,
  },
  {
    title: 'Protractor Example',
    type: 'protractor',
    generate: ProtractorExample,
  },
  {
    title: 'Enzyme Example',
    type: 'enzyme',
    generate: EnzymeExample,
  },
  {
    title: 'ReactTestUtils Example',
    type: 'react',
    generate: ReactTestUtilsExample,
  },
];

export default templates;
