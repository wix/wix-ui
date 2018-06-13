const falsy = () => false;

const categorizeProps = (props = {}, categories = {}) => {
  const sortedCategories = Object
    .entries(categories)
    .sort((
      [, {order: aOrder = -1}],
      [, {order: bOrder = -1}]
    ) =>
      aOrder - bOrder
    );

  return Object
    .entries(props)
    .reduce(
      (result, [propName, prop]) => {
        const [categoryName] =
          sortedCategories
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
};

export default categorizeProps;
