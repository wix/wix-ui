import { match, matchComponent } from './match-component';

const trees = {
  simple: { a: '' },
  two: { a: '', b: '' },
  three: { a: '', b: '', c: '' },

  nest: { a: { b: '', c: '' }, d: '' },
  nestTwo: { a: '', b: { c: '', d: '' }, e: '' },
  nestThree: { a: { c: '' }, d: '' },
  nestFour: {
    a: '',
    b: { d: '' },
  },

  component: {
    'index.js': '',
    'component.js': '',
  },

  components: {
    a: {
      'component.js': '',
      'file.js': '',
    },
    b: {
      'component.js': '',
    },
  },

  componentsNested: {
    a: {
      'component.js': '',
      'file.js': '',
      folder: {
        'component.js': '',
      },
    },

    b: {
      'component.js': '',
    },
  },

  componentsDeeplyNested: {
    a: {
      'component.js': '',
      'file.js': '',
      folder: {
        'component.js': '',
        deep: {
          'component.js': '',
        },
      },
    },

    b: {
      'component.js': '',
    },
  },

  matchTestCase: {
    'component.js': '',
    deep: {
      'component.js': '',
    },
  },

  componentsDeeplyNested2: {
    a: {
      'component.js': '',
      'file.js': '',
      folder: {
        'component.js': '',
        'file.js': '',
        deep: {
          'component.js': '',
        },
      },
    },
    b: {
      'component.js': '',
      'file.js': '',
    },
  },

  matchWithGlobs: {
    component: {
      'component.js': '',
    },
    component2: {
      'component.jsx': '',
      nested: {
        'index.js': '',
        'component.tsx': '',
      },
    },
    unmatched: {
      'nonponent.js': '',
    },
  },
};

const globs = {
  simple: { a: '' },
  two: { a: '', b: '' },
  three: { a: '', b: '', c: '' },

  nest: { a: { b: '' } },
  nestTwo: { a: '', b: { c: '' } },
  nestFour: {
    a: '',
    b: { c: { d: '' } },
  },

  component: {
    'component.js': '',
  },

  componentWithFile: {
    'component.js': '',
    'file.js': '',
  },

  withGlobs: {
    'component.*': '',
  },

  wsrGlob: {
    'index.js': '',
    'Component.js': '',
    docs: {
      'index.story.js': '',
    },
  },
};

describe('match tree', () => {
  describe('given nothing', () => {
    it('should return null', () => {
      expect(match()).toEqual({});
    });
  });

  describe('given only tree', () => {
    it('should return null', () => {
      expect(match({ tree: trees.simple })).toEqual({});
    });
  });

  describe('given only glob', () => {
    it('should return null', () => {
      expect(match({ glob: globs.simple })).toEqual({});
    });
  });

  describe('given tree and glob', () => {
    describe('when tree matches glob', () => {
      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.simple,
            glob: globs.simple,
          }),
        ).toEqual({
          a: {},
        });
      });

      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.two,
            glob: globs.two,
          }),
        ).toEqual({
          a: {},
          b: {},
        });
      });

      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.three,
            glob: globs.three,
          }),
        ).toEqual({
          a: {},
          b: {},
          c: {},
        });
      });

      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.nest,
            glob: globs.nest,
          }),
        ).toEqual({
          a: {
            b: {},
          },
        });
      });

      it('should return matching glob for nestTwo', () => {
        expect(
          match({
            tree: trees.nestTwo,
            glob: globs.nestTwo,
          }),
        ).toEqual({
          a: {},
          b: {
            c: {},
          },
        });
      });

      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.three,
            glob: globs.simple,
          }),
        ).toEqual({
          a: {},
        });
      });

      it('should return matching glob', () => {
        expect(
          match({
            tree: trees.component,
            glob: globs.component,
          }),
        ).toEqual({
          'component.js': {},
        });
      });

      it('should return matching glob', () => {
        const tree = {
          'index.js': '',
          docs: {
            'index.story.js': '',
          },
          file: '',
          folder: {},
        };

        const glob = {
          docs: {
            'index.story.js': '',
          },
          'index.js': '',
        };

        expect(match({ tree, glob })).toEqual({
          'index.js': {},
          docs: {
            'index.story.js': {},
          },
        });
      });
    });

    describe('when tree does not match glob', () => {
      it('should return null', () => {
        expect(
          match({
            tree: trees.simple,
            glob: globs.two,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: trees.two,
            glob: globs.three,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: trees.nestThree,
            glob: globs.three,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: trees.nestThree,
            glob: globs.nest,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: trees.matchTestCase,
            glob: globs.componentWithFile,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: trees.nestFour,
            glob: globs.nestFour,
          }),
        ).toEqual(null);
      });

      it('should return null', () => {
        expect(
          match({
            tree: { mixins: { 'layout.scss': '' } },
            glob: globs.wsrGlob,
          }),
        ).toEqual(null);
      });
    });
  });
});

