export interface Config {
  importFormat?: string;
  moduleName?: string;
  repoBaseURL?: string;
  issueURL?: string;
  testkits?: Testkits;
  testkitsWarning?: string;
  unifiedTestkit?: boolean;
  playgroundComponentsPath?: string;
  playgroundComponents?: Record<string, React.ReactNode>;
}

export interface Testkits {
  [key: string]: Testkit;
}

export interface Testkit {
  template: string;
}
