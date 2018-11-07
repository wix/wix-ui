import React from 'react';
import AutoExample from '.';
import Testkit from './testkit';

describe('AutoExample', () => {
  describe('options list', () => {
    it('should display two options', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            stringProp: { type: { name: 'string' } },
            functionProp: { type: { name: 'func' } },
          },
        },
        componentProps: {
          stringProp: '',
        },
        exampleProps: {
          functionProp: () => '',
        },
      });
      const options = testkit.get.options();
      expect(options.at(0).prop('label')).toBe('stringProp');
      expect(options.at(1).prop('label')).toBe('functionProp');
    });

    it('should categorize aria props', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            'aria-label': { type: { name: 'string' } },
            'Aria-required': { type: { name: 'bool' } },
            ariaDisabled: { type: { name: 'bool' } },
            'anything-else': { type: { name: 'string' } },
          },
        },
        componentProps: {
          'anything-else': 'test',
        },
      });

      // expeting only 1 because others should be collapsed
      expect(testkit.get.options()).toHaveLength(1);
    });
  });

  describe('exampleProps', () => {
    it('should display "Interaction preview" for function type', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        parsedSource: {
          displayName: 'TestComponent',
          props: {
            functionProp: { type: { name: 'func' } },
          },
        },
        exampleProps: {
          functionProp: () => {},
        },
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
            someProp: {
              type: { name: 'unknown type name, something really obscure' },
            },
          },
        },
        exampleProps: {
          someProp: [1, 2, 3, 4, 5],
        },
      });

      const option = testkit.get.options().props();
      expect(option.children).not.toBe(null);
    });
  });

  describe('codeExample', () => {
    it('should not render when `false`', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        codeExample: false,
      });
      expect(testkit.get.codeBlock()).toHaveLength(0);
    });
  });

  describe('componentWrapper', () => {
    it('should render wrapper when given', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created({
        componentWrapper: ({ component }) => (
          <div className="classname">{component}</div>
        ),
      });
      expect(testkit.get.exists('[data-hook*="wrapper"]')).toBeTruthy();
    });
    it('should not render wrapper when not given', () => {
      const testkit = new Testkit(AutoExample);
      testkit.when.created();
      expect(testkit.get.exists('[data-hook*="wrapper"]')).toBeFalsy();
    });
  });
});
