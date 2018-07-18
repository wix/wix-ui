import React from 'react';
import PropTypes from 'prop-types';

const enabledStyle = {
  fontSize: 20
};

const disabledStyle = {
  fontSize: 12,
  color: 'grey'
};

const Component = ({enabled, children, onClick}) =>
  <div style={enabled ? enabledStyle : disabledStyle} onClick={onClick}>
    {children}
  </div>;

Component.propTypes = {
  children: PropTypes.node,
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  propNotVisibleInStorybook: PropTypes.bool
};

Component.defaultProps = {
  children: 'Hello dummy component!',
  enabled: true,
  onClick: () => 'you clicked!'
};

Component.displayName = 'DummyComponent';

export default Component;
