import { createAutoTestkitDriver } from './drivers';

describe('AutoTestkit', () => {
  const driver = createAutoTestkitDriver();

  describe('without error', () => {
    const metadata = {
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
        {
          file: 'component.uni.driver.js',
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

    const makeTestkitTemplate = platform =>
      `import { <%= utils.toCamel(component.displayName) %>TestkitFactory } from 'wix-style-react/dist${platform}';`;

    const storyConfig = {
      config: {
        testkitsWarning: 'Hey there, testkits warning',
        testkits: {
          vanilla: {
            template: makeTestkitTemplate(''),
          },
          enzyme: {
            template: makeTestkitTemplate('/enzyme'),
          },
          puppeteer: {
            template: makeTestkitTemplate('/puppeteer'),
          },
          protractor: {
            template: makeTestkitTemplate('/protractor'),
          },
        },
      },
    };

    beforeEach(() => driver.create({ metadata, storyConfig }));

    it('has markdown-body class on root element', () => {
      expect(driver.get.rootClass()).toBe('markdown-body');
    });

    describe('heading', () => {
      it('should display correct text', () => {
        expect(driver.get.heading()).toBe(`${metadata.displayName} Testkits`);
      });

      it('should be h1 tag', () => {
        expect(driver.get.tag('heading')).toBe('h1');
      });

      it('should display warning', () => {
        expect(driver.get.warning()).toEqual(
          storyConfig.config.testkitsWarning,
        );
      });
    });

    it('should have correct testkit names', () => {
      expect(driver.get.driverAt(0).get.name()).toBe('ReactTestUtils Testkit');
      expect(driver.get.driverAt(1).get.name()).toBe('Protractor Testkit');
      expect(driver.get.driverAt(2).get.name()).toBe('Puppeteer Testkit');
      expect(driver.get.driverAt(3).get.name()).toBe('Testkit');
      expect(driver.get.driverAt(4).get.name()).toBe('UniDriver Testkit');
    });

    it('should have correct import example code', () => {
      expect(driver.get.driverAt(0).get.importCode()).toMatch(
        `import { componentTestkitFactory } from 'wix-style-react/dist'`,
      );
    });
  });

  describe('with error', () => {
    const metadata = {
      displayName: 'component',
      drivers: [
        {
          file: 'component.driver.js',
          error: 'Oh no!',
        },
      ],
    };

    beforeEach(() => driver.create({ metadata }));

    it('should not render documentation table', () => {
      expect(driver.get.driverAt(0)).toBe(null);
    });
  });
});
