import PropTypes from 'prop-types';

import TabTypes from './tab-types';

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

export const item = PropTypes.shape({
  id: stringOrNumber,
  title: PropTypes.node,
  dataHook: PropTypes.string,
});

export const items = PropTypes.arrayOf(item);

export const onClick = PropTypes.func;

export const activeId = stringOrNumber;

export const width = stringOrNumber;

export const sideContent = PropTypes.node;

export const type = PropTypes.oneOf(TabTypes);
