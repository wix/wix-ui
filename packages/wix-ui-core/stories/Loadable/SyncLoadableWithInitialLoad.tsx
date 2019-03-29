import * as React from 'react';
import { Loadable } from '../../src/components/loadable';
import { TooltipProps } from '../../src/components/tooltip';

class LoadableTooltip extends Loadable<
  TooltipProps,
  { Tooltip: React.ComponentType<TooltipProps> }
> {}

const LazyLoadedTooltip = () => (
  <LoadableTooltip
    loader={() => require('../../src/components/tooltip')}
    defaultComponent={<span>Not loaded yet!</span>}
    componentKey="Tooltip"
    shouldLoadComponent
  >
    {Tooltip => (
      <Tooltip content="hey">
        <span>
          Tooltip was loaded using <code>require()</code>
        </span>
      </Tooltip>
    )}
  </LoadableTooltip>
);

export default LazyLoadedTooltip;
