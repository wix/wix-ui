const flatten = require('./utils/flatten');
const doctrine = require('doctrine');

const supportedAnnotations = {
  '@deprecated': 'isDeprecated',
};

const normalizeLine = line =>
  line
    .replace(/^(\s*\*\s*)/, '')
    .replace(/(\s*\*\s*)$/, '')
    .trim();

const convertCommentNodesToLines = nodes => flatten(nodes.map(({ value }) => value.split('\n').map(normalizeLine)));

const extractAnnotations = lines => {
  const defaultMetadata = { description: '', annotations: {} };
  return lines.reduce((methodMetadata, commentLine) => {
    if (supportedAnnotations[commentLine]) {
      // line matches annotation: do not add it to description and set annotation key to object metadata
      const annotationKey = supportedAnnotations[commentLine];
      return {
        ...methodMetadata,
        annotations: { ...methodMetadata.annotations, [annotationKey]: true },
      };
    }

    const description = [methodMetadata.description, commentLine].filter(Boolean).join('\n');

    return { ...methodMetadata, description };
  }, defaultMetadata);
};

const getComments = node => {
  const {leadingComments} = node;
  if (!leadingComments) {
    return {};
  }

  if (leadingComments.length === 1 && leadingComments[0].type === 'CommentBlock') {
    const leadingComment = leadingComments[0];
    const ast = doctrine.parse(leadingComment.value,{ unwrap: true });

    // For backward compatibility of `isDeprecated` prop
    const deprecatedTag = ast.tags.find(t => t.title === 'deprecated');
    if (deprecatedTag) {
      ast.isDeprecated = true;
    }

    return ast;
  } else {
    const lines = convertCommentNodesToLines(node.leadingComments);
    const { annotations, description } = extractAnnotations(lines);
    return { ...annotations, description };
  }
};

module.exports = getComments;
