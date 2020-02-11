declare namespace __WSRTests {
  interface ComposerHeaderUniDriver extends BaseUniDriver {
    saveStatusExists: (dataHook: string) => Promise<boolean>;
    getSaveStatusValue: (dataHook: string) => Promise<string>;
    actionsExists: (dataHook: string) => Promise<boolean>;
    mainActionsExists: (dataHook: string) => Promise<boolean>;
    backButtonExists: () => Promise<boolean>;
    getBackButtonText: () => Promise<string>;
    clickBack: () => Promise<void>;
  }
}
