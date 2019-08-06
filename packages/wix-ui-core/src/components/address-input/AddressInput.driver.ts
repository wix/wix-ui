import { inputWithOptionsDriverFactory } from '../input-with-options/InputWithOptions.driver';

export const addressInputDriverFactory = ({ element, eventTrigger }) => {
  const inputWithOptionsDriver = inputWithOptionsDriverFactory({
    element,
    eventTrigger,
  });

  const input = element.querySelector('[data-hook="input"] input');

  const driver = {
    element,
    clickInput: () => eventTrigger.click(input),
    doubleClickInput: () => eventTrigger.doubleClick(input),
    mouseEnterInput: () => eventTrigger.mouseEnter(input),
    mouseLeaveInput: () => eventTrigger.mouseLeave(input),
  };

  return { ...driver, ...inputWithOptionsDriver };
};
