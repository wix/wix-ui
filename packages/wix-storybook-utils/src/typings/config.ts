export interface Config {
  importFormat?: string;
  importTestkitPath?: string;
  moduleName?: string;
  repoBaseURL?: string;
  issueURL?: string;
  testkits?: Testkits;
  testkitsWarning?: string;
  unifiedTestkit?: boolean;
  playgroundComponentsPath?: string;
  playgroundComponents?: Record<string, React.ReactNode>;
  feedbackText?: string;
}

export interface Testkits {
  [key: string]: Testkit;
}

export interface Testkit {
  template: string;
}
