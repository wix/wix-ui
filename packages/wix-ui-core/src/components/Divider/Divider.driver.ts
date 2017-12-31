export const dividerDriverFactory = ({element}) => {
    return {
        /** checks if the element exists */
        exists: () => !!element
    };
};
