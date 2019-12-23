declare namespace __WSRTests {
  interface FieldLabelAttributesDriver extends BaseDriver {
    getTooltipTestKit: () => __WUC.TooltipDriver;
    hasRequired: () => boolean;
    hasInfo: () => boolean;
  }
}
