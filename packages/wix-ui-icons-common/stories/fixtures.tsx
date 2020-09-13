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
    title: "Confirm",
    category: "Actions",
    description:
      "Static indicator - marks an item as included or enabled\nButton - confirms changes to an item",
    tags: ["Check", "Checkmark", "Success"],
    sizes: { "18": "ConfirmSmall", "24": "Confirm" },
    aliases: ["Check"],
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
export const confirmIconRow = mapIconToRow(iconsMetadata[1]);
export const languagesIconRow = mapIconToRow(iconsMetadata[2]);

export const initialCategories = mapIconsToCategories(
  iconsMetadata,
  tableHeaderTitles,
  mapIconToRow
);
