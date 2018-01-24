import {BaseDriver, ComponentFactory} from 'wix-ui-test-utils';
import {DropdownContent} from './index';

const getOptionAt = (element, index) => element.querySelectorAll('[data-hook="option"]')[index];

export class DropdownDriver implements BaseDriver {
  private componentFactory: ComponentFactory;
  constructor(componentFactory: ComponentFactory) {
    this.componentFactory = componentFactory;
  }

  exists = () => !!this.componentFactory.element;
  onKeyDown = key => (this.componentFactory.componentInstance as DropdownContent).onKeyDown({key} as React.KeyboardEvent<HTMLElement>);
  optionAt = index => {
    const option = getOptionAt(this.componentFactory.element, index);
    return {
      click: () => this.componentFactory.eventTrigger.click(option),
      containsClass: className => option.className.includes(className)
    };
  }
}

export const dropdownContentDriverFactory = (componentFactory: ComponentFactory) => {
  return new DropdownDriver(componentFactory);
};
