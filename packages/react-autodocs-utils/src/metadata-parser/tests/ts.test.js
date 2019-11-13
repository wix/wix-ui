/* global describe it expect */

const { join: pathJoin } = require('path');
const metadataParser = require('../');

const fixturePath = path => pathJoin(__dirname, '__fixtures__', path);

describe('given component written in typescript', () => {
  it('should parse metadata', () =>
    expect(metadataParser(fixturePath('simple.ts'))).resolves.toEqual({
      description: 'This is the component',
      displayName: 'Component',
      methods: [],
      props: {
        text: expect.objectContaining({
          name: 'text',
          defaultValue: null,
          required: false,
          description: 'this is a text prop',
          type: { name: 'string' },
        }),
      },
    }));

  it('should parse metadata', () =>
    expect(metadataParser(fixturePath('heading.tsx'))).resolves.toEqual({
      description: '',
      displayName: 'Heading',
      methods: [],
      props: {
        skin: expect.objectContaining({
          name: 'skin',
          defaultValue: { value: 'dark' },
          required: false,
          description: 'skin color of the heading',
          type: { name: 'Skin' },
        }),
        appearance: expect.objectContaining({
          name: 'appearance',
          defaultValue: { value: 'H1' },
          required: false,
          description: 'typography of the heading',
          type: { name: 'Appearance' },
        }),
      },
    }));
});
