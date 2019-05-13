/* eslint-disable no-unused-vars */
import ReactDOM from 'react-dom';

import {
  testkitFactoryCreator,
  uniTestkitFactoryCreator,
} from 'wix-ui-test-utils/vanilla';

import tooltipDriverFactory from '../src/Tooltip/Tooltip.driver';
import { tooltipDriverFactory as tooltipNextDriverFactory } from '../src/Tooltip/TooltipNext/Tooltip.uni.driver';

export const tooltipTestkitFactory = testkitFactoryCreator(
  tooltipDriverFactory,
);

export const TooltipTestkit = uniTestkitFactoryCreator(
  tooltipNextDriverFactory,
);
