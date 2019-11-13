/* global Promise describe it expect jest afterEach beforeAll afterAll */

const metadataParser = require('../');
const cista = require('cista');

const rootMock = {
  description: '',
  methods: [],
  props: {},
};

describe('metadataParser()', () => {
  describe('when called without parameters', () => {
    it('should reject with error', () =>
      expect(metadataParser()).rejects.toEqual(
        new Error('ERROR: Missing required `path` argument when calling `readFile`')
      ));
  });

  describe('given existing path', () => {
    describe('with component source', () => {
      describe('that has no useful data', () => {
        it('should return initial object for functional component', () => {
          const fakeFs = cista({
            'simple-functional.js': `import React from "react";
              export default () => <div>Hello World!</div>;`,
          });

          return expect(metadataParser(fakeFs.dir + '/simple-functional.js')).resolves.toEqual(rootMock);
        });

        it('should return initial object for class component', () => {
          const fakeFs = cista({
            'simple-class.js': `import React from "react";
              export default class extends React.Component {
                render() { return <div></div>; }
              }`,
          });

          return expect(metadataParser(fakeFs.dir + '/simple-class.js')).resolves.toEqual({ props: {} });
        });
      });

      describe('that has props', () => {
        it('should return correct object for functional component', () => {
          const fakeFs = cista({
            'functional-with-props.js': `import React from "react";
              import PropTypes from "prop-types";
              const component = () => <div></div>;
              component.propTypes = {
                /** hello comment */
                hello: PropTypes.bool,

                /** goodbye comment */
                goodbye: PropTypes.string.isRequired,

                /** Mr. Deez
                *  Nuts
                *  */
                nuts: PropTypes.oneOf(["deez", "deeez"])
              };
              export default component;
              `,
          });

          return expect(metadataParser(fakeFs.dir + '/functional-with-props.js')).resolves.toEqual({
            description: '',
            methods: [],
            displayName: 'component',
            props: {
              hello: {
                description: 'hello comment',
                required: false,
                type: { name: 'bool' },
              },

              goodbye: {
                description: 'goodbye comment',
                required: true,
                type: { name: 'string' },
              },

              nuts: {
                description: 'Mr. Deez\n Nuts',
                required: false,
                type: {
                  name: 'enum',
                  value: [{ computed: false, value: '"deez"' }, { computed: false, value: '"deeez"' }],
                },
              },
            },
          });
        });

        it('should return correct object for class component', () => {
          const fakeFs = cista({
            'class-with-props.js': `import React from "react";
              import PropTypes from "prop-types";
              export default class Component extends React.Component {
                static propTypes = {
                  /** hello comment */
                  hello: PropTypes.bool,

                  /** goodbye comment */
                  goodbye: PropTypes.string.isRequired,

                  /** Mr. Deez
                  *  Nuts
                  *  */
                  nuts: PropTypes.oneOf(["deez", "deeez"])
                };

                render() {
                  return "";
                }
              }
              `,
          });

          return expect(metadataParser(fakeFs.dir + '/class-with-props.js')).resolves.toEqual({
            description: '',
            methods: [],
            displayName: 'Component',
            props: {
              hello: {
                description: 'hello comment',
                required: false,
                type: { name: 'bool' },
              },

              goodbye: {
                description: 'goodbye comment',
                required: true,
                type: { name: 'string' },
              },

              nuts: {
                description: 'Mr. Deez\n Nuts',
                required: false,
                type: {
                  name: 'enum',
                  value: [{ computed: false, value: '"deez"' }, { computed: false, value: '"deeez"' }],
                },
              },
            },
          });
        });
      });

      describe('that has spread props', () => {
        it('should return correct object for functional component', () => {
          const fakeFs = cista({
            'spread-functional.js': `import React from "react";
              import PropTypes from "prop-types";
              import moreProps from "./more-props.js";
              import evenMoreProps from "./even-more-props.js";
              const component = () => <div>Hello World!</div>;
              component.propTypes = {
                  ...moreProps.propTypes,
                  ...evenMoreProps,
                  shapeProp: PropTypes.shape({
                    stringProp: PropTypes.string,
                    funcProp: PropTypes.func.isRequired
                  })
              };
              export default component;
              `,

            'more-props.js': `
              import React from "react";
              import PropTypes from "prop-types";
              const component = ({propFromAnotherFile}) => <div></div>;
              component.propTypes = {
                propFromAnotherFile: PropTypes.bool.isRequired
              };
              export default component;
              `,

            'even-more-props.js': `import React from "react";
              import PropTypes from "prop-types";
              import goDeeperProps from "./go-deeper-props.js";
              const component = ({ propFromYetAnotherFile }) => <div></div>;
              component.propTypes = {
                ...goDeeperProps.propTypes,
                propFromYetAnotherFile: PropTypes.string.isRequired
              };
              export default component;
              `,

            'go-deeper-props.js': `import React from "react";
              import PropTypes from "prop-types";
              const component = ({ propFromDeep }) => <div></div>;
              component.propTypes = {
                propFromDeep: PropTypes.string.isRequired
              };
              export default component;
              `,
          });

          return expect(metadataParser(fakeFs.dir + '/spread-functional.js')).resolves.toEqual({
            ...rootMock,
            displayName: 'component',
            props: {
              propFromAnotherFile: {
                description: '',
                type: {
                  name: 'bool',
                },
                required: true,
              },
              propFromYetAnotherFile: {
                description: '',
                type: {
                  name: 'string',
                },
                required: true,
              },
              shapeProp: {
                description: '',
                required: false,
                type: {
                  name: 'shape',
                  value: {
                    funcProp: {
                      name: 'func',
                      required: true,
                    },
                    stringProp: {
                      name: 'string',
                      required: false,
                    },
                  },
                },
              },
              propFromDeep: {
                description: '',
                type: {
                  name: 'string',
                },
                required: true,
              },
            },
          });
        });
      });
    });

    describe('with `export default from ...`', () => {
      it('should follow that export', () => {
        const fakeFs = cista({
          'index.js': 'export {default} from "./component.js";',

          'component.js': `/** I am the one who props */
             const component = () => <div/>;
             export default component;`,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          displayName: 'component',
          description: 'I am the one who props',
        });
      });

      it('should follow many nested exports', () => {
        const fakeFs = cista({
          'index.js': 'export {default} from "./sibling.js"',
          'sibling.js': 'export {default} from "./nested/deep/component.js"',
          'nested/deep/component.js': 'export {default} from "../component.js"',
          'nested/component.js':
            '/** You got me */\n              const component = () => <div/>;\n              export default component;',
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          displayName: 'component',
          description: 'You got me',
        });
      });

      it('should follow a mix of proxy modules and components', () => {
        const fakeFs = cista({
          'MyComponent/index.js': 'export {default} from "./implementation";',
          'MyComponent/implementation.js':
            'import React from "react";\n              import Proxied from "../AnotherComponent/implementation";\n              export default class MyComponent extends React.Component {\n                static propTypes = {\n                  ...Proxied.propTypes\n                }\n                render() {\n                  return (<div></div>);\n                }\n              }\n              ',
          'AnotherComponent/implementation.js':
            'import PropTypes from "prop-types";\n              const component = () => <div/>;\n              component.propTypes = {\n                exportedProp: PropTypes.string.isRequired\n              };\n              export default component;',
        });

        return expect(metadataParser(fakeFs.dir + '/MyComponent/index.js')).resolves.toEqual({
          description: '',
          displayName: 'MyComponent',
          methods: [],
          props: {
            exportedProp: {
              description: '',
              required: true,
              type: {
                name: 'string',
              },
            },
          },
        });
      });
    });

    describe("with `module.exports = require('path')`", () => {
      it('should follow that export', () => {
        const fakeFs = cista({
          'index.js': 'module.exports = require("./component")',
          'component.js': `
            import React from "react";
            /** looking for you */
            const component = () => <div/>;
            export default component;
          `,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          displayName: 'component',
          description: 'looking for you',
        });
      });

      it('should remove `dist/` from path', () => {
        // TODO: yeah well removing `dist` is quite an assumption
        const fakeFs = cista({
          'index.js': 'module.exports = require("./dist/src/component")',

          'src/component.jsx': `
            import React from "react";
            /** what a lovely day */
            const component = () => <div/>;
            export default component;
          `,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          displayName: 'component',
          description: 'what a lovely day',
        });
      });
    });

    describe('with non `index.js` entry', () => {
      it('should resolve entry file correctly', () => {
        const fakeFs = cista({
          'index.js': 'export {default} from "./Component"',
          'Component.jsx': `import React from "react";
            /** jsx component */
            export default () => <div/>;`,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          description: 'jsx component',
        });
      });
    });

    describe('with source containing decorators', () => {
      it('should not fail parsing', () => {
        const fakeFs = cista({
          'index.js': `import React from "react";
            /** jsx component */
            @Inject("formState")
            @Observer
            class ILikeTurtles extends React.Component {}
            export default ILikeTurtles;`,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          description: 'jsx component',
          displayName: 'ILikeTurtles',
        });
      });
    });

    describe('with source containing dynamic imports', () => {
      it('should not fail parsing', () => {
        const fakeFs = cista({
          'index.js': `import React from "react";
            /** component description */
            class ILikeWaffles extends React.Component {}
            ILikeWaffles.compoundComponent = () => import("./path");
            export default ILikeWaffles;`,
        });

        return expect(metadataParser(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...rootMock,
          description: 'component description',
          displayName: 'ILikeWaffles',
          methods: [expect.objectContaining({ name: 'compoundComponent' })],
        });
      });
    });

    describe('with jsdoc descriptions', () => {
      it('should add `tags` property to prop with jsdoc annotations', () => {
        const fakeFs = cista({
          'with-jsdoc.js': `import React from "react";
              import PropTypes from "prop-types";
              /** component description */
              const deprecationIsMyMedication = () => <div></div>;
              deprecationIsMyMedication.propTypes = {
                /** deprecated prop comment
                 * @deprecated
                 * */
                deprecatedProp: PropTypes.bool,

                /** deprecated with text
                 * @deprecated since forever
                 * */
                deprecatedWithText: PropTypes.string.isRequired,
              };
              export default deprecationIsMyMedication;
              `,
        });

        return expect(metadataParser(fakeFs.dir + '/with-jsdoc.js')).resolves.toEqual({
          description: 'component description',
          displayName: 'deprecationIsMyMedication',
          methods: [],
          props: {
            deprecatedProp: {
              description: 'deprecated prop comment',
              required: false,
              type: {
                name: 'bool',
              },
              tags: [{ title: 'deprecated', description: null }],
            },
            deprecatedWithText: {
              description: 'deprecated with text',
              required: true,
              type: {
                name: 'string',
              },
              tags: [{ title: 'deprecated', description: 'since forever' }],
            },
          },
        });
      });
    });

    describe('with @autodocs-component annotation', () => {
      it('should force props parsing', () => {
        const fakeFs = cista({
          'with-annotation.js': `import React from "react";
              import PropTypes from "prop-types";
              export const weirdComponent /** @autodocs-component */ = () => () => () => {};
              weirdComponent.propTypes = {
                awwyis: PropTypes.bool,
                breadcrumbs: PropTypes.string.isRequired,
              };
              `,
        });

        return expect(metadataParser(fakeFs.dir + '/with-annotation.js')).resolves.toEqual({
          description: '',
          displayName: 'weirdComponent',
          methods: [],
          props: {
            awwyis: {
              description: '',
              required: false,
              type: {
                name: 'bool',
              },
            },
            breadcrumbs: {
              description: '',
              required: true,
              type: {
                name: 'string',
              },
            },
          },
        });
      });
    });
  });

  describe('given component importing from other modules', () => {
    it('should resolve node_modules path', () => {
      const fakeFs = cista({
        'MyComponent/index.js': `export {default} from "wix-ui-backoffice/Component"`,
        'node_modules/wix-ui-backoffice/Component/index.js': `export {default} from "./Component.js"`,
        'node_modules/wix-ui-backoffice/Component/Component.js': `import React from "react";\n                /** backoffice component */\n                export default () => <div/>;`,
      });

      return expect(metadataParser(fakeFs.dir + '/MyComponent/index.js')).resolves.toEqual({
        ...rootMock,
        description: 'backoffice component',
      });
    });

    it('should resolve deep node_modules path', () => {
      const fakeFs = cista({
        'MyComponent/index.js': `export {default} from "wix-ui-backoffice/Component"`,

        'node_modules/wix-ui-backoffice/Component/index.js': `export {default} from "../src/components/Component"`,

        'node_modules/wix-ui-backoffice/src/components/Component.js': `import React from "react";
          import CoreProps from "wix-ui-core/Component";
          /** backoffice component */
          const component = () => <div/>;
          component.propTypes = {
            ...CoreProps
          }
          export default component;`,

        'node_modules/wix-ui-backoffice/node_modules/wix-ui-core/Component.jsx': `import React from "react"
            import PropTypes from "prop-types";
          const component = () => <div/>;
          component.propTypes = {
            /** hello from core */
            coreProp: PropTypes.func
          };
          export default component;`,
      });

      return expect(metadataParser(fakeFs.dir + '/MyComponent/index.js')).resolves.toEqual({
        description: 'backoffice component',
        methods: [],
        displayName: 'component',
        props: {
          coreProp: {
            required: false,
            description: 'hello from core',
            type: { name: 'func' },
          },
        },
      });
    });
  });
});