describe('matchComponent', () => {
  it('should return matching glob', () => {
    expect(
      matchComponent({
        tree: trees.components,
        glob: globs.component,
      }),
    ).toEqual({
      a: {
        path: 'a',
      },
      b: { path: 'b' },
    });
  });

  it('should return matching glob for nested', () => {
    expect(
      matchComponent({
        tree: trees.componentsNested,
        glob: globs.component,
      }),
    ).toEqual({
      a: {
        path: 'a',
        children: {
          folder: { path: 'a/folder' },
        },
      },
      b: { path: 'b' },
    });
  });

  it('should return matching glob for deeply nested', () => {
    expect(
      matchComponent({
        tree: trees.componentsDeeplyNested,
        glob: globs.component,
      }),
    ).toEqual({
      a: {
        path: 'a',
        children: {
          folder: {
            path: 'a/folder',
            children: {
              deep: {
                path: 'a/folder/deep',
              },
            },
          },
        },
      },
      b: { path: 'b' },
    });
  });

  it('should return matching glob for deeply nested2', () => {
    expect(
      matchComponent({
        tree: trees.componentsDeeplyNested2,
        glob: globs.componentWithFile,
      }),
    ).toEqual({
      a: {
        path: 'a',
        children: {
          folder: { path: 'a/folder' },
        },
      },
      b: { path: 'b' },
    });
  });

  it('should return small matching glob for deeply nested', () => {
    expect(
      matchComponent({
        tree: trees.componentsDeeplyNested,
        glob: globs.componentWithFile,
      }),
    ).toEqual({
      a: { path: 'a' },
    });
  });

  it('should return object for globs', () => {
    expect(
      matchComponent({
        tree: trees.matchWithGlobs,
        glob: globs.withGlobs,
      }),
    ).toEqual({
      component: { path: 'component' },
      component2: {
        path: 'component2',
        children: {
          nested: {
            path: 'component2/nested',
          },
        },
      },
    });
  });

  it('should work with real case', () => {
    const tree = {
      child: {
        'index.js': '',
        docs: { 'index.story.ts': '' },
      },
      docs: { 'index.story.js': '' },
      'index.js': '',
    };

    const glob = {
      docs: {
        'index.story.*s': '',
      },
      'index.js': '',
    };

    expect(matchComponent({ tree, glob })).toEqual({
      child: {
        path: 'child',
      },
    });
  });

  it('should work with real case 2', () => {
    const tree = {
      child: {
        'index.js': '',
        docs: { 'index.story.ts': '' },
        file: '',
        folder: {},
      },
      docs: { 'index.story.js': '' },
      'index.js': '',
    };

    const glob = {
      docs: {
        'index.story.*s': '',
      },
      'index.js': '',
    };

    expect(matchComponent({ tree, glob })).toEqual({
      child: {
        path: 'child',
      },
    });
  });

  it('should return empty object', () => {
    expect(
      matchComponent({
        tree: { mixins: { 'layout.scss': '' } },
        glob: globs.wsrGlob,
      }),
    ).toEqual({});
  });
});
