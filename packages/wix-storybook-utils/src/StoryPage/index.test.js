import React from 'react';
import Testkit from './testkit';

import Option from '../AutoExample/components/option';

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

  describe('`hiddenProps`', () => {
    it('should filter props from interactive list', () => {
      testkit.when.created({
        metadata: {
          props: {
            hiddenProp: {type: {name: 'string'}},
            visibleProp: {type: {name: 'string'}}
          }
        },
        hiddenProps: ['hiddenProp']
      });

      expect(testkit.get.autoExample().find(Option).length).toEqual(1);
    });
  });

  describe('code example', () => {
    it('should show displayName without HOC', () => {
      const component = ({children}) => <div>{children}</div>; // eslint-disable-line react/prop-types
      component.displayName = 'someHOC(componentName)';

      const IShouldBeTheName = () => null;

      const props = {
        component,
        componentProps: {
          children: <div><IShouldBeTheName/></div>
        },
        exampleProps: {
          children: []
        }
      };

      testkit.when.created(props);
      expect(testkit.get.codeBlock().prop('source')).toEqual(`\`\`\`js
<componentName>
  <div>
    <IShouldBeTheName />
  </div>
</componentName>
\`\`\``);
    });

    it('should not be rendered given `codeExample: false`', () => {
      testkit.when.created({
        component: () => '',
        codeExample: false
      });

      expect(testkit.get.codeBlock().length).toEqual(0);
    });
  });
});
