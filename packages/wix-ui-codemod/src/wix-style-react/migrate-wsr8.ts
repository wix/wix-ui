import { Transform, JSXAttribute, JSXIdentifier } from 'jscodeshift';

const get = (obj, path) =>
  path
    .split('.')
    .reduce((res, part) => (res && res[part] ? res[part] : undefined), obj);

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const findOpeningTag = (name: string) =>
    root.find(j.JSXOpeningElement, { name: { name } });

  // remove obsole props from a list of components
  const updatePropName = (paths, propName: string) =>
    paths.forEach(path => {
      path.node.attributes = path.node.attributes.reduce(
        (props: JSXAttribute[], prop: JSXAttribute) => {
          if (propName && prop.name.name !== propName) {
            props.push(prop);
          }
          return props;
        },
        [],
      );
    });

  const removableProps = [
    { component: 'Page', prop: 'upgrade' },
    { component: 'Tooltip', prop: 'upgrade' },
    { component: 'DropdownLayout', prop: 'theme' },
    { component: 'Tag', prop: 'wrap' },
    { component: 'BarChart', prop: 'deprecatedColors' },
    { component: 'Loader', prop: 'shouldLoadAsync' },
    { component: 'LinearProgressBar', prop: 'shouldLoadAsync' },
    { component: 'CircularProgressBar', prop: 'shouldLoadAsync' },
    { component: 'InputWithOptions', prop: 'disableClickOutsideWhenClosed' },
    { component: 'Popover', prop: 'disableClickOutsideWhenClosed' },
  ];

  removableProps.forEach(({ component, prop }) =>
    updatePropName(findOpeningTag(component), prop),
  );

  // rename `statistics` prop to `items` in `StatisticsWidget`
  findOpeningTag('StatisticsWidget').forEach(path => {
    path.node.attributes.forEach((attribute: JSXAttribute) => {
      if (attribute.name.name === 'statistics') {
        attribute.name.name = 'items';
      }
    });
  });

  // rename PopoverMenuNext to PopoverMenu
  findOpeningTag('PopoverMenuNext').forEach(path => {
    (path.node.name as JSXIdentifier).name = 'PopoverMenu';
  });

  // -import { PopoverMenuNext as PopoverMenu } from 'wix-style-react'
  // +import { PopoverMenu } from 'wix-style-react'
  root
    .find(j.ImportSpecifier, {
      imported: { name: 'PopoverMenuNext' },
    })
    .forEach(path => {
      path.node.imported.name = 'PopoverMenu';
      delete path.node.local;
    });

  // migrate Card with `withoutDivider`
  const cardHeaderPaths = root.find(j.JSXOpeningElement, {
    name: { object: { name: 'Card' }, property: { name: 'Header' } },
  });

  // remove `withoutDivider` prop from `<Card.Header/>`
  updatePropName(cardHeaderPaths, null /* falsy value removes prop */);

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
