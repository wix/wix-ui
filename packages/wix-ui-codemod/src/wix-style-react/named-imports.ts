import { Transform } from 'jscodeshift';
import addImports from 'jscodeshift-add-imports';

const componentNameRegex = /^wix-style-react\/([A-Z][\w-]*?)$/;

const transform: Transform = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const resultSpecifiers = new Map();

  const addSpecifier = (source, specifier) => {
    if (!resultSpecifiers.has(source)) {
      resultSpecifiers.set(source, []);
    }
    resultSpecifiers.get(source).push(specifier);
  };

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

      const cleanImport = name => {
        path.node.specifiers = path.node.specifiers.filter(
          spec => spec.local.name !== name,
        );
      };

      path.node.specifiers.forEach(specifier => {
        const localName = specifier.local.name;

        if (j.ImportDefaultSpecifier.check(specifier)) {
          addSpecifier(
            'wix-style-react',
            j.importSpecifier(
              j.identifier(moduleName),
              j.identifier(localName),
            ),
          );
          cleanImport(localName);
        }

        if (j.ImportSpecifier.check(specifier)) {
          addSpecifier('wix-style-react', specifier);
          cleanImport(localName);
        }

        if (j.ImportNamespaceSpecifier.check(specifier)) {
          console.warn(
            `[wix-ui-codemod][${fileInfo.path}]: unable to handle this import: "import as * ${specifier.local.name} from ${sourceNode}". Make sure to fix it to named import otherwise tree-shaking will not work for you.`,
          );
        }
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
