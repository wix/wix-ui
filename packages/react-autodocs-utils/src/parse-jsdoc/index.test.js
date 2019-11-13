/* global Promise */

const parseJSDoc = require('.');

describe('parseJSDoc', () => {
  it('should be defined', () => {
    expect(typeof parseJSDoc).toEqual('function');
  });

  it('should return promise', () => {
    expect(parseJSDoc() instanceof Promise).toEqual(true);
  });

  describe('given object of props', () => {
    it('should resolve with same shape of input object', () => {
      const props = {
        someProp: {
          description: '',
          type: {
            name: 'string',
          },
          required: true,
        },
      };

      return expect(parseJSDoc(props)).resolves.toEqual(props);
    });
  });

  describe('given object of props with descriptions', () => {
    it('should add `tags` to prop object', () => {
      const props = {
        one: {
          description: `@deprecated`,
          type: {
            name: 'string',
          },
          required: true,
        },

        oneWithDescription: {
          description: `@deprecated since forever`,
          type: {
            name: 'string',
          },
          required: true,
        },

        multiple: {
          description: `
hello there
@function multiple
@deprecated
          `,
          type: {
            name: 'function',
          },
          required: true,
        },
      };

      return expect(parseJSDoc(props)).resolves.toEqual(
        expect.objectContaining({
          one: expect.objectContaining({
            tags: [{ description: null, title: 'deprecated' }],
          }),

          oneWithDescription: expect.objectContaining({
            tags: [{ description: 'since forever', title: 'deprecated' }],
          }),

          multiple: expect.objectContaining({
            tags: [
              { description: null, title: 'function', name: 'multiple' },
              { description: null, title: 'deprecated' },
            ],
          }),
        })
      );
    });
  });

  describe('given object of props without descriptions', () => {
    it('should resolve with same shape of input object', () => {
      const props = {
        someProp: {
          type: {
            name: 'string',
          },
          required: true,
        },
      };

      return expect(parseJSDoc(props)).resolves.toEqual(props);
    });
  });
});
