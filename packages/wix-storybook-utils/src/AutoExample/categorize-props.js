const falsy = () => false;

const categorizeProps = (props = {}, categories = {}) =>
  Object
    .entries(props)
    .reduce(
      (result, [propName, prop]) => {
        const [categoryName] =
          Object
            .entries(categories)
            .find(([, {matcher = falsy}]) => matcher(propName, prop)) || ['primary'];

        const category = result[categoryName] || categories[categoryName] || {};

        return {
          ...result,
          [categoryName]: {
            ...category,
            props: {
              ...(category.props || {}),
              [propName]: prop
            }
          }
        };
      },

      {}
    );

export default categorizeProps;
