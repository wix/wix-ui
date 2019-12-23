declare namespace __WSRTests {
  type BaseDriver = import("wix-ui-test-utils/driver-factory").BaseDriver;
  type BaseUniDriver = import("wix-ui-test-utils/base-driver").BaseUniDriver;

  namespace __WUC {
    type ButtonNextDriver = import("wix-ui-core/drivers/unidriver").ButtonNextDriver;
    type LinearProgressBarDriver = import("wix-ui-core/drivers/vanilla").LinearProgressBarDriver;
    type CircularProgressBarDriver = import("wix-ui-core/drivers/vanilla").CircularProgressBarDriver;
    type CircularProgressBarUniDriver = import("wix-ui-core/drivers/unidriver").CircularProgressBarUniDriver;
    type LinearProgressBarUniDriver = import("wix-ui-core/drivers/unidriver").LinearProgressBarUniDriver;
    type ToggleSwitchDriver = ReturnType<
      typeof import("wix-ui-core/drivers/vanilla").toggleSwitchDriverFactory
    >;
    type TooltipDriver = ReturnType<
      typeof import("wix-ui-core/drivers/vanilla").tooltipDriverFactory
    >;
    type TooltipUniDriver = ReturnType<
      typeof import("wix-ui-core/drivers/unidriver").tooltipDriverFactory
    >;
    type PopoverDriver = ReturnType<
      typeof import("wix-ui-core/drivers/vanilla").popoverDriverFactory
    >;
    type PopoverUniDriver = ReturnType<
      typeof import("wix-ui-core/drivers/unidriver").testkit
    >;
  }

  namespace __WUB {
    type LabelDriver = ReturnType<
      typeof import("wix-ui-backoffice/dist/src/components/Label/Label.driver").labelDriverFactory
    >;

    type LabelUniDriver = ReturnType<
      typeof import("wix-ui-backoffice/dist/src/components/Label/Label.uni.driver").labelUniDriverFactory
    >;

    type TooltipDriver = ReturnType<
      typeof import("wix-ui-backoffice/dist/src/components/Tooltip/Tooltip.driver").tooltipDriverFactory
    >;

    type CounterBadgeDriver = import("wix-ui-backoffice/dist/src/components/StylableCounterBadge/CounterBadge.driver").CounterBadgeDriver;

    type FloatingHelperDriver = ReturnType<
      typeof import("wix-ui-backoffice/dist/src/components/FloatingHelper/FloatingHelper.driver").floatingHelperDriverFactory
    >;
  }
}
