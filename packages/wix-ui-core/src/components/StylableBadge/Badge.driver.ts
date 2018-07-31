import { ComponentFactory, BaseDriver } from "wix-ui-test-utils/driver-factory";
import {Simulate} from 'react-dom/test-utils';

export interface BadgeDriver extends BaseDriver {
  /** returns elements innerHtml */
  getContent: () => string;
  /** returns elements innerText */
  text: () => string;
  /** mouse enter */
  mouseEnter: () => void;
  /** mouse leave */
  mouseLeave: () => void;
  setScrollWidth: (width: string) => void
}

export const badgeDriverFactory = ({
  element, wrapper
}: ComponentFactory): BadgeDriver => {
  return {
    /** checks if element exists */
    exists: () => !!element,
    /** returns elements innerHtml */
    getContent: () => element.innerHTML,
    /** returns elements innerText */
    text: () => element.textContent,
    /** mouse enter */
    mouseEnter: () => Simulate.mouseEnter(element),
    /** mouse leave */
    mouseLeave: () => Simulate.mouseLeave(element),
    setScrollWidth: width => {
      // wrapper.offsetWidth = -10;
      // console.log(wrapper.offsetWidth);
      Object.defineProperties(wrapper, {
        scrollWidth: {
          value: width
        },
        offsetWidth: {
          value: width
        }
      })
    }
  };
};
