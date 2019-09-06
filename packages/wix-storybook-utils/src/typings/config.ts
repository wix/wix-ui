export interface Config {
  importFormat?: string;
  moduleName?: string;
  repoBaseURL?: string;
  issueURL?: string;
  testkits?: Testkits;
}

export interface Testkits {
  [key: string]: Testkit;
}

export interface Testkit {
  template: string;
}
