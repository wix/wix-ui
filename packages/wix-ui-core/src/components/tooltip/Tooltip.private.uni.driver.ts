import { tooltipDriverFactory as publicDriverFactory } from './Tooltip.uni.driver';
import { Simulate } from 'react-dom/test-utils';
import { testkit as PopoverTestkit } from '../popover/Popover.uni.driver';

export const tooltipPrivateDriverFactory = (base, body) => {
  const testkit = PopoverTestkit(base, body);
  const fireKeyDown = () => window.dispatchEvent(new window.Event('keydown'));
  const fireKeyUp = () => window.dispatchEvent(new window.Event('keyup'));
  const focus = async () => {
    fireKeyDown();
    Simulate.focus((await testkit.getTargetElement()).children[0]);
    fireKeyUp();
  };

  const blur = async () => {
    fireKeyDown();
    Simulate.blur((await testkit.getTargetElement()).children[0]);
    fireKeyUp();
  };

  return {
    ...publicDriverFactory(base, body),
    tabIn: async () => focus(),
    tabOut: async () => blur(),
  };
};
