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
}
