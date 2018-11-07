import { AutoTestkitDriver } from './drivers';

describe('AutoTestkit', () => {
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

  const docs = new AutoTestkitDriver().when.created(component);

  it('has markdown-body class on root element', () => {
    expect(docs.get.rootClass()).toBe('markdown-body');
  });

  describe('heading', () => {
    it('renders', () => {
      expect(docs.get.heading()).toBe(`${component.displayName} Testkits`);
    });

    it('is h1 tag', () => {
      expect(docs.get.tag('heading')).toBe('h1');
    });
  });

  it('has driver documentation tables', () => {
    expect(docs.get.driverAt(0).get.name()).toBe(component.drivers[0].file);
  });
});
