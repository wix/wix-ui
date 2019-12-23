declare namespace __WSRTests {
  interface ToggleSwitchDriver extends __WUC.ToggleSwitchDriver {
    getSize: () => __WSR.ToggleSwitch.ToggleSwitchSize;
    getSkin: () => __WSR.ToggleSwitch.ToggleSwitchSkin;
  }
}
