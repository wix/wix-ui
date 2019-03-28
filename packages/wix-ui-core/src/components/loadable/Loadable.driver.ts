import { ComponentFactory, BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { tooltipDriverFactory } from '../tooltip/Tooltip.driver';

export interface LoadableDriver extends BaseDriver {
  isLoaded(): boolean;
}

const tooltipSelector = element => {
  if (element.getAttribute('data-hook') === 'tooltip') {
    return element;
  }
  return element.querySelector(`[data-hook='tooltip']`);
};

export const loadableDriverFactoryWithTooltip = ({
  element,
  eventTrigger,
  wrapper,
}: ComponentFactory): LoadableDriver => {
  const getTooltipFactory = () => {
    return tooltipDriverFactory({
      element: tooltipSelector(element),
      eventTrigger,
      wrapper,
    });
  };

  return {
    exists: () => !!element,
    isLoaded: () => getTooltipFactory().exists(),
  };
};

export const createLoadableDriverFactoryWithChild = ({
  childFactory,
  childSelector,
}: {
  childFactory(arg: ComponentFactory): BaseDriver;
  childSelector(element: Element): Element;
}) => ({
  element,
  eventTrigger,
  wrapper,
}: ComponentFactory): LoadableDriver => {
  const getChildFactory = () => {
    return childFactory({
      element: childSelector(element),
      eventTrigger,
      wrapper,
    });
  };

  return {
    exists: () => !!element,
    isLoaded: () => getChildFactory().exists(),
  };
};
