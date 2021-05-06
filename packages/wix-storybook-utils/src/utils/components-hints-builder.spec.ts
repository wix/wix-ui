import { getComponentsHints } from './components-hints-builder';

describe('getComponentsHints', () => {
  it('should return null if components scope is not provided', () => {
    expect(getComponentsHints()).toBe(null);
  });

  it("should return empty hints object if provided components don't have propTypes", () => {
    const componentsScope = {
      Box: {},
      Text: {},
    };

    expect(getComponentsHints(componentsScope)).toEqual({});
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

    expect(Object.keys(getComponentsHints(componentsScope))).toEqual([
      'Box',
      'Text',
    ]);
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

    const hints = getComponentsHints(componentsScope) as any;

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

    expect(getComponentsHints(componentsScope)).toEqual({
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

    expect(getComponentsHints(componentsScope)).toEqual({
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
      'Card.Divider': {
        attrs: {},
      },
    });
  });
});
