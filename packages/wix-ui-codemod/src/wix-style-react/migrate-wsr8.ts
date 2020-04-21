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

  // add <Card.Divider/> after <Card.Header />
  root
    .find(j.JSXOpeningElement, { name: { name: 'Card' } })
    .forEach(cardPath => {
      const cardChildren = cardPath.parentPath.value.children;

      const headerIndice = cardChildren.reduce((acc, path, index) => {
        if (
          j.JSXOpeningElement.check(path.openingElement) &&
          get(path, 'openingElement.name.object.name') === 'Card' &&
          get(path, 'openingElement.name.property.name') === 'Header' &&
          path.openingElement.selfClosing &&
          get(path, 'openingElement.attributes').filter(
            attribute => attribute.name.name === 'withoutDivider',
          ).length === 0
        ) {
          acc.push(index);
        }

        return acc;
      }, []);

      headerIndice.reverse().forEach((index: number) => {
        cardChildren.splice(index + 1, 0, '\n', cardDividerNode);
      });

      cardPath.parentPath.value.children = cardChildren;
    });

  // remove `withoutDivider` prop from `<Card.Header/>`
  updatePropName({
    paths: root.find(j.JSXOpeningElement, {
      name: { object: { name: 'Card' }, property: { name: 'Header' } },
      attributes: [{ name: { name: 'withoutDivider' } }],
    }),
    remove: 'withoutDivider',
  });

  return root.toSource({
    reuseWhitespace: true,
  });
};

export default transform;
