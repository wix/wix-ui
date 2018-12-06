export interface Example {
  type: 'enzyme' | 'protractor' | 'puppeteer';
  pattern?: RegExp;
  generate(params: ExampleGeneratorParams): String;
}

interface ExampleGeneratorParams {
  capitalizedTestkitFactoryName: string;
  componentLC: string;
  componentName: string;
  driverName: string;
  pathToTestkit: string;
  testkitFactoryName: string;
}
