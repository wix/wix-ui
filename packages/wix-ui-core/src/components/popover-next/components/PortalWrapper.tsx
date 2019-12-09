import * as React from 'react';

const PortalWrapper = props => {
  const { Component, portalNode, children } = props;

  return portalNode ? (
    <Component node={portalNode}>{children}</Component>
  ) : (
    children
  );
};

export default PortalWrapper;
