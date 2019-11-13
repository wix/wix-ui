/* global describe it expect jest */

const followExports = require('./');

const cista = require('cista');

describe('followExports()', () => {
  describe('given source', () => {
    describe('which does not have exports', () => {
      it('should return original source', () => {
        const source = 'const hey = "now"';

        return expect(followExports(source)).resolves.toEqual({ source, path: '' });
      });
    });

    describe('which has module.exports', () => {
      it('should return source of that export', () => {
        const source = "module.exports = require('./index.js')";

        const fakeFs = cista({
          'index.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/index.js',
        });
      });

      it('should return source of resolved file without exports', () => {
        const source = "export {default} from './file.js'";

        const fakeFs = cista({
          'node_modules/file.js': 'export {default} from "../nested/deep/index.js"',
          'nested/deep/index.js': 'export {default} from "../sibling.js"',
          'nested/sibling.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir + '/node_modules')).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/nested/sibling.js',
        });
      });
    });

    describe('which has `withStylable` HOC', () => {
      it('should resolve component', () => {
        const source = `
            import {
              Component as CoreComponent,
              ComponentProps as CoreComponentProps
            } from 'wix-ui-core/Component';
            import {withStylable} from 'wix-ui-core';

            export const Component = withStylable<CoreComponentProps, ComponentProps>(
              CoreComponent,
              {},
              i => i,
              {}
            );
          `;

        const fakeFs = cista({
          'node_modules/wix-ui-core/Component.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir + '/root')).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/node_modules/wix-ui-core/Component.js',
        });
      });

      // TODO: this would be a helpful feature, leaving skipped test for future reference
      describe.skip('with props interface which is in same file', () => {
        it('should add additional `composedProps` property with parsed interface', () => {
          const source = `
            import { Component as CoreComponent } from 'wix-ui-core/Component';
            import {withStylable} from 'wix-ui-core';

            export interface AdditionalProps {
              /** font size of the text */
              size?: Size;

              /** is the text type is secondary. Affects the font color */
              secondary?: boolean;

              /** skin color of the text */
              skin?: Skin;

              /** is the text has dark or light skin */
              light?: boolean;

              /** is the text bold */
              bold?: boolean;
            }

            export const Component = withStylable<CoreComponentProps, AdditionalProps>(
              CoreComponent,
              {},
              i => i,
              {}
            );
          `;

          fs.__setFS({
            'index.ts': source,

            node_modules: {
              'wix-ui-core': {
                'Component.js': 'hello',
              },
            },
          });

          return expect(followExports(source, '')).resolves.toEqual({
            source: 'hello',
            path: 'node_modules/wix-ui-core/Component.js',
            composedProps: {
              size: {
                name: 'size',
                required: false,
                type: { name: 'Size' },
                description: 'font size of the text',
                defaultValue: undefined,
              },
              skin: {
                name: 'skin',
                required: false,
                type: { name: 'string' },
                description: 'skin color of the text',
                defaultValue: undefined,
              },
              secondary: {
                name: 'secondary',
                required: false,
                type: { name: 'boolean' },
                description: 'is the text type is secondary. Affects the font color',
                defaultValue: undefined,
              },
              light: {
                name: 'light',
                required: false,
                type: { name: 'boolean' },
                description: 'is the text has dark or light skin',
                defaultValue: undefined,
              },
              bold: {
                name: 'bold',
                required: false,
                type: { name: 'boolean' },
                description: 'is the text bold',
                defaultValue: undefined,
              },
            },
          });
        });
      });
    });

    describe('which has `createHOC` HOC', () => {
      it('should resolve component', () => {
        const source = `
            import {
              Component as CoreComponent
            } from './Label.js';

            export const Label = createHOC(CoreComponent);
        `;

        const fakeFs = cista({
          'index.js': source,
          'Label.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/Label.js',
        });
      });
    });

    describe('which has createHOC(withFocusable())', () => {
      it('should resolve component', () => {
        const source = `
          import { Component as CoreComponent } from './Badge.js';
          export const Label = createHOC(withFocusable(CoreComponent));
        `;

        const fakeFs = cista({
          'index.js': source,
          'Badge.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/Badge.js',
        });
      });
    });

    describe('which exports with `withClasses` hoc', () => {
      it('should return source of component', () => {
        const source = "module.exports = require('./dist/src/components/component');";

        const fakeFs = cista({
          'index.js': source,
          'src/components/component/index.js': `
            import Component from "./component.js";
            export default withClasses(Component, styles)`,
          'src/components/component/component.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/src/components/component/component.js',
        });
      });
    });

    describe('which has a single non default export', () => {
      it('should return source of component', () => {
        const source = "export {Component, AnythingElse} from './thing.js'\n'should ignore me'";

        const fakeFs = cista({
          'thing.js': 'hey!',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hey!',
          path: fakeFs.dir + '/thing.js',
        });
      });
    });

    describe('which has multiple exports including default one', () => {
      it('should stop following exports and return current source', () => {
        const source = `
          export { something } from './constants.js';
          export default 1;
        `;

        return expect(followExports(source, '')).resolves.toEqual({
          source,
          path: '',
        });
      });
    });

    describe('which has `export default Identifier`', () => {
      it('should return source of current file when Identifier is declared', () => {
        const source = `
          import { Component as SomethingElse } from 'shouldnt-go-here';
          export { something } from 'shouldnt-go-here';
          class Component {};
          export default Component;
        `;

        return expect(followExports(source, '')).resolves.toEqual({
          path: '',
          source,
        });
      });

      it('should return source of exported Identifier', () => {
        const source = `
          import Component from \'./Component\';
          export default Component;
        `;

        const fakeFs = cista({
          'Component/index.js': 'hello',
        });

        return expect(followExports(source, fakeFs.dir)).resolves.toEqual({
          source: 'hello',
          path: fakeFs.dir + '/Component/index.js',
        });
      });
    });
  });
});
