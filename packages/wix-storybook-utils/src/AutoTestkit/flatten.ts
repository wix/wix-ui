import { Descriptor } from './typings';

const isNested = (item: Descriptor) => item.type === 'object';

export const flatten = (methodsList: Descriptor[], name = '') =>
  methodsList.reduce((list, item: Descriptor) => {
    if (isNested(item)) {
      list = list.concat(
        flatten(item.props, name ? `${name}.${item.name}` : item.name),
      );
    } else {
      list.push({
        ...item,
        ...(name ? { name: `${name}.${item.name}` } : {}),
      });
    }

    return list;
  }, []);
