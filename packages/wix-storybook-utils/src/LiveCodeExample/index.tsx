import React from 'react';

export default props => {
  const Comp = React.lazy(() => import('./LiveCodeExample'));
  return <Comp {...props} />;
};
