declare namespace __WSRTests {
  interface ComposerHeaderUniDriver extends BaseUniDriver {
    saveStatusExists: (dataHook: string) => Promise<boolean>;
    getSaveStatusValue: (dataHook: string) => Promise<string>;
    /** returns true if action exists. Requires dataHook. */
    actionsExists: (dataHook: string) => Promise<boolean>;
    /** return true if main action exists */
    mainActionsExists: (dataHook: string) => Promise<boolean>;
    /** return true if backButton exists. */
    backButtonExists: () => Promise<boolean>;
    /** returns back button value in string */
    getBackButtonText: () => Promise<string>;
    /** clicks on back button */
    clickBack: () => Promise<void>;
  }
}
