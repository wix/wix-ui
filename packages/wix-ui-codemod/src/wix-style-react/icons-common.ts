import { Transform } from 'jscodeshift';

const wixUiIconsCommonLibName = 'wix-ui-icons-common';
const importRegExp = /^wix-style-react\/new-icons(\/?.*)$/;

const transform: Transform = (fileInfo, api) => {
  const root = api.jscodeshift(fileInfo.source);
  let transformedSources = 0;
  const transformSource = (source: string) => {
    transformedSources++;
    return source.replace(importRegExp, `${wixUiIconsCommonLibName}$1`);
  };

  // Transform ES module imports
  root.find(api.jscodeshift.ImportDeclaration).forEach(path => {
    const sourceNode = path.value.source;
    if (
      typeof sourceNode.value === 'string' &&
      importRegExp.test(sourceNode.value)
    ) {
      sourceNode.value = transformSource(sourceNode.value);
    }
  });

  // Transform CommonJS require() calls
  root.find(api.jscodeshift.CallExpression).forEach(path => {
    const calleeNode = path.value.callee;
    const argNode = path.value.arguments[0];
    if (
      calleeNode.type === 'Identifier' &&
      calleeNode.name === 'require' &&
      argNode.type === 'Literal' &&
      typeof argNode.value === 'string' &&
      importRegExp.test(argNode.value)
    ) {
      argNode.value = transformSource(argNode.value);
    }
  });

  if (!transformedSources) {
    return;
  }

  return root.toSource({
    quote: 'single',
    trailingComma: true,
  });
};

export default transform;
