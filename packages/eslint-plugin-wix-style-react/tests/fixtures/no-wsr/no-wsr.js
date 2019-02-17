/**
 * @fileoverview Fail if importing all of WSR
 * @author YairH
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-full-wsr-lib'),
  RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();
ruleTester.run('no-wsr', rule, {
  valid: [`import Button from 'wix-style-react/Button';`],

  invalid: [
    {
      code: "import {Button, Panel} from 'wix-style-react';",
      errors: [
        {
          message:
            "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';` or update WSR to at least 5.9.0 version",
          type: 'ImportDeclaration'
        }
      ]
    },
    {
      code: "const Button = require('wix-style-react').Button;",
      errors: [
        {
          message:
            "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';` or update WSR to at least 5.9.0 version",
          type: 'VariableDeclaration'
        }
      ]
    },
    {
      code: "const WSR = require('wix-style-react');",
      errors: [
        {
          message:
            "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';` or update WSR to at least 5.9.0 version",
          type: 'VariableDeclaration'
        }
      ]
    },
    {
      code: "const {Button} = require('wix-style-react');",
      errors: [
        {
          message:
            "Wix-Style-React is imported in a way that does not support tree shaking. Use a direct import, for example: `import Button from 'wix-style-react/Button';` or update WSR to at least 5.9.0 version",
          type: 'VariableDeclaration'
        }
      ]
    }
  ]
});
