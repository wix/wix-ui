import { Process } from '../../typings.d';

export interface Options {
  ComponentName: string;
  description: string;
  templates: string;
  force?: boolean;
  output?: string;
  codemods?: string;
  _process: Process;
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
