export interface BoxDriverFactoryInput {
  element: HTMLElement;
  componentInstance: any;
}

export const boxDriverFactory = ({element, componentInstance}: BoxDriverFactoryInput) => {
  return {
    /** check if element exists */
    exists: () => !!element,
    /** return box flex direction value */
    getFlexDirection: () => window.getComputedStyle(element).flexDirection,
    /** return box item alignment value */
    getAlignment: () => window.getComputedStyle(element).alignItems,
    getChildStyle: (child: number): CSSStyleDeclaration => window.getComputedStyle(element.children[child])
  };
};
