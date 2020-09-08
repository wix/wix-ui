import generalIconsMetadata from "./metadata";
import * as generalIconComponents from "./dist";

const deprecated = ["FilterSmall"];

const iconNames = generalIconsMetadata.flatMap(({ sizes, aliases = [] }) => {
  const fileNames = [...Object.values(sizes), ...aliases];
  return fileNames;
});

describe("General icons metadata", () => {
  Object.keys(generalIconComponents).forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(iconNames.includes(iconName)).toBe(true);
    });
  });
});
