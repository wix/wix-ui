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
  Object.keys(generalIconComponents).forEach((iconName) => {
    const isDeprecated = !deprecatedGeneralIcons.includes(iconName);
    if (!isDeprecated) {
      it(`${iconName} has metadata`, () => {
        expect(generalIconFileNames.includes(iconName)).toBe(true);
      });
    }
  });
});

describe("System icons metadata", () => {
  Object.keys(systemIconComponents).forEach((iconName) => {
    const isDeprecated = !deprecatedSystemIcons.includes(iconName);
    if (!isDeprecated) {
      it(`${iconName} has metadata`, () => {
        expect(systemIconFileNames.includes(iconName)).toBe(true);
      });
    }
  });
});
