export default () => ({
  exists: () => false,
  vanillaMethod: () => true,
  nested: {
    method: (a, b) => a + b,
  },

  nested_again: {
    method: (a, b) => a + b,
    doubleNested: {
      hello: () => 1,
      deeper: {
        goodbye: () => 2,
      },
    },
  },
});
