declare module 'wix-style-react/dist/testkit' {
  type VanillaTestkitFactory<T extends __WSRTests.BaseDriver> = (
    params: VanillaTeskitParams
  ) => T;

  type VanillaUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: VanillaTeskitParams
  ) => T;

  interface VanillaTeskitParams {
    wrapper: HTMLElement;
    dataHook: string;
  }

  export const loaderTestkitFactory: VanillaTestkitFactory<
    __WSRTests.LoaderDriver
  >;
  export const textTestkitFactory: VanillaTestkitFactory<__WSRTests.TextDriver>;
  export const buttonTestkitFactory: VanillaUniTestkitFactory<
    __WSRTests.ButtonUniDriver
  >;
  export const textButtonTestkitFactory: VanillaUniTestkitFactory<
    __WSRTests.TextButtonUniDriver
  >;
  export const emptyStateTestkitFactory: VanillaTestkitFactory<
    __WSRTests.EmptyStateDriver
  >;
  export const headingTestkitFactory: VanillaTestkitFactory<
    __WSRTests.HeadingDriver
  >;
  export const dropdownLayoutTestkitFactory: VanillaTestkitFactory<
    __WSRTests.DropdownLayoutDriver
  >;
  export const labelTestkitFactory: VanillaTestkitFactory<
    __WSRTests.LabelDriver
  >;
  export const checkboxTestkitFactory: VanillaTestkitFactory<
    __WSRTests.CheckboxDriver
  >;
  export const inputTestkitFactory: VanillaTestkitFactory<
    __WSRTests.InputDriver
  >;
  export const formFieldTestkitFactory: VanillaTestkitFactory<
    __WSRTests.FormFieldDriver
  >;
  export const pageHeaderTestkitFactory: VanillaTestkitFactory<
    __WSRTests.PageHeaderDriver
  >;
  export const pageTestkitFactory: VanillaTestkitFactory<__WSRTests.PageDriver>;
  export const modalTestkitFactory: VanillaTestkitFactory<
    __WSRTests.ModalDriver
  >;
  export const closeButtonTestkitFactory: VanillaUniTestkitFactory<
    __WSRTests.CloseButtonUniDriver
  >;
  export const iconButtonTestkitFactory: VanillaUniTestkitFactory<
    __WSRTests.IconButtonUniDriver
  >;
  export const skeletonTestkitFactory: VanillaTestkitFactory<
    __WSRTests.SkeletonDriver
  >;
}
