const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { execSync } = require('child_process');
const camelCase = require('lodash/camelCase');

const outputPath = 'docs/sections.md';
const templatePath = 'docs/sections.ejs';
const sectionsTypingsPath = 'src/typings/story-section.ts';
const tempJsonPath = '/tmp/wsu-tmp-docs.json';

const propsBlacklist = [
  'dataHook',
  'type',
  'title',
  'subtitle',
  'pretitle',
  'description',
  'parsedSource',
];

const typedocExecPath = path.resolve(
  process.cwd(),
  'node_modules',
  '.bin',
  'typedoc',
);

const pathResolve = (...p) => path.resolve(process.cwd(), ...p);

const typedocCommand = `${typedocExecPath} --json ${tempJsonPath} --mode file ${sectionsTypingsPath}`;
try {
  execSync(typedocCommand);
} catch (e) {
  console.error(`Unable to run ${typedocCommand} from ${typedocExecPath}`);
}

const typedocJson = require(tempJsonPath);

const findByName = n => typedocJson.children.find(({ name }) => name === n);

const sections = findByName('SectionType').children.map(({ name }) => {
  const sectionName = `${name}Section`;
  const section = findByName(sectionName);

  return {
    ...section,
    name: camelCase(name),
    comment: section.comment
      ? [section.comment.shortText, section.comment.text].join('\n')
      : '',
    props: section.children
      .filter(({ name: childName }) => !propsBlacklist.includes(childName))
      .map(({ name: childName, comment, type, flags }) => ({
        name: childName,
        comment: comment ? comment.shortText : '',
        type: type.name,
        required: !flags.isOptional,
      })),
  };
});

const rendered = ejs.render(
  fs.readFileSync(pathResolve(templatePath), 'utf8'),
  {
    sections,
  },
);

try {
  fs.writeFileSync(pathResolve(outputPath), rendered);
  console.info(`Sections docs built successfully at ${outputPath}`);
} catch (e) {
  console.error(`Unable to write sections docs file to ${outputPath}! ${e}`);
}
