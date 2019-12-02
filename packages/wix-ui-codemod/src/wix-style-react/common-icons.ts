import { Transform } from 'jscodeshift';

const wixUiIconsCommonLibName = 'wix-ui-icons-common';
const importRegExp = /^wix-style-react\/new-icons(\/?.*)$/;

const transform: Transform = (fileInfo, api) => {
  const root = api.jscodeshift(fileInfo.source);

  const newIconsImports = root
    .find(api.jscodeshift.ImportDeclaration)
    .filter(path => importRegExp.test(path.value.source.value as string));

  if (!newIconsImports.length) {
    return;
  }

  newIconsImports.forEach(path => {
    const importPath = path.value.source.value as string;
    const newImportSource = importPath.replace(
      importRegExp,
      `${wixUiIconsCommonLibName}$1`,
    );

    path.value.source.value = newImportSource;
  });

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

export default transform;
