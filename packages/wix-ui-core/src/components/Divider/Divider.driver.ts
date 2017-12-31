export const dividerDriverFactory = ({element, componentInstance}) => {
    return {
        /** checks if the element exists */
        exists: () => !!element,

        /** checks if the divider is vertical */
        isVertical: () => window.getComputedStyle(element).height === 'auto'
    };
};
