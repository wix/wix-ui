import React, { Suspense } from 'react';

export default props => {
  const Comp = React.lazy(() => import('./LiveCodeExample'));
  return (
    <Suspense fallback={<div>loading</div>}>
      <Comp {...props} />
    </Suspense>
  );
};
