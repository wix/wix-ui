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

const generalIconsWithMetadata = getFileNames(generalIconsMetadata);
const systemIconsWithMetadata = getFileNames(systemIconsMetadata);

describe("General icons metadata", () => {
  const generalIconComponentNames = Object.keys(generalIconComponents);
  // File names not included in the deprecated icons array
  const activeGeneralIcons = generalIconComponentNames.filter(
    (iconName) => !deprecatedGeneralIcons.includes(iconName)
  );
  // Checks that every non-depreacted icon file has metadata
  activeGeneralIcons.forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(generalIconsWithMetadata.includes(iconName)).toBe(true);
    });
  });
  // Checks that deprecated files are not described with metadata
  deprecatedGeneralIcons.forEach((iconName) => {
    it(`${iconName} is deprecated`, () => {
      expect(generalIconsWithMetadata.includes(iconName)).toBe(false);
    });
  });
});

describe("System icons metadata", () => {
  const systemIconComponentNames = Object.keys(systemIconComponents);
  // File names not included in the deprecated icons array
  const activeSystemIcons = systemIconComponentNames.filter(
    (iconName) => !deprecatedSystemIcons.includes(iconName)
  );
  // Checks that every non-depreacted icon file has metadata
  activeSystemIcons.forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(systemIconsWithMetadata.includes(iconName)).toBe(true);
    });
  });
  // Checks that deprecated files are not described with metadata
  deprecatedSystemIcons.forEach((iconName) => {
    it(`${iconName} is deprecated`, () => {
      expect(systemIconsWithMetadata.includes(iconName)).toBe(false);
    });
  });
});
