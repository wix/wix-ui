import { ComponentFactory, BaseDriver } from 'wix-ui-test-utils/driver-factory';
import { tooltipDriverFactory } from '../tooltip/Tooltip.driver';

export interface LoadableDriver extends BaseDriver {
  existsChild(selector: string): boolean;
}

export const loadableDriverFactory = ({
  element,
}: ComponentFactory): LoadableDriver => {
  return {
    exists: () => !!element,
    existsChild: selector =>
      !!element.parentElement.querySelector(`[data-hook=${selector}]`),
  };
};
