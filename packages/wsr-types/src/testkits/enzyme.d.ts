declare module 'wix-style-react/dist/testkit/enzyme' {
  import { ReactWrapper } from 'enzyme';

  type EnzymeTestkitFactory<T extends __WSRTests.BaseDriver> = (
    params: EnzymeTestkitParams
  ) => T;

  type EnzymeUniTestkitFactory<T extends __WSRTests.BaseUniDriver> = (
    params: EnzymeTestkitParams
  ) => T;

  interface EnzymeTestkitParams {
    wrapper: ReactWrapper;
    dataHook: string;
  }

  export const loaderTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.LoaderDriver
  >;
  export const textTestkitFactory: EnzymeTestkitFactory<__WSRTests.TextDriver>;
  export const buttonTestkitFactory: EnzymeUniTestkitFactory<
    __WSRTests.ButtonUniDriver
  >;
  export const textButtonTestkitFactory: EnzymeUniTestkitFactory<
    __WSRTests.TextButtonUniDriver
  >;
  export const emptyStateTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.EmptyStateDriver
  >;
  export const headingTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.HeadingDriver
  >;
  export const dropdownLayoutTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.DropdownLayoutDriver
  >;
  export const labelTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.LabelDriver
  >;
  export const checkboxTestkitFactory: EnzymeTestkitFactory<
    __WSRTests.CheckboxDriver
  >;
}
