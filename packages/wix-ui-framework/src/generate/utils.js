const simpleGit = require('simple-git');

const isGitRepoClean = cwd =>
  new Promise(resolve => {
    simpleGit(cwd).status((err, status) => {
      resolve(status.isClean());
    });
  });

const isPascalCase = value => /^([A-Z][a-z]*)+$/.test(value);

// HelloWorld -> helloWorld
const pascalToCamel = str => str.replace(/^./, match => match.toLowerCase());

// TODO: this is not snake case, this is kebab case
const pascalToSnake = str =>
  pascalToCamel(str).replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);

module.exports = {
  isGitRepoClean,
  isPascalCase,
  pascalToCamel,
  pascalToSnake,
};
