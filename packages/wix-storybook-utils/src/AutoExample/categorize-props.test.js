/* global describe it expect */

import categorizeProps from './categorize-props';

describe('categorizeProps', () => {
  describe('given nothing', () => {
    it('should return object with `other` property', () => {
      expect(categorizeProps()).toEqual({other: {}});
    });
  });

  describe('given props without matchers', () => {
    it('should return props under `other` property', () => {
      const props = {
        one: 'hello',
        two: 'world'
      };
      expect(categorizeProps(props)).toEqual({other: props});
    });
  });

  describe('given props and matchers', () => {
    it('should return object with shape of matchers + others', () => {
      const props = {
        onClick: 'hello click',
        ariaRequired: 'hello required',
        something: 'else'
      };
      const matchers = {
        accessibility: name => name.startsWith('aria'),
        events: name => name.startsWith('on')
      };

      expect(categorizeProps(props, matchers)).toEqual({
        accessibility: {
          ariaRequired: 'hello required'
        },
        events: {
          onClick: 'hello click'
        },
        other: {
          something: 'else'
        }
      });
    });
  });
});
