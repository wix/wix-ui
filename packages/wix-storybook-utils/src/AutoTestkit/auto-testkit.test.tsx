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
  });
});
