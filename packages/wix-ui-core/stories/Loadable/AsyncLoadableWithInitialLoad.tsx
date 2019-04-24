import * as React from 'react';
import { Loadable } from '../../src/components/loadable';
import { TooltipProps } from '../../src/components/tooltip';

class LoadableTooltip extends Loadable<{
  Tooltip: React.ComponentType<TooltipProps>;
}> {}

const LazyLoadedTooltip = () => (
  <LoadableTooltip
    loader={{
      Tooltip: () => import('../../src/components/tooltip'),
    }}
    defaultComponent={<span>Not loaded yet!</span>}
    namedExports={{
      Tooltip: 'Tooltip',
    }}
    shouldLoadComponent
  >
    {({ Tooltip }) => (
      <Tooltip content="hey">
        <span>
          Tooltip was loaded using <code>import()</code>
        </span>
      </Tooltip>
    )}
  </LoadableTooltip>
);

export default LazyLoadedTooltip;
