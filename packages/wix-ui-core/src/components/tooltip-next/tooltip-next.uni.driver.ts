import { tooltipDriverFactory } from '../tooltip/Tooltip.uni.driver';

export const tooltipNextDriverFactory = (base, body) => {
  return {
    ...tooltipDriverFactory(base, body),
  };
};
