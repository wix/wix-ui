import {
  Transform,
  JSXOpeningElement,
  JSXAttribute,
  JSXIdentifier,
} from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';

const get = (obj, path) =>
  path
    .split('.')
    .reduce((res, part) => (res && res[part] ? res[part] : undefined), obj);

const transform: Transform = (file, api) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  const findOpeningTag = (name: string) =>
    root.find(j.JSXOpeningElement, { name: { name } });

  const updatePropName = ({
    paths,
    rename,
    remove,
  }: {
    paths: Collection<JSXOpeningElement>;
    rename?: { from: string; to: string };
    remove?: string;
  }) =>
    paths.forEach(path => {
      (path.node as JSXOpeningElement).attributes = (path.node as JSXOpeningElement).attributes.reduce(
        (props: JSXAttribute[], attribute: JSXAttribute) => {
          if (j.JSXAttribute.check(attribute)) {
            if (remove && attribute.name.name === remove) {
              return props;
            }

            if (rename && attribute.name.name === rename.from) {
              attribute.name.name = rename.to;
            }
          }

          props.push(attribute);
          return props;
        },
        [],
      );
    });

  [
    { component: 'Page', remove: 'upgrade' },
    { component: 'Tooltip', remove: 'upgrade' },
    { component: 'DropdownLayout', remove: 'theme' },
    { component: 'Tag', remove: 'wrap' },
    { component: 'BarChart', remove: 'deprecatedColors' },
    { component: 'Loader', remove: 'shouldLoadAsync' },
    { component: 'LinearProgressBar', remove: 'shouldLoadAsync' },
    { component: 'CircularProgressBar', remove: 'shouldLoadAsync' },
    {
      component: 'InputWithOptions',
      remove: 'disableClickOutsideWhenClosed',
    },
    { component: 'Popover', remove: 'disableClickOutsideWhenClosed' },
    {
      component: 'StatisticsWidget',
      rename: { from: 'statistics', to: 'items' },
    },
  ].forEach(({ component, ...update }) =>
    updatePropName({ paths: findOpeningTag(component), ...update }),
  );

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
  updatePropName({
    paths: cardHeaderPaths,
    remove: 'withoutDivider',
  });

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
