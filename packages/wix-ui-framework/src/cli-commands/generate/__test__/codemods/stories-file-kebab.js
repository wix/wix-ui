module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  root.get().node.program.body.push(
    `// TODO: move to correct position
import '../src/${options['component-name']}/docs/index.story';`,
  );

  return root.toSource();
};
