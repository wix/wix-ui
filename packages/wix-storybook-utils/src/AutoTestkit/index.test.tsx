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

    beforeEach(() => driver.create({ metadata }));

    it('has markdown-body class on root element', () => {
      expect(driver.get.rootClass()).toBe('markdown-body');
    });

    describe('heading', () => {
      it('renders', () => {
        expect(driver.get.heading()).toBe(`${metadata.displayName} Testkits`);
      });

      it('is h1 tag', () => {
        expect(driver.get.tag('heading')).toBe('h1');
      });
    });

    it('has correct testkit names', () => {
      expect(driver.get.driverAt(0).get.name()).toBe('ReactTestUtils Testkit');
      expect(driver.get.driverAt(1).get.name()).toBe('Protractor Testkit');
      expect(driver.get.driverAt(2).get.name()).toBe('Puppeteer Testkit');
      expect(driver.get.driverAt(3).get.name()).toBe('Testkit');
      expect(driver.get.driverAt(4).get.name()).toBe('UniDriver Testkit');
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
