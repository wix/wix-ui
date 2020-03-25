import { Transform, JSXAttribute } from 'jscodeshift';

const get = (obj, path) =>
  path
    .split('.')
    .reduce((res, part) => (res && res[part] ? res[part] : undefined), obj);

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const findByName = (name: string) =>
    root.find(j.JSXOpeningElement, { name: { name } });

  const removeAttributeFromPaths = (paths, attributeName: string) =>
    paths.forEach(path => {
      path.node.attributes = path.node.attributes.filter(
        (attribute: JSXAttribute) => attribute.name.name !== attributeName,
      );
    });

  // remove `upgrade` prop from `Page` & `Tooltip` components
  removeAttributeFromPaths(findByName('Page'), 'upgrade');
  removeAttributeFromPaths(findByName('Tooltip'), 'upgrade');
  removeAttributeFromPaths(findByName('DropdownLayout'), 'theme');
  removeAttributeFromPaths(findByName('Tag'), 'wrap');
  removeAttributeFromPaths(findByName('BarChart'), 'deprecatedColors');
  removeAttributeFromPaths(findByName('Loader'), 'shouldLoadAsync');
  removeAttributeFromPaths(findByName('LinearProgressBar'), 'shouldLoadAsync');
  removeAttributeFromPaths(
    findByName('CircularProgressBar'),
    'shouldLoadAsync',
  );
  removeAttributeFromPaths(
    findByName('InputWithOptions'),
    'disableClickOutsideWhenClosed',
  );
  removeAttributeFromPaths(
    findByName('Popover'),
    'disableClickOutsideWhenClosed',
  );

  const cardHeaderPaths = root.find(j.JSXOpeningElement, {
    name: { object: { name: 'Card' }, property: { name: 'Header' } },
  });

  // remove `withoutDivider` prop from `<Card.Header/>`
  removeAttributeFromPaths(cardHeaderPaths, 'withoutDivider');

  // create <Card.Divider /> AST
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

  // add <Card.Divider/> after </Card.Header>
  cardHeaderPaths.forEach(cardHeaderPath => {
    const cardChildren = cardHeaderPath.parentPath.parentPath.value;
    const newChildren = cardChildren.reduce((all, curr) => {
      all.push(curr);
      if (
        j.JSXClosingElement.check(curr.closingElement) &&
        get(curr, 'closingElement.name.object.name') === 'Card' &&
        get(curr, 'closingElement.name.property.name') === 'Header'
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
