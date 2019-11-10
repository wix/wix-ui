declare namespace __WSRTests {
  type BaseDriver = import('wix-ui-test-utils/driver-factory').BaseDriver;
  type BaseUniDriver = import('wix-ui-test-utils/base-driver').BaseUniDriver;

  namespace __WUC {
    type ButtonNextDriver = import('wix-ui-core/drivers/unidriver').ButtonNextDriver;
  }

  namespace __WUB {
    type LabelDriver = ReturnType<
      typeof import('wix-ui-backoffice/dist/src/components/Label/Label.driver').labelDriverFactory
    >;

    type LabelUniDriver = ReturnType<
      typeof import('wix-ui-backoffice/dist/src/components/Label/Label.uni.driver').labelUniDriverFactory
    >;
  }
}
