import { createAutoTestkitDriver } from './drivers';

describe('AutoTestkit', () => {
  const driver = createAutoTestkitDriver();

  describe('without error', () => {
    const component = {
      displayName: 'component',
      drivers: [
        {
          file: 'component.driver.js',
          descriptor: [
            {
              name: 'click',
              args: [],
              type: 'function',
            },
          ],
        },
        {
          file: 'component.protractor.driver.js',
          descriptor: [
            {
              name: 'click',
              args: [],
              type: 'function',
            },
          ],
        },
        {
          file: 'component.puppeteer.driver.js',
          descriptor: [
            {
              name: 'click',
              args: [],
              type: 'function',
            },
          ],
        },
        {
          file: 'component.unknown.driver.js',
          descriptor: [
            {
              name: 'click',
              args: [],
              type: 'function',
            },
          ],
        },
      ],
    };

    beforeEach(() => driver.create({ component }));

    it('has markdown-body class on root element', () => {
      expect(driver.get.rootClass()).toBe('markdown-body');
    });

    describe('heading', () => {
      it('renders', () => {
        expect(driver.get.heading()).toBe(`${component.displayName} Testkits`);
      });

      it('is h1 tag', () => {
        expect(driver.get.tag('heading')).toBe('h1');
      });
    });

    it('has driver documentation tables', () => {
      expect(driver.get.driverAt(0).get.name()).toBe(component.drivers[0].file);
    });

    describe('code examples', () => {
      it('renders enzyme example', () => {
        expect(driver.get.codeExampleAt(0).get.type()).toEqual('enzyme');
      });

      it('renders protractor example', () => {
        expect(driver.get.codeExampleAt(1).get.type()).toEqual('protractor');
      });

      it('renders puppeteer example', () => {
        expect(driver.get.codeExampleAt(2).get.type()).toEqual('puppeteer');
      });

      it('defaults to enzyme example for unknown type', () => {
        expect(driver.get.codeExampleAt(3).get.type()).toEqual('enzyme');
      });
    });
  });
});
