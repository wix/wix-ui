export const dividerDriverFactory = ({element, instance, eventTrigger}) => {
    return {
        /** checks if the element exists */
        exists: () => !!element
    };
};
