/** specific functions and variables for test environment purposes */
export const getPopoverTestUtils = {
  createRange: () => {
    document.createRange = () =>
      ({
        setStart: () => null,
        setEnd: () => null,
        commonAncestorContainer: document.documentElement.querySelector('body'),
      } as any);
  },
  generateId: () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
};
