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

  const updates = {
    Page: { remove: 'upgrade' },
    Tooltip: { remove: 'upgrade' },
    DropdownLayout: { remove: 'theme' },
    Tag: { remove: 'wrap' },
    BarChart: { remove: 'deprecatedColors' },
    Loader: { remove: 'shouldLoadAsync' },
    LinearProgressBar: { remove: 'shouldLoadAsync' },
    CircularProgressBar: { remove: 'shouldLoadAsync' },
    InputWithOptions: { remove: 'disableClickOutsideWhenClosed' },
    Popover: { remove: 'disableClickOutsideWhenClosed' },
    StatisticsWidget: { rename: { from: 'statistics', to: 'items' } },
  };

  Object.entries(updates).forEach(([component, update]) =>
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
