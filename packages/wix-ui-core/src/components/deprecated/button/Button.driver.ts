import { BaseDriver, ComponentFactory, DriverFactory } from 'wix-ui-test-utils/driver-factory';

export interface ButtonDriver extends BaseDriver {
  /** click on the button root element */
  click: () => any;
  /** returns elements type attribute */
  getType: () => any;
  /** returns elements textContent */
  getTextContent: () => any;
  /** returns if the element is disabled */
  isDisabled: () => boolean;
  styles: {
    /** returns elements min-width css property */
    getMinWidth: () => string;
    /** returns elements width css property */
    getWidth: () => string;
    /** returns elements height css property */
    getHeight: () => string;
    /** returns elements padding css property */
    getPadding: () => string;
    /** returns elements border-radius css property */
    getBorderRadius: () => string;
  }
}

export const buttonDriverFactory: DriverFactory<ButtonDriver> = ({element, eventTrigger}: ComponentFactory): ButtonDriver => {
  const getButtonStyle = () => window.getComputedStyle(element);

  return {
    exists: () => !!element,
    click: () => eventTrigger.click(element),
    getType: () => element.getAttribute('type'),
    getTextContent: () => element.textContent,
    isDisabled: () => element.getAttribute('disabled') === '',
    styles: {
      getMinWidth: () => getButtonStyle().minWidth,
      getWidth: () => getButtonStyle().width,
      getHeight: () => getButtonStyle().height,
      getPadding: () => getButtonStyle().padding,
      getBorderRadius: () => getButtonStyle().borderRadius,
    }
  };
};
