import { Transform } from 'jscodeshift';
import addImports from 'jscodeshift-add-imports';

const componentNameRegex = /^wix-style-react\/([A-Z][\w-]*?)$/;
const componentDistNameRegex = /^wix-style-react\/dist\/src\/([A-Z][\w-]*)\/?/;
const betaComponentNameRegex = /^wix-style-react\/beta\/([A-Z][\w-]*?)$/;

const removeImport = (path, name) => {
  path.node.specifiers = path.node.specifiers.filter(
    spec => spec.local.name !== name,
  );
};

const addImport = (source, specifier, output) => {
  if (!output.has(source)) {
    output.set(source, []);
  }
  output.get(source).push(specifier);
};

const ImportHandlersFactory = (j, path, results) => ({
  handleDefault: (specifier, moduleName, localName) => {
    if (j.ImportDefaultSpecifier.check(specifier)) {
      addImport(
        'wix-style-react',
        j.importSpecifier(j.identifier(moduleName), j.identifier(localName)),
        results,
      );
      removeImport(path, localName);
    }
  },
  handleNamed: (specifier, localName) => {
    if (j.ImportSpecifier.check(specifier)) {
      addImport('wix-style-react', specifier, results);
      removeImport(path, localName);
    }
  },
  handleNameSpace: (specifier, fileInfo, sourceNode) => {
    if (j.ImportNamespaceSpecifier.check(specifier)) {
      console.warn(
        `[wix-ui-codemod][${fileInfo.path}]: unable to handle this import: "import as * ${specifier.local.name} from ${sourceNode}". Make sure to fix it to named import otherwise tree-shaking will not work for you.`,
      );
    }
  },
});

const transform: Transform = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const resultSpecifiers = new Map();

  // handle traditional imports
  root
    .find(j.ImportDeclaration)
    .filter(path =>
      [
        path.node.specifiers.length,
        componentNameRegex.test(path.node.source.value as string),
        path.node.importKind === 'value',
      ].every(Boolean),
    )
    .forEach(path => {
      const sourceNode = path.node.source.value;
      const moduleName = (sourceNode as string).match(componentNameRegex)[1];
      const handlers = ImportHandlersFactory(j, path, resultSpecifiers);

      path.node.specifiers.forEach(specifier => {
        const localName = specifier.local.name;
        handlers.handleDefault(specifier, moduleName, localName);
        handlers.handleNamed(specifier, localName);
        handlers.handleNameSpace(specifier, fileInfo, sourceNode);
      });

      if (!path.node.specifiers.length) {
        path.prune();
      }
    });

  // handle dist imports
  root
    .find(j.ImportDeclaration)
    .filter(path =>
      [
        path.node.specifiers.length,
        componentDistNameRegex.test(path.node.source.value as string),
        path.node.importKind === 'value',
      ].every(Boolean),
    )
    .forEach(path => {
      const sourceNode = path.node.source.value;

      const moduleName = (sourceNode as string).match(
        componentDistNameRegex,
      )[1];

      const handlers = ImportHandlersFactory(j, path, resultSpecifiers);

      path.node.specifiers.forEach(specifier => {
        const localName = specifier.local.name;
        handlers.handleDefault(specifier, moduleName, localName);
        handlers.handleNamed(specifier, localName);
        handlers.handleNameSpace(specifier, fileInfo, sourceNode);
      });

      if (!path.node.specifiers.length) {
        path.prune();
      }
    });

  // handle beta imports
  root
    .find(j.ImportDeclaration)
    .filter(path =>
      [
        path.node.specifiers.length,
        betaComponentNameRegex.test(path.node.source.value as string),
        path.node.importKind === 'value',
      ].every(Boolean),
    )
    .forEach(path => {
      const sourceNode = path.node.source.value;
      const moduleName = (sourceNode as string).match(
        betaComponentNameRegex,
      )[1];

      const handlers = ImportHandlersFactory(j, path, resultSpecifiers);

      path.node.specifiers.forEach(specifier => {
        const localName = specifier.local.name;

        handlers.handleDefault(specifier, `${moduleName}Next`, localName);
        handlers.handleNamed(
          j.importSpecifier(
            j.identifier(`${moduleName}NextProps`),
            j.identifier(localName),
          ),
          localName,
        );
        handlers.handleNameSpace(specifier, fileInfo, sourceNode);
      });

      if (!path.node.specifiers.length) {
        path.prune();
      }
    });

  if (!resultSpecifiers.size) {
    return;
  }

  addImports(
    root,
    Array.from(resultSpecifiers.keys())
      .sort()
      .map(source =>
        j.importDeclaration(
          resultSpecifiers.get(source).sort(),
          j.stringLiteral(source),
        ),
      ),
  );

  return root.toSource(
    options.printOptions || {
      quote: 'single',
      trailingComma: true,
    },
  );
};

export default transform;
