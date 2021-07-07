/* global jest describe it expect beforeEach */

const gatherAll = require('./');
const cista = require('cista');

const componentSourceMock = `
  import PropTypes from "prop-types";
  const component = () => <div/>;
  component.propTypes = { test: PropTypes.string.isRequired };
  export default component;
`;

const metadataMock = {
  description: '',
  methods: [],
  props: {
    test: {
      description: '',
      required: true,
      type: {
        name: 'string',
      },
    },
  },
};

const readmeMock = '# Hello readme!';
const readmeApiMock = '# Hello API!';
const readmeAccessibilityMock = '# Hello Accessiblity!';
const readmeTestkitMock = '# Hello Testkit!';

describe('gatherAll', () => {
  describe('given path argument', () => {
    describe('which is empty folder', () => {
      it('should reject with error', () => {
        const fakeFs = cista({
          'some-path': {},
        });

        return gatherAll(fakeFs.dir + '/some-path').catch(({ message }) => {
          expect(message).toMatch(`Unable to parse component in path "${fakeFs.dir}/some-path", reason:`);
        });
      });
    });

    describe('which is folder with index.js, README.md, README.api.md, README.accessibility.md and README.testkit.md', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'component-folder/index.js': componentSourceMock,
          'component-folder/readme.md': readmeMock,
          'component-folder/readme.api.md': readmeApiMock,
          'component-folder/readme.accessibility.md': readmeAccessibilityMock,
          'component-folder/readme.testkit.md': readmeTestkitMock,
        });

        return expect(gatherAll(fakeFs.dir + '/component-folder')).resolves.toEqual({
          ...metadataMock,
          displayName: 'component',
          readme: readmeMock,
          readmeApi: readmeApiMock,
          readmeAccessibility: readmeAccessibilityMock,
          readmeTestkit: readmeTestkitMock,
          drivers: [],
        });
      });
    });

    describe('which is folder with index.js and some markdowns with various cases', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'component-folder/index.js': componentSourceMock,
          'component-folder/README.md': readmeMock,
          'component-folder/readme.API.md': readmeApiMock,
          'component-folder/readme.accessibility.md': readmeAccessibilityMock,
          'component-folder/README.testkit.md': readmeTestkitMock,
        });

        return expect(gatherAll(fakeFs.dir + '/component-folder')).resolves.toEqual({
          ...metadataMock,
          displayName: 'component',
          readme: readmeMock,
          readmeApi: readmeApiMock,
          readmeAccessibility: readmeAccessibilityMock,
          readmeTestkit: readmeTestkitMock,
          drivers: [],
        });
      });
    });

    describe('which is folder with component importing from node_modules', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'src/components/Badge/index.js': `import * as React from "react";
             import {Badge as CoreBadge} from "wix-ui-core/Badge";
             const component = () => <div/>;
             component.propTypes = {
               ...CoreBadge.propTypes,
             };
             export default component;
          `,
          'node_modules/wix-ui-core/Badge.js': `module.exports = require("./dist/src/components/Badge");`,
          'node_modules/wix-ui-core/src/components/Badge/index.js': componentSourceMock,
        });

        return expect(gatherAll(fakeFs.dir + '/src/components/Badge')).resolves.toEqual({
          description: '',
          methods: [],
          displayName: 'component',
          props: {
            test: {
              description: '',
              required: true,
              type: {
                name: 'string',
              },
            },
          },
          readme: '',
          readmeApi: '',
          readmeAccessibility: '',
          readmeTestkit: '',
          drivers: [],
        });
      });
    });

    describe('which is folder with component importing from non direct node_modules', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'library/src/components/Badge/index.js': `import * as React from "react";
             import {Badge as CoreBadge} from "wix-ui-core/Badge";
             const component = () => <div/>;
             component.propTypes = {
               ...CoreBadge.propTypes,
             };
             export default component;
             `,
          'node_modules/wix-ui-core/Badge.js': 'module.exports = require("./dist/src/components/Badge");',
          'node_modules/wix-ui-core/src/components/Badge/index.js': componentSourceMock,
        });

        return expect(gatherAll(fakeFs.dir + '/library/src/components/Badge')).resolves.toEqual({
          description: '',
          methods: [],
          displayName: 'component',
          props: {
            test: {
              description: '',
              required: true,
              type: {
                name: 'string',
              },
            },
          },
          readme: '',
          readmeApi: '',
          readmeAccessibility: '',
          readmeTestkit: '',
          drivers: [],
        });
      });
    });

    describe('which is folder with components of various extensions', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'folder/index.jsx': `
            import PropTypes from "prop-types";
            import composed from "some-module/Component";
            const component = () => <div/>;
            component.propTypes = { ...composed.propTypes };
            export default component;
          `,
          'folder/readme.md': '# Hello readme!',
          'folder/readme.api.md': '# Hello API!',
          'folder/readme.accessibility.md': '# Hello Accessiblity!',
          'folder/readme.testkit.md': '# Hello Testkit!',
          'node_modules/some-module/Component.js': `
            import PropTypes from "prop-types";
            const component = () => <div/>;
            component.propTypes = { test: PropTypes.string.isRequired };
            export default component;
            `,
        });

        return expect(gatherAll(fakeFs.dir + '/folder')).resolves.toEqual({
          ...metadataMock,
          displayName: 'component',
          readme: readmeMock,
          readmeApi: readmeApiMock,
          readmeAccessibility: readmeAccessibilityMock,
          readmeTestkit: readmeTestkitMock,
          drivers: [],
        });
      });

      it('should resolve real world scenario', () => {
        const fakeFs = cista({
          'src/components/Badge/index.js': `
              import * as React from "react";
              import {oneOf} from "prop-types";
              import {Badge as CoreBadge} from "wix-ui-core/Badge";
              export class Badge extends React.PureComponent {
                static propTypes = {
                  ...CoreBadge.propTypes,
                  skin: oneOf(["red", "blue"])
                }

                render() {
                  return <div/>;
                }
              }`,
          'src/components/Badge/readme.md': '# Hello readme!',
          'src/components/Badge/readme.api.md': '# Hello API!',
          'src/components/Badge/readme.accessibility.md': '# Hello Accessiblity!',
          'src/components/Badge/readme.testkit.md': '# Hello Testkit!',
          'node_modules/wix-ui-core/Badge.js': `module.exports = require("./dist/src/components/Badge");`,
          'node_modules/wix-ui-core/src/components/Badge/index.js': `
            import * as React from "react";
            import BadgeComponent from "./Badge";
            import {withClasses} from "wix-ui-jss";
            import {styles} from "./styles";
            export default withClasses(BadgeComponent, styles)
            `,
          'node_modules/wix-ui-core/src/components/Badge/Badge.jsx': `
            import * as React from "react";
            import {string} from "prop-types";
            const Badge = () => <div/>;
            Badge.propTypes = {
              children: string
            }
            export default Badge;
            `,
        });

        return expect(gatherAll(fakeFs.dir + '/src/components/Badge')).resolves.toEqual({
          description: '',
          methods: [],
          displayName: 'Badge',
          props: {
            skin: {
              description: '',
              type: {
                name: 'enum',
                value: [
                  { computed: false, value: '"red"' },
                  { computed: false, value: '"blue"' },
                ],
              },
              required: false,
            },
            children: {
              type: {
                name: 'string',
              },
              description: '',
              required: false,
            },
          },
          readme: readmeMock,
          readmeApi: readmeApiMock,
          readmeAccessibility: readmeAccessibilityMock,
          readmeTestkit: readmeTestkitMock,
          drivers: [],
        });
      });
    });

    describe('which is path to concrete file', () => {
      it('should resolve with component metadata', () => {
        const fakeFs = cista({
          'index.js': componentSourceMock,
          'readme.md': readmeMock,
          'readme.api.md': readmeApiMock,
          'readme.accessibility.md': readmeAccessibilityMock,
          'readme.testkit.md': readmeTestkitMock,
        });

        return expect(gatherAll(fakeFs.dir + '/index.js')).resolves.toEqual({
          ...metadataMock,
          displayName: 'component',
          readme: readmeMock,
          readmeApi: readmeApiMock,
          readmeAccessibility: readmeAccessibilityMock,
          readmeTestkit: readmeTestkitMock,
          drivers: [],
        });
      });
    });
  });

  describe('when called without path', () => {
    it('should reject promise with error', () =>
      expect(gatherAll()).rejects.toEqual('Error: gatherAll is missing required `path` argument'));
  });

  describe('when called with skipPropsWithoutDoc option', () => {
    it('should skip undocumented props of typescript component', () => {
      const fakeFs = cista({
        'component.tsx': `
        interface Props {
          /** documented */
          documented: any;
          undocumented: any;
        }
        const component: React.FunctionComponent<Props> = () => <div/>;
        export default component; 
        `,
      });

      return expect(gatherAll(fakeFs.dir + '/component.tsx', { skipPropsWithoutDoc: true })).resolves.toEqual(
        expect.objectContaining({
          props: {
            documented: expect.objectContaining({
              name: 'documented',
              description: 'documented',
              required: true,
              type: {
                name: 'any',
              },
            }),
          },
          displayName: 'component',
        })
      );
    });

    it('should skip undocumented props of javascript component', () => {
      const fakeFs = cista({
        'component.jsx': `
          import PropTypes from "prop-types";
          const component = () => <div/>;
          component.propTypes = {
            /** documented */
            documented: PropTypes.string,
            undocumented: PropTypes.string
          };
          export default component;
        `,
      });

      return expect(gatherAll(fakeFs.dir + '/component.jsx', { skipPropsWithoutDoc: true })).resolves.toEqual(
        expect.objectContaining({
          props: {
            documented: expect.objectContaining({
              description: 'documented',
              required: false,
              type: {
                name: 'string',
              },
            }),
          },
          displayName: 'component',
        })
      );
    });
  });

  describe('testkitParser', () => {
    it('should resolve testkits in nested folders', () => {
      const fakeFs = cista({
        'component-folder/index.js': componentSourceMock,
        'component-folder/test/component.uni.driver.js': `export default () => ({
              /** documented */
              exists: () => true,

              /** @deprecated do not use this */
              bad: () => false
            })
          `,
      });

      return expect(gatherAll(fakeFs.dir + '/component-folder')).resolves.toEqual(
        expect.objectContaining({
          ...metadataMock,
          displayName: 'component',
          drivers: [
            expect.objectContaining({
              descriptor: [
                expect.objectContaining({ name: 'exists', description: 'documented' }),
                expect.objectContaining({
                  name: 'bad',
                  description: '',
                  isDeprecated: true,
                  tags: [{ description: 'do not use this', title: 'deprecated' }],
                }),
              ],
            }),
          ],
        })
      );
    });
  });
});
