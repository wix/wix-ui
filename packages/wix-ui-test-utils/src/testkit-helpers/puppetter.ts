export function protractorTestkitFactoryCreator<T> (driverFactory: (e: any, page: any) => T) {
  return (obj: {dataHook: string, page: any}) => driverFactory(obj.page.$(`[data-hook='${obj.dataHook}']`), obj.page);
}
