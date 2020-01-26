import { Transform } from 'jscodeshift';

const componentName = /^wix-style-react\/(?!new-icons)(\/?.*)$/;

const specifierMatcher = [
  {
    when: value => value === 'ImportDefaultSpecifier',
    make: (result, value) => ({ ...result, default: value }),
  },
  {
    when: value => value === 'ImportSpecifier',
    make: (result, value) => ({ ...result, named: [...result.named, value] }),
  },
  {
    when: value => value === 'ImportNamespaceSpecifier',
    make: (result, value, source) => ({
      ...result,
      default: source.value.match(componentName)[1],
    }),
    then: fn => fn(),
  },
  {
    when: () => true,
    make: () => ({ named: [], default: false }),
  },
];

const transform: Transform = (fileInfo, api) => {
  const root = api.jscodeshift(fileInfo.source);

  const components = [];

  // Transform ES module imports
  root.find(api.jscodeshift.ImportDeclaration).forEach(path => {
    const sourceNode = path.value.source;
    if (
      typeof sourceNode.value === 'string' &&
      componentName.test(sourceNode.value)
    ) {
      const specifiers = path.value.specifiers.reduce(
        (result, specifier, index) =>
          specifierMatcher
            .find(({ when }) => when(specifier.type))
            .make(result, specifier.local.name, sourceNode),
        { named: [], default: false },
      );

      path.get('specifiers').prune();

      components.push(specifiers);
    }
  });

  console.log(components);

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

export default transform;
