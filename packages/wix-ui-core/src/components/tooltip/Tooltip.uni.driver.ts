import { testkit as PopoverTestkit } from '../popover/Popover.uni.driver';

export const tooltipDriverFactory = (base, body) => {
  const testkit = PopoverTestkit(base, body);
  return {
    /** returns true if trigger element exists on the DOM */
    exists: async () => testkit.exists(),
    /** returns true if tooltip element exists on the DOM */
    tooltipExists: async () => testkit.isContentElementExists(),
    /** mouse over the target element */
    mouseEnter: async () => testkit.mouseEnter(),
    /** mouse leaves the target element */
    mouseLeave: async () => testkit.mouseLeave(),
    /** clicks outside the tooltip target */
    clickOutside: async () => testkit.clickOutside(),
    /** returns tooltips content value in string */
    getTooltipText: async () => {
      await testkit.mouseEnter();
      const text = await body.$(`[data-hook="popover-content"]`).text();
      // Clean yourself!
      await testkit.mouseLeave();
      return text;
    },
  };
};
