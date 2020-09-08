import generalIconsMetadata, {
  deprecatedGeneralIcons,
} from "../general/metadata";
import * as generalIconComponents from "../general/dist";
import systemIconsMetadata, { deprecatedSystemIcons } from "../system/metadata";
import * as systemIconComponents from "../system/dist";
import { IconMetadata } from "../types";

const getFileNames = (
  iconsMetadata: Array<IconMetadata>,
  deprecatedIcons: Array<string>
) => {
  const allFileNames = iconsMetadata.flatMap(({ sizes, aliases = [] }) => {
    const fileNames = [...Object.values(sizes), ...aliases];
    return fileNames;
  });
  const nonDeprecatedFileNames = allFileNames.filter(
    (fileName) => !deprecatedIcons.includes(fileName)
  );

  return nonDeprecatedFileNames;
};

const generalIconFileNames = getFileNames(
  generalIconsMetadata,
  deprecatedGeneralIcons
);
const systemIconFileNames = getFileNames(
  systemIconsMetadata,
  deprecatedSystemIcons
);

describe("General icons metadata", () => {
  Object.keys(generalIconComponents).forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(generalIconFileNames.includes(iconName)).toBe(true);
    });
  });
});

describe("System icons metadata", () => {
  Object.keys(systemIconComponents).forEach((iconName) => {
    it(`${iconName} has metadata`, () => {
      expect(systemIconFileNames.includes(iconName)).toBe(true);
    });
  });
});
