declare namespace __WSRTests {
  interface ToggleSwitchUniDriver extends BaseUniDriver {
    getSize: () => Promise<string>;
    getSkin: () => Promise<string>;
  }
}
