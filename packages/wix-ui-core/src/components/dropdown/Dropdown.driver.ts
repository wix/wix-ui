import { dropdownContentDriverFactory } from '../dropdown-content/DropdownContent.driver';
import { popoverDriverFactory } from '../popover/Popover.driver';
import { StylableDOMUtil } from '@stylable/dom-test-kit';
import style from './Dropdown.st.css';

const stylableUtil = new StylableDOMUtil(style);

export const dropdownDriverFactory = args => {
  const popoverDriver = popoverDriverFactory(args);

  return {
    ...popoverDriver,
    hasStyleState: state => stylableUtil.hasStyleState(args.element, state),

    //DropdownContent
    getOptionsCount: () => getDropdownContentDriver(args).getOptionsCount(),
    getSelectedOptionsCount: () =>
      getDropdownContentDriver(args).getSelectedOptionsCount(),
    optionAt: (index: number) => getDropdownContentDriver(args).optionAt(index),
    triggerMouseDownOnDropdownContent: () =>
      getDropdownContentDriver(args).triggerMouseDown(),
    dropdownContentDisplayed: () => getDropdownContentDriver(args).exists(),
  };
};

function getDropdownContentDriver({ element, eventTrigger }) {
  return dropdownContentDriverFactory({
    element: element.querySelector('[data-hook="dropdown-content"]'),
    eventTrigger,
  });
}
