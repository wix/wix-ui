declare namespace __WSRTests {
  interface ToggleSwitchUniDriver extends __WUC.ToggleSwitchUniDriver {
    getSize: () => Promise<string>;
    getSkin: () => Promise<string>;
  }
}
