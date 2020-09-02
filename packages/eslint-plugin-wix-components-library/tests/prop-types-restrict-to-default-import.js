const rule = require('../lib/rules/prop-types-restrict-to-default-import'),
    RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    }
});

const ruleTester = new RuleTester();
ruleTester.run('no-full-wsr-lib', rule, {
    valid: ["import PropTypes from 'prop-types';"],
    invalid: [
        {
            code: "import { string } from 'prop-types';",
            errors: [
                {
                    message: "Use 'prop-types' default import only",
                    type: 'ImportDeclaration'
                }
            ]
        },
        {
            code: "import PropTypes, { string } from 'prop-types';",
            errors: [
                {
                    message: "Use 'prop-types' default import only",
                    type: 'ImportDeclaration'
                }
            ]
        },
    ],
});
