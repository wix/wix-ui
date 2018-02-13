export const boxDriverFactory = ({element}) => ({
    /** check if element exists */
    exists: () => !!element,
    /** return box flex direction value */
    getFlexDirection: () => window.getComputedStyle(element).flexDirection,
    /** return box item alignment value */
    getAlignment: () => window.getComputedStyle(element).alignItems,
    /** returns computed style of child at place idx */
    getChildStyle: (idx: number): CSSStyleDeclaration => window.getComputedStyle(element.children[idx])
});
