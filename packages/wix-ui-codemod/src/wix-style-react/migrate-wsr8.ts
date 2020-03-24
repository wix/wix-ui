import { Transform, JSXAttribute } from 'jscodeshift';

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const removeAttributeFromPaths = (paths, attributeName: string) =>
    paths.forEach(path => {
      path.node.attributes = path.node.attributes.filter(
        (attribute: JSXAttribute) => attribute.name.name !== attributeName,
      );
    });

  removeAttributeFromPaths(
    root.find(j.JSXOpeningElement, { name: { name: 'Page' } }),
    'upgrade',
  );
  removeAttributeFromPaths(
    root.find(j.JSXOpeningElement, { name: { name: 'Tooltip' } }),
    'upgrade',
  );

  const cardHeaderPaths = root.find(j.JSXOpeningElement, {
    name: { object: { name: 'Card' }, property: { name: 'Header' } },
  });

  removeAttributeFromPaths(cardHeaderPaths, 'withoutDivider');

  const cardDividerNode = j.jsxElement(
    j.jsxOpeningElement(
      j.jsxMemberExpression(
        j.jsxIdentifier('Card'),
        j.jsxIdentifier('Divider'),
      ),
      /* attributes */ [],
      /* selfClosing */ true,
    ),
  );

  cardHeaderPaths.forEach(cardHeaderPath => {
    const cardChildren = cardHeaderPath.parentPath.parentPath.value;
    const newChildren = cardChildren.reduce((all, curr) => {
      all.push(curr);
      if (
        j.JSXClosingElement.check(curr.closingElement) &&
        curr.closingElement.name.object.name === 'Card' &&
        curr.closingElement.name.property.name === 'Header'
      ) {
        all.push('\n', cardDividerNode, '\n');
      }
      return all;
    }, []);

    cardHeaderPath.parentPath.parentPath.replace(newChildren);
  });

  return root.toSource({
    reuseWhitespace: true,
  });
};

export default transform;
