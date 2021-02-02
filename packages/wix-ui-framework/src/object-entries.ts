export const objectEntries = (object: object) =>
  Object.keys(object).map((key) => [key, object[key]]);
