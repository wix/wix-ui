export interface Options {
  cwd: string;
  ComponentName: string;
  description: string;
  force?: boolean;
  skipCodemods?: boolean;
  templates: string;
  codemods?: string;
}

export interface Answers {
  ComponentName: string;
  description: string;
}

export interface CodemodConfig {
  codemod: string;
  dist: string;
  description: string;
}
