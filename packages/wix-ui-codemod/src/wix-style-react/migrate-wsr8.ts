import { Transform, JSXAttribute } from 'jscodeshift';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const findByName = (name: string) =>
    root.find(j.JSXOpeningElement, { name: { name } });
  const removeAttributeFromPaths = (paths, attributeName) =>
    paths.forEach(path => {
      path.node.attributes = path.node.attributes.filter(
        (attribute: JSXAttribute) => attribute.name.name !== attributeName,
      );
    });

  removeAttributeFromPaths(findByName('Page'), 'upgrade');
  removeAttributeFromPaths(findByName('Tooltip'), 'upgrade');

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

export default transform;
