declare namespace __WSRTests {
  type BaseDriver = import('wix-ui-test-utils/driver-factory').BaseDriver;
  type BaseUniDriver = import('wix-ui-test-utils/base-driver').BaseUniDriver;

  namespace __WUC {
    type ButtonNextDriver = import('wix-ui-core/drivers/unidriver').ButtonNextDriver;
    type LinearProgressBarDriver = import('wix-ui-core/drivers/vanilla').LinearProgressBarDriver;
    type LinearProgressBarUniDriver = import('wix-ui-core/drivers/unidriver').LinearProgressBarUniDriver;
    type TooltipUniDriver = ReturnType<
      typeof import('wix-ui-core/drivers/unidriver').tooltipDriverFactory
    >;
  }

  namespace __WUB {
    type LabelDriver = ReturnType<
      typeof import('wix-ui-backoffice/dist/src/components/Label/Label.driver').labelDriverFactory
    >;

    type LabelUniDriver = ReturnType<
      typeof import('wix-ui-backoffice/dist/src/components/Label/Label.uni.driver').labelUniDriverFactory
    >;

    type TooltipDriver = ReturnType<
      typeof import('wix-ui-backoffice/dist/src/components/Tooltip/Tooltip.driver').tooltipDriverFactory
    >;
  }
}
