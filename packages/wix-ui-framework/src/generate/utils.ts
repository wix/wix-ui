import * as simpleGit from 'simple-git';

export const isGitRepoClean = cwd =>
  new Promise(resolve => {
    simpleGit(cwd).status((err, status) => {
      resolve(status.isClean());
    });
  });

export const isPascalCase = value => /^([A-Z][a-z]*)+$/.test(value);

// HelloWorld -> helloWorld
export const pascalToCamel = str =>
  str.replace(/^./, match => match.toLowerCase());

// TODO: this is not snake case, this is kebab case
export const pascalToKebab = str =>
  pascalToCamel(str).replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
