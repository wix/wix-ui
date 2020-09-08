import systemIconsMetadata from "./metadata";
import * as systemIconComponents from "./dist";

const iconNames = systemIconsMetadata.flatMap(({ sizes }) => {
  const fileNames = Object.values(sizes);
  return fileNames;
});

describe("System icons metadata", () => {
  Object.keys(systemIconComponents).forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(iconNames.includes(iconName)).toBe(true);
    });
  });
});
