import generalIconsMetadata, {
  deprecatedGeneralIcons,
} from "../general/metadata";
import * as generalIconComponents from "../general/dist";
import systemIconsMetadata, { deprecatedSystemIcons } from "../system/metadata";
import * as systemIconComponents from "../system/dist";
import { IconMetadata } from "../types";

const getFileNames = (iconsMetadata: Array<IconMetadata>) =>
  iconsMetadata.flatMap(({ sizes, aliases = [] }) => {
    const fileNames = [...Object.values(sizes), ...aliases];
    return fileNames;
  });

const generalIconFileNames = getFileNames(generalIconsMetadata);
const systemIconFileNames = getFileNames(systemIconsMetadata);

describe("General icons metadata", () => {
  const generalIconComponentNames = Object.keys(generalIconComponents);
  const activeGeneralIcons = generalIconComponentNames.filter(
    (iconName) => !deprecatedGeneralIcons.includes(iconName)
  );
  activeGeneralIcons.forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(generalIconFileNames.includes(iconName)).toBe(true);
    });
  });
  deprecatedGeneralIcons.forEach((iconName) => {
    it(`${iconName} is deprecated`, () => {
      expect(generalIconFileNames.includes(iconName)).toBe(false);
    });
  });
});

describe("System icons metadata", () => {
  const systemIconComponentNames = Object.keys(systemIconComponents);
  const activeSystemIcons = systemIconComponentNames.filter(
    (iconName) => !deprecatedSystemIcons.includes(iconName)
  );
  activeSystemIcons.forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(systemIconFileNames.includes(iconName)).toBe(true);
    });
  });
  deprecatedSystemIcons.forEach((iconName) => {
    it(`${iconName} is deprecated`, () => {
      expect(systemIconFileNames.includes(iconName)).toBe(false);
    });
  });
});
