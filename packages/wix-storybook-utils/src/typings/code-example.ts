export interface Example {
  type: 'enzyme' | 'protractor' | 'puppeteer';
  pattern?: RegExp;
  generate(params: ExampleGeneratorParams): String;
}

export interface UnidriverExample {
  type: 'enzyme' | 'protractor' | 'puppeteer' | 'react';
  title: String;
  pattern?: RegExp;
  generate(params: UnidriverExampleGenerator): String;
}

interface UnidriverExampleGenerator {
  componentName: string;
  pathToTestkit: string;
  testkitFactoryName: string;
}

interface ExampleGeneratorParams {
  capitalizedTestkitFactoryName: string;
  componentLC: string;
  componentName: string;
  driverName: string;
  pathToTestkit: string;
  testkitFactoryName: string;
}
