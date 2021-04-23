import { getHints } from './hints-builder';

describe('getHints', () => {
  it('should return null if components scope is not provided', () => {
    expect(getHints()).toBe(null);
  });

  it("should return empty hints object if provided components don't have propTypes", () => {
    const componentsScope = {
      Box: {},
      Text: {},
    };

    expect(getHints(componentsScope)).toEqual({});
  });
  it('sort components', () => {
    const componentsScope = {
      Text: {
        propTypes: {
          color: {},
        },
      },
      Box: {
        propTypes: {
          color: {},
        },
      },
    };

    expect(Object.keys(getHints(componentsScope))).toEqual(['Box', 'Text']);
  });

  it('sort attributes', () => {
    const componentsScope = {
      Box: {
        propTypes: {
          verticalAlign: {
            type: {
              name: 'oneOf',
              value: ['top', 'middle', 'bottom', 'space-between'],
            },
          },
          color: {
            type: { name: 'string' },
          },
          size: {
            type: { name: 'oneOf', value: ['medium', 'large'] },
          },
        },
      },
    };

    const hints = getHints(componentsScope) as any;

    expect(Object.keys(hints.Box.attrs)).toEqual([
      'color',
      'size',
      'verticalAlign',
    ]);
  });

  it('should parse oneOf type props, but omit className and children props', () => {
    const componentsScope = {
      Box: {
        propTypes: {
          children: {
            type: { name: 'node' },
          },
          className: {
            type: { name: 'string' },
          },
          verticalAlign: {
            type: {
              name: 'oneOf',
              value: ['top', 'middle', 'bottom', 'space-between'],
            },
          },
          color: {
            type: { name: 'string' },
          },
        },
      },
    };

    expect(getHints(componentsScope)).toEqual({
      Box: {
        attrs: {
          color: null,
          verticalAlign: ['top', 'middle', 'bottom', 'space-between'],
        },
      },
    });
  });

  it('should parse compound components props', () => {
    const componentsScope = {
      Card: {
        propTypes: {
          hideOverflow: {
            type: { name: 'bool' },
          },
          dataHook: { type: { name: 'string' } },
        },
        Content: {
          propTypes: {
            size: {
              type: {
                name: 'oneOf',
                value: ['medium', 'large'],
              },
            },
          },
        },
        Divider: {
          displayName: 'Divider',
        },
        displayName: 'Card',
      },
    };

    expect(getHints(componentsScope)).toEqual({
      Card: {
        attrs: {
          hideOverflow: null,
          dataHook: null,
        },
      },
      'Card.Content': {
        attrs: {
          size: ['medium', 'large'],
        },
      },
    });
  });
});
