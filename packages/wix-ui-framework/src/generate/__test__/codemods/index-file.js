module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const exports = root.find(j.ExportNamedDeclaration).paths();

  const { ComponentName } = options;

  j(exports[exports.length - 1]).insertAfter(
    `export { default as ${ComponentName} } from './${ComponentName}';`,
  );

  return root.toSource();
};
