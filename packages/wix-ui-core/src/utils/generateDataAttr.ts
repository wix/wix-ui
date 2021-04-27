export const generateDataAttr = (
  props: Record<string, unknown>,
  filter: string[],
) =>
  Object.entries(props)
    .filter(([key]) => filter && filter.includes(key))
    .reduce(
      (output, [key, value]) => ({
        ...output,
        [`data-${key.toLowerCase()}`]: value,
      }),
      {},
    );
