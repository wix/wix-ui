import {dropdownContentDriverFactory} from '../DropdownContent/DropdownContent.driver';
import {popoverDriverFactory} from '../Popover/Popover.driver';
import {StylableDOMUtil} from '@stylable/dom-test-kit';
import style from './Dropdown.st.css';

const stylableUtil = new StylableDOMUtil(style);

export const dropdownDriverFactory = args => {
  const dropdownContentDriver =  dropdownContentDriverFactory(args);
  const popoverDriver = popoverDriverFactory(args);

  return Object.assign({
    hasStyleState: state => stylableUtil.hasStyleState(args.element, state),
  }, dropdownContentDriver, popoverDriver);
};
