import AutoExample from './';
import Testkit from './testkit';

describe('AutoExample', () => {
  describe('options list', () => {
    it('should display two options', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            stringProp: {type: {name: 'string'}},
            functionProp: {type: {name: 'func'}}
          }
        },
        componentProps: {
          stringProp: ''
        },
        exampleProps: {
          functionProp: () => ''
        }
      });
      const [prop1, prop2] = testkit.get.options();

      expect(prop1.props.label).toBe('stringProp');
      expect(prop2.props.label).toBe('functionProp');
    });

    it('should categorize aria props', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            'aria-label': {type: {name: 'string'}},
            'Aria-required': {type: {name: 'bool'}},
            ariaDisabled: {type: {name: 'bool'}},
            'anything-else': {type: {name: 'string'}}
          }
        },
        componentProps: {
          'anything-else': 'test'
        }
      });

      // expeting only 1 because others should be collapsed
      expect(testkit.get.options().length).toEqual(1);
    });
  });

  describe('exampleProps', () => {
    it('should display "Interaction preview" for function type', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            functionProp: {type: {name: 'func'}}
          }
        },
        exampleProps: {
          functionProp: () => {}
        }
      });

      const option = testkit.get.options().props();
      expect(option.children.props.children).toBe('Interaction preview');
    });

    it('should display NodesList regardless of type in parsedSource', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            someProp: {type: {name: 'unknown type name, something really obscure'}}
          }
        },
        exampleProps: {
          someProp: [1, 2, 3, 4, 5]
        }
      });

      const option = testkit.get.options().props();
      expect(option.children).not.toBe(null);
    });
  });

  describe('codeExample', () => {
    it('should not render when `false`', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        codeExample: false
      });
      expect(testkit.get.codeBlock().length).toEqual(0);
    });
  });
});
