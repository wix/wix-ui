import React from 'react';
import PropTypes from 'prop-types';

const enabledStyle = {
  fontSize: 20
};

const disabledStyle = {
  fontSize: 12,
  color: 'grey'
};

const Component = ({ enabled, children, onClick, number }) => (
  <div style={enabled ? enabledStyle : disabledStyle} onClick={onClick}>
    {children}
    the number is {number}
    <br />
    and it's type is {typeof number}
  </div>
);

Component.propTypes = {
  number: PropTypes.number,
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
