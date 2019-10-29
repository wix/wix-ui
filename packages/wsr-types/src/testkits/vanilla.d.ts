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
}
