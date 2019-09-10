import { Method } from './typings';

const isNested = (item: Method) => item.type === 'object';

export const flatten = (methodsList: Method[], name = '') =>
  methodsList.reduce((list, item: Method) => {
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
