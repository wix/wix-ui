import { IconMetadata } from "../src/types";
import { mapIconsToCategories } from "./utils";

export const mapIconToRow = ({ title, description }: IconMetadata) => [
  title,
  description,
];

export const tableHeaderTitles = ["Header 1", "Header 2"];

export const iconsMetadata: Array<IconMetadata> = [
  {
    title: "Edit",
    category: "Actions",
    description: "Button - opens editing mode",
    tags: ["edit", "pencil", "write"],
    sizes: { "18": "EditSmall", "24": "Edit" },
  },
  {
    title: "DocDuplicate",
    category: "Actions",
    description: "Button - makes a copy of a file",
    tags: ["copy"],
    sizes: { "24": "DocDuplicate" },
  },
  {
    title: "Languages",
    category: "General",
    description: "Button - opens language selection",
    tags: ["globe", "localization"],
    sizes: { "18": "LanguagesSmall", "24": "Languages" },
  },
];

export const editIconRow = mapIconToRow(iconsMetadata[0]);
export const docDuplicateIconRow = mapIconToRow(iconsMetadata[1]);
export const languagesIconRow = mapIconToRow(iconsMetadata[2]);

export const initialCategories = mapIconsToCategories(
  iconsMetadata,
  tableHeaderTitles,
  mapIconToRow
);
