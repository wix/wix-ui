import { Transform } from 'jscodeshift';
import { type } from 'os';
const addImports = require('jscodeshift-add-imports');

const getComponentName = /^wix-style-react\/(?!new-icons)(\/?.*)$/;

const transform: Transform = (fileInfo, api, options) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true,
  };

  const resultSpecifiers = new Map();

  const addSpecifier = (source, specifier) => {
    if (!resultSpecifiers.has(source)) {
      resultSpecifiers.set(source, []);
    }
    resultSpecifiers.get(source).push(specifier);
  };

  root.find(api.jscodeshift.ImportDeclaration).forEach(path => {
    if (!path.node.specifiers.length) {
      return;
    }

    if (path.value.importKind && path.value.importKind !== 'value') {
      return;
    }

    const sourceNode = path.value.source.value;

    const moduleName = (sourceNode as string).match(getComponentName);

    if (!getComponentName.test(sourceNode as string)) {
      return;
    }

    const cleanImport = name => {
      path.value.specifiers = path.value.specifiers.filter(
        spec => spec.local.name !== name,
      );
    };

    path.value.specifiers.forEach((specifier, index) => {
      switch (specifier.type) {
        case 'ImportDefaultSpecifier': {
          addSpecifier(
            'wix-style-react',
            j.importSpecifier(
              j.identifier(moduleName[1]),
              j.identifier(specifier.local.name),
            ),
          );
          cleanImport(specifier.local.name);
          break;
        }
        case 'ImportSpecifier': {
          if (specifier.local.name === moduleName[1]) {
            addSpecifier('wix-style-react', specifier);
            cleanImport(specifier.local.name);
            break;
          }
          if (specifier.local.name === `${moduleName[1]}Props`) {
            addSpecifier('wix-style-react', specifier);
            cleanImport(specifier.local.name);
            break;
          }
          cleanImport(specifier.local.name);
          break;
        }
        case 'ImportNamespaceSpecifier':
          console.warn(
            `[wix-ui-codemod][${fileInfo.path}]: we can't handle this import: "import as * ${specifier.local.name} from ${sourceNode}". Make sure to fix it to named import otherwise tree-shaking will not work for you.`,
          );
          break;
        default:
      }
    });

    if (!path.value.specifiers.length) {
      path.prune();
    }
  });

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

  return root.toSource(printOptions);
};

export default transform;
