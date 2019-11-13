/* global jest describe it expect */

const cista = require('cista');

// this function was extracted from `metadataParser` which
// has the functionality of `followProps` tested over there.
// hence, not many tests live here but behaviour is covered.
const followProps = require('./');

describe('followProps()', () => {
  describe('given component with deeply composed props that live in sibling folders', () => {
    it('should resolve paths correctly', () => {
      const entrySource = `
        import PropTypes from 'prop-types';
        import React from 'react';
        import OtherComponent from '../../OtherComponent/OtherComponent';

        export default class EntryComponent extends React.Component {
          static propTypes = {
            ...OtherComponent.propTypes,
            disabled: PropTypes.bool
          };

          render() {
            return <div/>;
          }
        }`;

      const fakeFs = cista({
        'src/Backoffice/Component/index.js': entrySource,
        'src/OtherComponent/OtherComponent.js': `
          import React from "react";
          import PropTypes from "prop-types";
          import OneUpComponent from "../OneUpComponent";

          export default class Component extends React.Component {
            static propTypes = {
              ...OneUpComponent.propTypes,
              link: PropTypes.string
            };

            render() {
              return (<div/>);
            }
          }`,

        'src/OneUpComponent/index.js': `
          import React from "react";
          import PropTypes from "prop-types";
          const component = () => <div/>;
          component.propTypes = {
            veryDeep: PropTypes.bool.isRequired
          }
          export default component;
        `,
      });

      return expect(
        followProps({ source: entrySource, path: fakeFs.dir + '/src/Backoffice/Component/index.js' })
      ).resolves.toEqual({
        description: '',
        displayName: 'EntryComponent',
        methods: [],
        props: {
          disabled: {
            description: '',
            required: false,
            type: { name: 'bool' },
          },
          link: {
            description: '',
            required: false,
            type: { name: 'string' },
          },
          veryDeep: {
            description: '',
            required: true,
            type: { name: 'bool' },
          },
        },
      });
    });
  });

  describe('given component that spreads props from absolute node_modules dist path', () => {
    it('should remove `dist/` from path', () => {
      const entrySource = `import PropTypes from "prop-types";
        import React from "react";
        import OtherComponent from "wix-ui-backoffice/dist/src/Component";

        export default class EntryComponent extends React.Component {
          static propTypes = {
            ...OtherComponent.propTypes
          };

          render() {
            return <div/>;
          }
        }`;

      const fakeFs = cista({
        index: entrySource,
        'node_modules/wix-ui-backoffice/src/Component.js': `
          import PropTypes from "prop-types";
          import React from "react";

          export default class Component extends React.Component {
            static propTypes = {
              theThing: PropTypes.bool.isRequired
            };

            render() {
              return <div/>;
            }
          }`,
      });

      return expect(followProps({ source: entrySource, path: fakeFs.dir + '/index' })).resolves.toEqual({
        description: '',
        displayName: 'EntryComponent',
        methods: [],
        props: {
          theThing: {
            description: '',
            required: true,
            type: { name: 'bool' },
          },
        },
      });
    });

    it('should remove `standalone/` from path', () => {
      const entrySource = `import PropTypes from "prop-types";
        import React from "react";
        import OtherComponent from "wix-ui-backoffice/dist/standalone/src/standalone-Component";

        export default class EntryComponent extends React.Component {
          static propTypes = {
            ...OtherComponent.propTypes
          };

          render() {
            return <div/>;
          }
        }`;

      const fakeFs = cista({
        index: entrySource,
        'node_modules/wix-ui-backoffice/src/standalone-Component.js': `
          import PropTypes from "prop-types";
          import React from "react";

          export default class Component extends React.Component {
            static propTypes = {
              theThing: PropTypes.bool.isRequired
            };

            render() {
              return <div/>;
            }
          }`,
      });

      return expect(followProps({ source: entrySource, path: fakeFs.dir + '/index' })).resolves.toEqual({
        description: '',
        displayName: 'EntryComponent',
        methods: [],
        props: {
          theThing: {
            description: '',
            required: true,
            type: { name: 'bool' },
          },
        },
      });
    });
  });
});
