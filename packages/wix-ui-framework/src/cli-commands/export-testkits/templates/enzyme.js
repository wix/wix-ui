/* eslint-disable no-unused-vars */
import {
  enzymeTestkitFactoryCreator,
  enzymeUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/enzyme';

import tooltipDriverFactory from '../src/Tooltip/Tooltip.driver';
import { tooltipDriverFactory as tooltipNextDriverFactory } from '../src/Tooltip/TooltipNext/Tooltip.uni.driver';

export const tooltipTestkitFactory = enzymeTestkitFactoryCreator(
  tooltipDriverFactory,
);

export const TooltipTestkit = enzymeUniTestkitFactoryCreator(
  tooltipNextDriverFactory,
);
