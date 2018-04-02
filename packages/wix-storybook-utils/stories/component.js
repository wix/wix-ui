import React from 'react';
import PropTypes from 'prop-types';

const enabledStyle = {
  fontSize: 20
};

const disabledStyle = {
  fontSize: 12,
  color: 'grey'
};

const Component = ({enabled, children}) =>
  <div style={enabled ? enabledStyle : disabledStyle}>
    {children}
  </div>;

Component.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool
};

Component.defaultProps = {
  children: 'Hello dummy component!',
  enabled: true
};

Component.displayName = 'DummyComponent';

export default Component;
