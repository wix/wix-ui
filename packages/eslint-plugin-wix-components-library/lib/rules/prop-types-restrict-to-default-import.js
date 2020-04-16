/**
 * @fileoverview Restrict using only the default import with 'prop-types'
 * @author Egozi
 */
'use strict';

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: "Restrict using only the default import with 'prop-types'",
            category: 'Best Practices',
            recommended: true,
        },
        fixable: 'code',
        schema: [],
    },

    create: function(context) {
        return {
            ImportDeclaration(node) {
                if (node.source.value === 'prop-types') {
                    propTypesImport(node, context);
                }
            },
        };
    },
};

function propTypesImport(node, context) {
    const specifiers = node.specifiers.filter(specifier => specifier.type === 'ImportSpecifier');

    if (specifiers.length > 0) {
        context.report({
            node,
            message: "Use 'prop-types' default import only",
            fix(fixer) {
                // Code changes to be done
                const fixes = [];

                // Iterate over each non default import
                specifiers.forEach(specifier => {

                    // Add `PropTypes.` prefix to all references
                    let allRefs = context.getDeclaredVariables(specifier)[0].references;
                    allRefs.forEach(token => {
                        fixes.push(fixer.insertTextBefore(token.identifier, 'PropTypes.'));
                    });
                });

                // Replace the import with the default
                fixes.push(
                    fixer.replaceText(node, "import PropTypes from 'prop-types';"),
                );
                return fixes;
            },
        });
    }
}
