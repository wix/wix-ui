import { ComponentFactory, BaseDriver } from "wix-ui-test-utils/driver-factory";

export interface BadgeDriver extends BaseDriver {
  /** returns elements innerHtml */
  getContent: () => string;
  /** returns elements innerText */
  text: () => string;
}

export const badgeDriverFactory = ({
  element
}: ComponentFactory): BadgeDriver => {
  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements innerHtml */
    getContent: () => element.innerHTML,
    /** returns elements innerText */
    text: () => element.textContent
  };
};
