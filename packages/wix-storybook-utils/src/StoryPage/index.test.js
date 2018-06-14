import Testkit from './index.testkit';

const testkit = new Testkit();

describe('StoryPage', () => {
  it('should render readme', () => {
    testkit.when.created();
    expect(testkit.get.readme()).toMatch(/componentName/);
  });

  describe('given `exampleImport`', () => {
    it('should render it', () => {
      const exampleImport = 'hello there';
      testkit.when.created({exampleImport});
      expect(testkit.get.import()).toMatch(exampleImport);
    });
  });

  describe('given config with `importFormat`', () => {
    it('should format and render it in story', () => {
      const config = {
        importFormat: 'hey %moduleName, what\'s your name, %moduleName?',
        moduleName: 'dork'

      };
      testkit.when.created({config});
      expect(testkit.get.import()).toMatch('hey dork, what\'s your name, dork?');
    });

    it('should allow any other config name to be used', () => {
      const config = {
        importFormat: 'good %daytime, %person, where is my %thing at?',
        daytime: 'evening',
        person: 'Homer',
        thing: 'money'
      };
      testkit.when.created({config});
      expect(testkit.get.import()).toMatch('good evening, Homer, where is my money at?');
    });

    it('should replace %componentName with metadata.displayName', () => {
      const props = {
        config: {
          importFormat: 'import {%componentName} from \'%moduleName/%componentName\';',
          moduleName: 'wix-ui-core'
        },
        metadata: {
          displayName: 'BesterestestComponent',
          props: {}
        }
      };
      testkit.when.created(props);
      expect(testkit.get.import()).toMatch('import {BesterestestComponent} from \'wix-ui-core/BesterestestComponent\';');
    });
  });

  describe('given explicit displayName', () => {
    it('should show it instead of using one from `metadata`', () => {
      const props = {
        metadata: {
          props: {}
        },
        config: {},
        displayName: 'well hello there'
      };

      testkit.when.created(props);

      expect(testkit.get.readme()).toMatch(/<well hello there\/>/);
      expect(testkit.get.import()).toMatch(/well hello there/);
    });
  });
});
