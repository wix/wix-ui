import * as React from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import * as eventually from 'wix-eventually';
import { mount } from 'enzyme';
import { TooltipProps } from '../tooltip';
import { loadableDriverFactory } from './Loadable.driver';
import { Loadable } from './Loadable';
import { tooltipDriverFactory } from '../tooltip/Tooltip.driver';

class LoadableTooltip extends Loadable<
  TooltipProps,
  { Tooltip: React.ComponentType<TooltipProps> }
> {}

const getTooltipDriverFactory = wrapper =>
  tooltipDriverFactory({
    element: wrapper.getDOMNode(),
  });

describe('Loadable with sync loader', () => {
  const createDriver = createDriverFactory(loadableDriverFactory);

  it('should load modules initially', () => {
    const fallBackElement = <span data-hook="error-icon">Hey!</span>;
    const wrapper = createDriver(
      <LoadableTooltip
        loader={() => require('../tooltip')}
        defaultComponent={fallBackElement}
        componentKey="Tooltip"
        shouldLoadComponent
      >
        {Tooltip => {
          return (
            <Tooltip data-hook="tooltip" placement="top" content="kek">
              {fallBackElement}
            </Tooltip>
          );
        }}
      </LoadableTooltip>,
    );
    expect(wrapper.existsChild('tooltip')).toBe(true);
    expect(wrapper.existsChild('error-icon')).toBe(true);
  });

  it('should load modules after `shouldLoadComponent` changed', async () => {
    const wrapper = mount(
      <LoadableTooltip
        loader={() => require('../tooltip')}
        defaultComponent={<span data-hook="default-component">Hey!</span>}
        componentKey="Tooltip"
        shouldLoadComponent={false}
      >
        {Tooltip => {
          return (
            <Tooltip data-hook="tooltip" placement="top" content="kek">
              <span data-hook="tooltip-child">Hey!</span>
            </Tooltip>
          );
        }}
      </LoadableTooltip>,
    );
    expect(getTooltipDriverFactory(wrapper).isTargetElementExists()).toBe(
      false,
    );
    wrapper.setProps({ shouldLoadComponent: true });
    await eventually(() => {
      expect(getTooltipDriverFactory(wrapper).isTargetElementExists()).toBe(
        true,
      );
    });
  });
});

describe('Loadable with async loader', () => {
  const createDriver = createDriverFactory(loadableDriverFactory);

  it('should load modules initially', async () => {
    const fallBackElement = <span data-hook="error-icon">Hey!</span>;
    const wrapper = createDriver(
      <div>
        <LoadableTooltip
          loader={() => import('../tooltip')}
          defaultComponent={fallBackElement}
          componentKey="Tooltip"
          shouldLoadComponent
        >
          {Tooltip => {
            return (
              <Tooltip data-hook="tooltip" placement="top" content="kek">
                {fallBackElement}
              </Tooltip>
            );
          }}
        </LoadableTooltip>
        ,
      </div>,
    );

    expect(wrapper.existsChild('tooltip')).toBe(false);
    await eventually(() => {
      expect(wrapper.existsChild('tooltip')).toBe(true);
      expect(wrapper.existsChild('error-icon')).toBe(true);
    });
  });

  it('should load modules after `shouldLoadComponent` changed', async () => {
    const wrapper = mount(
      <LoadableTooltip
        loader={() => import('../tooltip')}
        defaultComponent={<span data-hook="default-component">Hey!</span>}
        componentKey="Tooltip"
        shouldLoadComponent={false}
      >
        {Tooltip => {
          return (
            <Tooltip data-hook="tooltip" placement="top" content="kek">
              <span data-hook="tooltip-child">Hey!</span>
            </Tooltip>
          );
        }}
      </LoadableTooltip>,
    );

    expect(getTooltipDriverFactory(wrapper).isTargetElementExists()).toBe(
      false,
    );
    wrapper.setProps({ shouldLoadComponent: true });
    await eventually(() => {
      expect(getTooltipDriverFactory(wrapper).isTargetElementExists()).toBe(
        true,
      );
    });
  });
});
