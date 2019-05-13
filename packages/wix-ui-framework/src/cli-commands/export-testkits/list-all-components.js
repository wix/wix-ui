const fs = require('fs');
const path = require('path');

const NON_COMPONENT_FOLDER = [
  'utils',
  'providers',
  'new-icons',
  'dnd-styles',
  'assets',
  'clients',
  'mixins',
  'common',
  'FieldLabelAttributes',
  'Backoffice',
  'BaseComponents',
  'Deprecated',
  'Typography',
  'Animations',
];

const matches = haystack => needle => haystack.some(h => needle === h);

const componentNameInvalidators = [
  fileName => /^\./.test(fileName), // skip hidden folders, if any (like .DS_STORE)
  path.extname,
  matches(NON_COMPONENT_FOLDER),
];

module.exports = ({ cwd }) =>
  fs
    .readdirSync(cwd)
    .filter(file => !componentNameInvalidators.some(v => v(file)));
