export const flatten = (descriptor, name = '') =>
  descriptor.reduce((result, item) => {
    const namespace = { ...item, name: `${name}${item.name}` };
    return [
      ...result,
      namespace,
      ...(namespace.type === 'object'
        ? flatten(namespace.props, `${namespace.name}.`)
        : []),
    ];
  }, []);
