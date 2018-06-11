const defaultMatchers = {
  // fallthrough for props without specific category
  other: () => true
};

const categorizeProps = (props = {}, matchers = {}) => {
  const allMatchers = {...matchers, ...defaultMatchers};

  const categorized =
    Object
      .entries(props)
      .reduce(
        (categories, [propName, prop]) => {
          const [categoryName = 'other'] =
            Object
              .entries(allMatchers)
              .find(([, matcher]) => matcher(propName, prop));

          return {
            ...categories,
            [categoryName]: {
              ...categories[categoryName],
              [propName]: prop
            }
          };
        },

        // initial value, just to ensure object shape
        Object.keys(allMatchers).reduce((acc, key) => ({...acc, [key]: {}}), {})
      );

  return categorized;
};

export default categorizeProps;
