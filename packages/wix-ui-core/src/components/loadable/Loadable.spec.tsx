import * as React from 'react';

import { createRendererWithDriver, cleanup } from '../../../test/utils/react';

import * as eventually from 'wix-eventually';

import { TooltipProps } from '../tooltip';

import { Loadable } from './Loadable';
import { tooltipDriverFactory } from '../tooltip/Tooltip.driver';

class LoadableTooltip extends Loadable<{
  Tooltip: React.ComponentType<TooltipProps>;
}> {}

const getTooltipDriverFactory = (wrapper) =>
  tooltipDriverFactory({
    element: wrapper.getDOMNode(),
  });

const renderSync = (props?) => (
  <LoadableTooltip
    loader={{
      Tooltip: () => require('../tooltip'),
    }}
    defaultComponent={<span data-hook="error-icon">Hey!</span>}
    namedExports={{
      Tooltip: 'Tooltip',
    }}
    shouldLoadComponent
    {...props}
  >
    {({ Tooltip }) => {
      return (
        <Tooltip data-hook="tooltip" placement="top" content="kek">
          <div>hello</div>
        </Tooltip>
      );
    }}
  </LoadableTooltip>
);

const renderAsync = (props?) => (
  <LoadableTooltip
    loader={{
      Tooltip: () => import('../tooltip'),
    }}
    defaultComponent={<span data-hook="error-icon">Hey!</span>}
    namedExports={{
      Tooltip: 'Tooltip',
    }}
    shouldLoadComponent
    {...props}
  >
    {({ Tooltip }) => {
      return (
        <Tooltip data-hook="tooltip" placement="top" content="kek">
          <div>hello</div>
        </Tooltip>
      );
    }}
  </LoadableTooltip>
);

describe('Loadable with sync loader', () => {
  afterEach(() => cleanup());

  const render = createRendererWithDriver(tooltipDriverFactory);

  it('should load modules initially', () => {
    const { driver } = render(renderSync(), 'tooltip');
    driver.mouseEnter();
    expect(driver.getTooltipText()).toBe('kek');
  });

  it('should load modules after `shouldLoadComponent` changed', () => {
    const { rerender, container } = render(
      renderSync({ shouldLoadComponent: false }),
    );

    const tooltipTestkit = tooltipDriverFactory({ element: container });
    expect(tooltipTestkit.isTargetElementExists()).toBe(false);

    rerender(renderSync({ shouldLoadComponent: true }));

    expect(tooltipTestkit.isTargetElementExists()).toBe(true);
  });

  it('should trigger onLoad when module is loaded', async () => {
    const onLoad = jest.fn();

    render(renderSync({ onLoad }));

    expect(onLoad).toBeCalled();
  });
});

describe('Loadable with async loader', () => {
  const render = createRendererWithDriver(tooltipDriverFactory);

  it('should load modules initially', async () => {
    const { container } = render(renderAsync(), 'tooltip');

    const tooltipTestkit = tooltipDriverFactory({ element: container });
    expect(tooltipTestkit.isTargetElementExists()).toBe(false);

    await eventually(() => {
      expect(tooltipTestkit.isTargetElementExists()).toBe(true);
    });
  });

  it('should load modules after `shouldLoadComponent` changed', async () => {
    const { rerender, container } = render(
      renderAsync({ shouldLoadComponent: false }),
    );

    const tooltipTestkit = tooltipDriverFactory({ element: container });
    expect(tooltipTestkit.isTargetElementExists()).toBe(false);

    rerender(renderSync({ shouldLoadComponent: true }));
    expect(tooltipTestkit.isTargetElementExists()).toBe(true);
  });

  it('should trigger onLoad when module is loaded', async () => {
    const onLoad = jest.fn();

    render(renderAsync({ onLoad }));

    expect(onLoad).not.toBeCalled();

    await eventually(() => {
      expect(onLoad).toBeCalled();
    });
  });
});
