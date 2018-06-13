/* global describe it expect */

import categorizeProps from './categorize-props';

describe('categorizeProps', () => {
  describe('given nothing', () => {
    it('should return empty object', () => {
      expect(categorizeProps()).toEqual({});
    });
  });

  describe('given props without category definitions', () => {
    it('should return props under `primary` property', () => {
      const props = {
        one: 'hello',
        two: 'world'
      };
      expect(categorizeProps(props)).toEqual({primary: expect.objectContaining({props})});
    });
  });

  describe('given props and category definitions', () => {
    it('should return object with shape of matchers', () => {
      const props = {
        onClick: 'hello click',
        onBlur: 'hello blur',
        ariaRequired: 'hello required',
        something: 'else'
      };
      const categories = {
        accessibility: {matcher: name => name.startsWith('aria')},
        events: {matcher: name => name.startsWith('on')}
      };

      expect(categorizeProps(props, categories)).toEqual({
        accessibility: expect.objectContaining({
          props: {
            ariaRequired: 'hello required'
          }
        }),
        events: expect.objectContaining({
          props: {
            onClick: 'hello click',
            onBlur: 'hello blur'
          }
        }),
        primary: expect.objectContaining({
          props: {
            something: 'else'
          }
        })
      });
    });

    it('should return object including only existing categories', () => {
      const props = {
        // 1. this do not include any aria nor event properties
        something: 'else'
      };

      const categories = {
        accessibility: {matcher: name => name.startsWith('aria')},
        events: {matcher: name => name.startsWith('on')}
      };

      expect(categorizeProps(props, categories)).toEqual({
        // 2. this should not include events nor accessibility properties
        primary: {
          props: {something: 'else'}
        }
      });
    });

    it('should add props property and keep original category definition structure', () => {
      const props = {
        hello: 'world'
      };

      const categories = {
        whatever: {
          matcher: () => true,
          hello: 'here too',
          i: 'should remain'
        }
      };

      expect(categorizeProps(props, categories)).toEqual({
        whatever: {
          ...categories.whatever,
          props: {hello: 'world'}
        }
      });
    });

    it('should categorize props in given order', () => {
      const props = {
        hello: 'is it me',
        you: 'are looking for'
      };

      const matcher = () => true;

      const categories = {
        first: {order: 1, matcher},
        realFirst: {order: 0, matcher}
      };

      expect(categorizeProps(props, categories)).toEqual({
        realFirst: expect.objectContaining({
          props: {hello: 'is it me', you: 'are looking for'}
        })
      });
    });
  });
});
