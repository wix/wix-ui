export type Path = string;

export interface Process {
  cwd: string;
}

export interface Component {
  path: string;
}

export interface Components {
  [componentName: string]: Component;
}
